const multer = require('multer');
const FTPStorage = require('multer-ftp')
const jsftp = require("jsftp");


const uploadFile = multer({
  storage: new FTPStorage({
    basepath: '/',
    // destination: function (req, file, options, callback) {
    //     // callback(null, path.join(options.basepath, file.originalname))
    // },
    ftp: {
      host: 'ftp.4th-jarb.com',
      // secure: true, // enables FTPS/FTP with TLS
      user: 'icdi@4th-jarb.com',
      password: 'CI!D#qVaAc'
    }
  })
});


// JSFTP ==================================================
const ftpconn = new jsftp({
  host: 'ftp.4th-jarb.com',
  user: 'icdi@4th-jarb.com',
  pass: 'CI!D#qVaAc', // defaults to "@anonymous"
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

  // console.log(file, originalname);
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


const delFile = async (file) => {
  ftpconn.raw("DELE", file, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.text); // Show the FTP response text to the user
    console.log(data.code); // Show the FTP response code to the user
    return data.code;
  });
}

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