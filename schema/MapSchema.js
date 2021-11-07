const {Schema, model, Model} = require('mongoose');
// const UserClass = require('../classes/UserClass');

// user schema
const MapSchema = new Schema({
  location: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  address: {
    type: String,
    default: null
  },
  siteContactPerson: {
    type: String,
    default: null
  },
  siteContactNum: {
    type: String,
    default: null
  },
  _idcontractor: String,
  status: {
    type: Boolean,
    default: true
  }
});

// MapSchema.loadClass(UserClass);
module.exports = model('SiteMap', MapSchema);