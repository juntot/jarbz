const {Schema, model} = require('mongoose');
// const UserClass = require('../classes/UserClass');

// user schema
const PositionSchema = new Schema({
  position: {
    type: String,
    index: true,
    unique: true
  },
});

// PositionSchema.loadClass(UserClass);
module.exports = model('Position', PositionSchema);