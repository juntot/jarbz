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
      user: 'icdi@icdi.4th-jarb.com',
      password: 'CI!D#qVaAc'
    }
  })
});


// JSFTP ==================================================
const Ftp = new jsftp({
  host: 'ftp.4th-jarb.com',
  user: 'icdi@icdi.4th-jarb.com',
  pass: 'CI!D#qVaAc', // defaults to "@anonymous"
  port: 21, // defaults to 21
});

const uploadJSFTP = async (file) => {
  const { originalname, buffer } = file;

  console.log(file, originalname);
  Ftp.put(buffer, new Date().valueOf()+'.'+originalname.split(".").pop(), err => {
    if (!err) {
      
      console.log("File transferred successfully!");
    }
    else{
      console.log("ERROR UPLOADING FILE");
    }

    return file;
  });
}

const makeDIRJSFTP = async (dirname) => {
  Ftp.raw("mkd", dirname, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.text); // Show the FTP response text to the user
    console.log(data.code); // Show the FTP response code to the user
    return data.code;
  });
}

const delDIRJSFTP = async (dirname) => {
  Ftp.raw("RMD", dirname, (err, data) => {
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
}