const jwt = require('jsonwebtoken');
require('dotenv').config();

class JWTService {
    constructor(){
        this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    }

    async signIn(payload){
      return jwt.sign(payload, this.JWT_SECRET_KEY)
    }
    
    async verify (token){
        return jwt.verify(token, this.JWT_SECRET_KEY);
    }
}



module.exports = new JWTService