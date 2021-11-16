const MailService = require('../../services/MailService');
const JWTService = require("../../services/JWTService");
const UserServices = require('./UserServices');


// login
const login = async (req, res) => {
    const {email, password} = req.body;
    // let user = await UserSchema.findByEmail({email: email});
    let user = await UserServices.getBySpecificKey('email', email)
    console.log(user);
    if(user) {
        if (user.status === 0)
        return res.status(400).json({message: 'Account disabled'});
        // verify password here
        if(user.password == password){
            const token = await JWTService.signIn({user: user._id});
            delete user.password;
            user['token'] = token;
            user['user'] = user.firstName+' '+user.lastName;
            // const docs = await ContractorDocSchema.findOne({_iduser: user._id});
            // as is if(docs){
                // append documents and teams
                // user['documents'] = docs? docs.documents : {};
                // user['team'] = docs? docs.team : [];    
            // }
            res.status(200).json(user);
        }else{
            res.status(400).json({message: 'Invalid password'});
        }
    }else{
        res.status(400).json({message: 'Email not found'});
    }
    
};

// register
const register = async (req, res) => {
    const body = req.body;
    body['password'] = Math.random().toString(36).substr(2, 8);
    let user =  {...body, userId: `U${new Date().valueOf()}`};
    try {
        await UserServices.insert(user);
        let mail = await MailService.send({
            from: 'info@4th-jarb.com', 
            to: body.email, 
            message: 
            `<pre>
            Hi ${body.firstName || ''},

                Thank you for taking time to register. We're exited to work with you.
            Here's your password: ${body.password}
            
            For any concerns or clarrification, 
            Please don't hesitate to contact our team.

            contact# 09123456789

        
            Regards,
            4th-jarb Team
            </pre>`
        });
        console.log(mail);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
    
    const token = await JWTService.signIn({user: await user.userId});

    user['token'] = token;
    delete user.password;
    user['user'] = user.firstName+' '+user.lastName;
    res.status(200).json(user);
};

// USER LIST
const userList = async (req, res) => {
    res.status(200).json(await UserServices.findAll());
}

// update user
const updateUser = async (req, res) => {
    const body = req.body || {};
    const userId = req.params.id || '';
    await UserServices.updateBySpecificKey('userId',userId, body)
    res.status(200).json('success');
}

module.exports = {
    // test,
    login,
    register,
    updateUser,
    // addDocuments,
    userList,
    // userInfo,
}
