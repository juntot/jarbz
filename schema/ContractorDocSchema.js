const {Schema, model, Model} = require('mongoose');
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
const ContractorDocSchema = new Schema({
  _iduser: String,
  _ideval: String,
  ...PersonSchema,
  bankNumber: {
    type: String,
    default: '',
  },
  bankName: {
    type: String,
    default: '',
  },
  bankBranch: {
    type: String,
    default: '',
  },
  documents: Documents,
  region: {
    type: String,
    default: '',
  },
  team: [TeamSchema],
  remaks: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: 1,
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: {type: Date, default: Date.now }
  
});

ContractorDocSchema.loadClass(UserClass);
module.exports = model('ContractorDoc', ContractorDocSchema);