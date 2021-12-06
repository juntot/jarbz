// const MailService = require('../../services/MailService');
const JWTService = require("../../services/JWTService");
const ContractorService = require("../Contractor/ContractorService");
const UserServices = require('./UserServices');
// const FTP = require('../../services/FTP');
const APP = 'UserController';
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

    let user = '';
    try {
        user = await UserServices.register(body);
        await ContractorService.insertOrUpdate({_email: body.email, documents: '{}'}, user.userId);
    } catch (error) {
        console.log(error);
        if(error.errno == 1062)
        return res.status(400).json({message: 'Email already exists'});
        return res.status(400).json({message: error.message});
    }
    
    const token = await JWTService.signIn({user: await user.userId});

    user['token'] = token;
    delete user.password;
    user['user'] = user.firstName+' '+user.lastName;
    res.status(200).json(user);
};

// forget Password
const forgetPass = async (req, res) => {
    const email = req.body.email || '';
    const user = await UserServices.forgetPass(email);
    if(!user)
    return res.status(400).json('Email not found');
    res.status(200).json(user);
}


// USER LIST
const userList = async (req, res) => {
    res.status(200).json(await UserServices.findAll());
}

// update user
const updateUser = async (req, res) => {
    const file = req.file;

    const body = req.body || {};
    const userId = req.params.id || '';
    await UserServices.updateUser('userId',userId, body, file)
    res.status(200).json('success');
}

const insertOrUpdateUser = async (req, res) => {
    console.log(APP, 'insertOrUpdateUser');
    const body = req.body;
    const  region =  req.body.region;
    delete body.region;
    
    const user = await UserServices.getBySpecificKey('email', body.email)
    let result = '';
    
    try {
        // insert
        if(!user){
            result = await UserServices.register(body);
            // await ContractorService.insertOrUpdate({_email: body.email, documents: '{}', region: region}, result.userId);
        } else{
        // update
            await UserServices.updateUser('email', body.email, body);
            // await ContractorService.insertOrUpdate({_email: body.email, documents: '{}', region: region}, result.userId);
            body['userId'] = user.userId;
            result = body;
        } 
        await ContractorService.insertOrUpdate({_email: body.email, documents: '{}', region: region}, result.userId); 
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(result);
    }

}

module.exports = {
    // test,
    login,
    register,
    updateUser,
    // addDocuments,
    userList,
    // userInfo,
    forgetPass,
    insertOrUpdateUser
}
