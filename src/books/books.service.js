const Books = require('./model');
const config = require('../../config');

const CounterBook = require('../../services/counter');

class BooksService {
  constructor({ counterBook }) {
    this.databasePath = config.DATABASE_PATH;
    this.counterBook = counterBook;
  }

  async getBooks(id, options = { increase: false }) {
    try {
      if (id) {
        const book = await Books.findById(id).select('-__v');
        let counter = 0;
        if (options.increase) {
          counter = await this.counterBook.icreaseCounter(book.id);
        }
        counter = await this.counterBook.getCounter(book.id);

        book.counter = counter;
        return book;
      } else {
        const books = await Books.find().select('-__v');
        return books;
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async createBook(book) {
    try {
      return await new Books(book).save();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async updateBook(id, book) {
    try {
      return await Books.findByIdAndUpdate(id, book, { new: true });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async deleteBook(id) {
    try {
      const filter = { _id: id };
      return await Books.deleteOne(filter);
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = new BooksService({ counterBook: new CounterBook() });
