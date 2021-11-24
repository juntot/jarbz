
const fs = require('fs');
const path = require('path');
// const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
// const FTPStorage = require('multer-ftp')
require('dotenv').config();

// classes and services
const GC = require('./src/services/Bucket');
const FTP = require('./src/services/FTP');

const authMiddleWare = require('./src/services/authMiddleWare');
const controller = require('./src/controller');
// const PageSchema = require('./schema/PageSchema');



 
// var uploadFile = multer({
//   storage: new FTPStorage({
//     basepath: '/',
//     // destination: function (req, file, options, callback) {
//     //     // callback(null, path.join(options.basepath, file.originalname))
//     // },
//     ftp: {
//       host: 'ftp.4th-jarb.com',
//       // secure: true, // enables FTPS/FTP with TLS
//       user: 'icdi@icdi.4th-jarb.com',
//       password: 'CI!D#qVaAc'
//     }
//   })
// })

 

// multer
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
});
  


const app = express();
app.use(cors());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(multerMid.single('file'));
// app.use(FTP.uploadFile.single('file'))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public/public')))
app.use('/static', express.static(path.join(__dirname, 'public/static')))
app.use('/plugins', express.static(path.join(__dirname, 'public/plugins')))
app.use('/dist', express.static(path.join(__dirname, 'public/dist')))
  
// establish db connection
// const mongoServer = 'mongodb+srv://mongo_user:admin@cluster0.c97cq.mongodb.net/jarbz4000?retryWrites=true&w=majority';
// mongoose.connect(mongoServer, {useNewUrlParser: true, useUnifiedTopology: true});


// enforce path protection
const excludePaths = ['/api/test', '/api/login', '/api/register', '/api/forgetpass',];
const protectedPath = Object.keys(controller).filter(path => !excludePaths.includes(path));
authMiddleWare(app, protectedPath);

// set controller per paths
const pathController = Object.entries(controller);

for (const paths of pathController) {
    console.log(paths);
    app.use(paths[0], paths[1]);
}


// const controllers = readdirSync(path.join(__dirname, 'src/services')).filter(f => f !== 'index.js');
// console.log(controllers);

// const walk = (dir, done) => {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var i = 0;
//     (function next() {
//       var file = list[i++];
//       if (!file) return done(null, results);
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             next();
//           });
//         } else {
//           results.push(file);
//           next();
//         }
//       });
//     })();
//   });
// };

// walk(path.join(__dirname, 'src/controller'), (err, res)=>{
//     console.log(res)
// });

app.use('/test', (req, res)=>{
    res.send('okay');
})


app.post('/api/upload', async (req, res, next) => {
  console.log('tae')
    try {
        
        const myFile = req.file
        // const imageUrl = await GC.uploadFile(myFile)
        const imageUrl = await FTP.uploadJSFTP(myFile)
        res
          .status(200)
          .json({
            message: "Upload was successful",
            data: imageUrl
          })
      } catch (error) {
        console.log(error);
        next(error)
      }
});

app.get('/api/mkdir', async (req, res, next) => {
  console.log('tae')
    try {
        
        const myFile = req.file
        // const imageUrl = await GC.uploadFile(myFile)
        const imageUrl = await FTP.makeDIRJSFTP('myFile')
        res
          .status(200)
          .json({
            message: "Upload was successful",
            data: imageUrl
          })
      } catch (error) {
        console.log(error);
        next(error)
      }
});

app.all('*', (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`running. ${process.env.PORT || 8080}`)
});