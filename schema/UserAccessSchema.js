const {Schema, model} = require('mongoose');
const UserAccessClass = require('../classes/UserAccessClass');
// const UserClass = require('../classes/UserClass');

// pages
const Pages =  new Schema({
  _idpage: String,
  value: Boolean
});

// Page Schema
const UserAccessSchema = new Schema({
  _iduser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  pages: [Pages],
});

UserAccessSchema.loadClass(UserAccessClass);
module.exports = model('UserAccess', UserAccessSchema);