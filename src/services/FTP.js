const multer = require('multer');
const FTPStorage = require('multer-ftp')
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
})

module.exports = {
  uploadFile,
}