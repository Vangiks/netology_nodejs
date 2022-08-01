const { v4: uuidv4 } = require('uuid');
const { book: defaultBook } = require('./dto');
const {
  readTable,
  AddRecord,
  deleteRecord,
  updateRecord,
} = require('../../helpers/database');

class BooksService {
  constructor() {
    this.databasePath = process.env.DATABASE_PATH;
  }

  getBooks() {
    return readTable(this.databasePath, 'books');
  }

  createBook(book) {
    const _book = { ...defaultBook, id: uuidv4(), ...book };
    return AddRecord(this.databasePath, 'books', _book);
  }

  updateBook(id, book) {
    const _book = { ...book, favorite: Boolean(book.favorite) };
    return updateRecord(this.databasePath, 'books', id, _book);
  }

  deleteBook(id) {
    return deleteRecord(this.databasePath, 'books', id);
  }
}

module.exports = new BooksService();
