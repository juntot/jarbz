// const express = require('express')
// const router = express.Router();
// const UserSchema = require('./schema/UserSchema');
// const JWTService = require('./src/services/JWTService');
const MailService = require('../../services/MailService');
const JWTService = require("../../services/JWTService");
const UserSchema = require("../../../schema/UserSchema");
const ContractorDocSchema = require('../../../schema/ContractorDocSchema');

String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
  };

// login
const login = async (req, res) => {
    const {email, password} = req.body;
    let user = await UserSchema.findByEmail({email: email});
    if(user) {
        // verify password here
        if(user.password == password){
            const token = await JWTService.signIn({user: user._id});
            delete user.password;
            user['token'] = token;
            user['user'] = user.firstName+' '+user.lastName;
            const docs = await ContractorDocSchema.findOne({_iduser: user._id});
            // if(docs){
                // append documents and teams
                user['documents'] = docs? docs.documents : {};
                user['team'] = docs? docs.team : [];    
            // }
            

            res.status(200).json(user);
        }else{
            res.status(400).json({message: 'Invalid username or password'});
        }
        
    }else{
        res.status(400).json({message: 'Email not found'});
    }
    
};

// register
const register = async (req, res) => {
    const body = req.body;
    body['password'] = Math.random().toString(36).substr(2, 8);
    let user;
    try {
        
        user = await UserSchema.create(body);
        await MailService.send({
            from: 'junrey.gonzales.07@gmail.com', 
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
        
    } catch (error) {
        // throw error;
        return res.status(400).json({message: error.message});
    }
    
    const token = await JWTService.signIn({user: await user._id});
    user = user.toObject();

    user['token'] = token;
    delete user.password;
    user['user'] = user.firstName+' '+user.lastName;
    // console.log(user);
    res.status(200).json(user);
};


// update user
module.exports = {
    test,
    login,
    register,
    updateUser,
    // addDocuments,
    userList,
    userInfo,
}
