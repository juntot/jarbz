const {Schema, model, Model} = require('mongoose');
// const UserClass = require('../classes/UserClass');

const MailerPerson = new Schema({
    name: {
      type: String,
      required: true,
      default: null
    },
    _iduser: {
      type: String,
      required: true,
      default: null
    },
    email: {
      type: String,
      required: true,
      default: null
    },
})


// user schema
const MessageSchema = new Schema({
  from: MailerPerson,
  to: [MailerPerson],
  subject: {
    type: String,
    default: null
  },
  message: {
    type: String,
    default: null
  },
  attachments: String,
  dateCreated: {
    type: Date, default: Date.now 
  },
  status: {
    type: Boolean,
    default: true
  }
});

// MessageSchema.loadClass(UserClass);
module.exports = model('Message', MessageSchema);