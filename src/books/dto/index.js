const { Schema, model } = require('mongoose');

const booksSchema = Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  authors: {
    type: String,
    default: '',
  },
  favorite: {
    type: Boolean,
    default: false,
    set: (value) => {
      let result = value;
      if (typeof value === 'string') {
        result = Boolean(value);
      }
      return result;
    },
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  fileBook: {
    type: String,
    default: '',
  },
  counter: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Books', booksSchema);
