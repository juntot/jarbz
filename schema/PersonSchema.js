const PersonSchema = {
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  }, // String is shorthand for {type: String}
  birthDate: {
    type: Date,
    default: Date.now
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNum: {
    type: String,
    required: true
  },
  civilStatus: {
    type: String,
    default: '',
  },
  contactPerson: {
    type: String,
    default: '',
  },
  contactNum2: {
    type: String,
    default: '',
  },
}

module.exports = PersonSchema