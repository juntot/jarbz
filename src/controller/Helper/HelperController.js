const FTP = require('../../services/FTP');
const APP = 'HelperController'

/**
 * Uloading file
 * return string file location
 */
const fileUploadHelper = async (req, res) => {
  console.log(APP, '[fileUploadHelper]');
  const file = req.file;
  const userId = req.body._userId || req.params.id;
  try {
     const imageUrl = await FTP.uploadJSFTP(file, userId);
     res.status(200).json(imageUrl);
  } catch(er) {
    console.log(err);
    res.status(400).json({message: 'an error occured during uploading file..'})
  }
}

const fileDeleteHelper = async (req, res) => {
  console.log(APP, '[fileDeleteHelper]');
  const file = req.body.path;
  try {
     const imageUrl = await FTP.delFile(file);
     res.status(200).json(imageUrl);
  } catch(er) {
    console.log(er);
    res.status(400).json({message: 'an error occured during uploading file..'})
  }
}

module.exports = {
  fileUploadHelper,
  fileDeleteHelper
}