const path = require('path');
const JWTService = require('./JWTService');

const authMiddleWare = (app, paths) =>{
  app.use(paths, async (req, res, next) => {
    const authHeader = req.header('Authorization');
      
      // return next();
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        
        if (token) {
          try {
            await JWTService.verify(token);
            return next();
          } catch (err) {
            return next(err);
          }
        } else {
          return next(new Error('Invalid access'));
        }
      } else {
        return next(new Error('Invalid access'));
      }
  });
};
module.exports = authMiddleWare;