const { v4: uuidv4 } = require('uuid');
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
    const _book = { id: uuidv4(), ...book };
    return AddRecord(this.databasePath, 'books', _book);
  }

  updateBook(id, book) {
    return updateRecord(this.databasePath, 'books', id, book);
  }

  deleteBook(id) {
    return deleteRecord(this.databasePath, 'books', id);
  }
}

module.exports = new BooksService();
