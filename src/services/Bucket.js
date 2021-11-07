const {format} = require('util');
const path = require('path');
const {Storage} = require('@google-cloud/storage');


// gcloud storage key
const serviceKey = path.join(__dirname, '../../melodic-crane-325317-e49d0532dbe0.json')

// establish gcloud storage
const gc = new Storage({
  keyFilename: serviceKey,
  projectId: 'melodic-crane-325317',
});

// module.exports = gc
const bucket = gc.bucket('bucketjarb') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadFile = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  
  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', (err) => {
    console.log(err);
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
});

const deleteFile = async (file) => {
  return await bucket.file(fileName).delete();
}


module.exports = {
  uploadFile,
  deleteFile
}