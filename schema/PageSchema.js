const {Schema, model} = require('mongoose');
// const UserClass = require('../classes/UserClass');

// Page Schema
const PageSchema = new Schema({
  title: String,
  path: String,
  value: {
    type: Boolean,
    default: false,
  }
});

module.exports = model('Page', PageSchema);