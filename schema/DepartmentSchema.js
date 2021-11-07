const {Schema, model} = require('mongoose');
// const UserClass = require('../classes/UserClass');

// user schema
const DepartmentSchema = new Schema({
  department: {
    type: String,
    index: true,
    unique: true
  },
});

// DepartmentSchema.loadClass(UserClass);
module.exports = model('Department', DepartmentSchema);