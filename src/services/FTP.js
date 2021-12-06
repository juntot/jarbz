const multer = require('multer');
const FTPStorage = require('multer-ftp')
const jsftp = require("jsftp");
require('dotenv').config();

const uploadFile = multer({
  storage: new FTPStorage({
    basepath: '/',
    destination: function (req, file, options, callback) {
        // callback(null, path.join(options.basepath, file.originalname))
    },
    ftp: {
      host: process.env.FTP_HOST,
      // secure: true, // enables FTPS/FTP with TLS
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
    }
  })
});


// JSFTP ==================================================
const ftpconn = new jsftp({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  pass: process.env.FTP_PASS, // defaults to "@anonymous"
  port: 21, // defaults to 21
});

ftpconn.on('error', function(err){
  if(err) {
    // return err;   
    console.log(err)
  }
})

ftpconn.on('data', function(data) {
   console.log('The provided ftp location is valid');
   // do stuff here...
})

const uploadJSFTP = async (file, dir = '') => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  console.log(file, originalname);

  const filePath = `${dir && dir+'/'}${new Date().valueOf()+'.'+originalname.split(".").pop()}`;
  
  ftpconn.put(buffer, filePath, 
    err => {
    if (!err) {      
      console.log("File transferred successfully!");
      resolve(`https://4th-jarb.com/icdi/${filePath}`);
    }
    else{
      console.log(err);
      reject(`Unable to upload image, something went wrong`);
      // throw err;
    }
  });
});


const delFile = async (file) => new Promise((resolve, reject) => {
  console.log(file)
  // file = 'icdi/test.txt';
  // try {
    ftpconn.raw("DELE", file, (err, data) => {
      if (err) {
        reject(err);
      }
      // console.log(data.text); // Show the FTP response text to the user
      // console.log(data.code); // Show the FTP response code to the user
      resolve(data.code);
    });
  // } catch (error) {
  //   console.log(error)
  // }
  
});

const makeDIRJSFTP = async (dirname) => {
  ftpconn.raw("mkd", dirname, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.text); // Show the FTP response text to the user
    console.log(data.code); // Show the FTP response code to the user
    return data.code;
  });
}

const delDIRJSFTP = async (dirname) => {
  ftpconn.raw("RMD", dirname, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.text); // Show the FTP response text to the user
    console.log(data.code); // Show the FTP response code to the user
    return data.code;
  });
}

module.exports = {
  uploadFile,
  uploadJSFTP,
  makeDIRJSFTP,
  delDIRJSFTP,
  delFile,
}