const {Schema, model} = require('mongoose');
const UserClass = require('../classes/UserClass');
const PersonSchema = require('./PersonSchema');

// team person schema
const TeamPersonSchema = new Schema({
    role: String,
    inputType: {
      type: String,
      default: 'text'
    },
    value: String
});

// team schema
const TeamSchema = new Schema({
  title: String,
  person: [TeamPersonSchema]
})

// team schema
const Documents = new Schema({
  DO174: {
    type: String,
    default: null,
  },
  BZNPERMIT: {
    type: String,
    default: null,
  },
  COR: {
    type: String,
    default: null,
  },
  SEC: {
    type: String,
    default: null,
  },
  PCAB: {
    type: String,
    default: null,
  },
  BIO: {
    type: String,
    default: null,
  },

})


// user schema
const UserSchema = new Schema({
 
  password: String,
  ...PersonSchema,
  firstName: {
    type: String,
    required: true
  }, // String is shorthand for {type: String}
  // middleName: String,
  // lastName: {
  //   type: String,
  //   required: true
  // },
  // address: {
  //   type: String,
  //   required: true
  // },
  // contactNum: {
  //   type: String,
  //   required: true
  // },
  // civilStatus: String,
  // contactPerson: String,
  // contactNum2: String,

  // bankNumber: String,
  // bankName: String,
  // bankBranch: String,
  // documents: Documents,
  // region: String,
  // team: [TeamSchema],
  primarySch: { type: String, default: '' },
  secondarySch: { type: String, default: '' },
  tertiarySch: { type: String, default: '' },
  course: { type: String, default: '' },
  SSS: { type: String, default: '' },
  HDMF: { type: String, default: '' },
  philHealth: { type: String, default: '' },
  dateHired: { 
    type: Date,
    default: Date.now
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: 'position'
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'department'
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'branch'
  },

  company1: { type: String, default: '' },
  year1: { type: String, default: '' },
  company2: { type: String, default: '' },
  year2: { type: String, default: '' },
  company3: { type: String, default: '' },
  year3: { type: String, default: '' },
  dateCreated: { type: String, default: '' },
  role: {
    type: String,
    default: 'standard'
  },
  active: {
    type: Boolean,
    default: true
  },
  
});

UserSchema.loadClass(UserClass);
module.exports = model('User', UserSchema);