const {Schema, model} = require('mongoose');
// const UserClass = require('../classes/UserClass');

// user schema
const BranchSchema = new Schema({
  branch: {
    type: String,
    index: true,
    unique: true
  },
});

// BranchSchema.loadClass(UserClass);
module.exports = model('Branch', BranchSchema);