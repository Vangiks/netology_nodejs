const BooksService = require('./books.service');

const title = 'Книги';

class BooksController {
  async getBooks(reques, response) {
    const id = reques.params?.id || '';
    const books = await BooksService.getBooks(id, { increase: true });
    if (id) {
      if (books)
        response.render('books/view', {
          title,
          book: books,
          user: reques?.user?.fullname || 'Аноним',
        });
      else response.render('errors/404');
    } else if (!Array.isArray(books)) response.render('errors/404');
    else response.render('books/index', { title, books });
  }

  async changeBooks(reques, response) {
    const id = reques.params?.id || '';
    const book = await BooksService.getBooks(id);
    if (book) response.render('books/update', { title, book });
    else response.render('errors/404');
  }

  async create(reques, response) {
    response.render('books/create', { title, book: {} });
  }

  async createBook(reques, response) {
    const file = reques?.file || null;
    let body = reques.body;
    if (body) {
      if (file) {
        body = { ...body, fileName: file.originalname, fileBook: file.path };
      }
      let result = await BooksService.createBook(body);

      if (result) response.redirect('/books');
      else response.render('errors/500');
    } else response.render('errors/404');
  }

  async updateBook(reques, response) {
    const file = reques?.file || null;
    const id = reques.params?.id || '';
    let body = reques.body;
    if (id && body) {
      if (file) {
        body = { ...body, fileName: file.originalname, fileBook: file.path };
      }
      const book = await BooksService.getBooks(id);
      if (book) {
        let updateBook = await BooksService.updateBook(id, body);

        if (updateBook) response.redirect(`/books/${book.id}`);
        else response.render('errors/500');
      } else response.render('errors/404');
    } else response.render('errors/404');
  }

  async deleteBook(reques, response) {
    const id = reques.params?.id || '';
    if (id) {
      const book = await BooksService.getBooks(id);
      if (book) {
        let result = await BooksService.deleteBook(id);

        if (result) response.redirect('/books');
        else response.render('errors/500');
      } else response.render('errors/404');
    } else response.render('errors/404');
  }

  async downloadBook(reques, response) {
    const id = reques.params?.id || '';
    const book = await BooksService.getBooks(id);
    if (book)
      if (book?.fileBook) {
        return response.status(200).download(book.fileBook);
      } else response.render('errors/404');
    else response.render('errors/404');
  }
}

module.exports = new BooksController();
