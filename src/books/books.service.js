const { v4: uuidv4 } = require('uuid');
const { book: defaultBook } = require('./dto');
const {
  readTable,
  AddRecord,
  deleteRecord,
  updateRecord,
} = require('../../helpers/database');
const config = require('../../config');

const CounterBook = require('../../services/counter');

class BooksService {
  constructor({ counterBook }) {
    this.databasePath = config.DATABASE_PATH;
    this.counterBook = counterBook;
  }

  async getBooks(id, options = { increase: false }) {
    const books = await readTable(this.databasePath, 'books');
    if (id) {
      const book = books.find((book) => book.id === id);
      let counter = 0;
      if (options.increase) {
        counter = await this.counterBook.icreaseCounter(book.id);
      }
      counter = await this.counterBook.getCounter(book.id);

      book.counter = counter;
      return book;
    }
    return books;
  }

  createBook(book) {
    // TODO validate
    delete book.counter;

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

module.exports = new BooksService({ counterBook: new CounterBook() });
