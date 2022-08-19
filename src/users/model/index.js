const { Schema, model } = require('mongoose');

const usersSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  fullname: {
    type: String,
    default: '',
  },
  emails: [String],
});

module.exports = model('Users', usersSchema);
