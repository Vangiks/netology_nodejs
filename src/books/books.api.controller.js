const BooksService = require('./books.service');

class BooksController {
  async getBooks(reques, response) {
    const id = reques.params?.id || '';
    const books = await BooksService.getBooks();
    if (id) {
      const book = books.find((book) => book.id === id);
      if (book)
        return response.status(200).send({
          response: book,
          errors: [],
          status: true,
        });
      else
        return response
          .status(404)
          .send({ errors: ['Book not found'], response: null, status: false });
    } else if (!Array.isArray(books) || books?.length === 0)
      return response
        .status(404)
        .send({ errors: ['Books not found'], response: null, status: false });

    return response.status(200).send({
      response: books,
      errors: [],
      status: true,
    });
  }

  async createBook(reques, response) {
    const file = reques?.file || null;
    let body = reques.body;
    if (body) {
      if (file) {
        body = { ...body, fileName: file.originalname, fileBook: file.path };
      }
      let result = await BooksService.createBook(body);

      if (result)
        return response
          .status(200)
          .send({ errors: [], response: result, status: true });
      else
        return response.status(500).send({
          errors: ['Unable create book'],
          response: null,
          status: false,
        });
    } else
      return response
        .status(400)
        .send({ errors: ['Bad request'], response: null, status: false });
  }

  async updateBook(reques, response) {
    const id = reques.params?.id || '';
    const body = reques.body;
    if (id && body) {
      const books = await BooksService.getBooks();
      const book = books.find((book) => book.id === id);
      if (book) {
        let updateBook = await BooksService.updateBook(id, body);

        if (updateBook)
          return response
            .status(200)
            .send({ errors: [], response: updateBook, status: true });
        else
          return response.status(500).send({
            errors: ['Unable update book'],
            response: null,
            status: false,
          });
      } else
        return response
          .status(404)
          .send({ errors: ['Book not found'], response: null, status: false });
    } else
      return response.status(404).send({
        errors: ['Bad request: Not id'],
        response: null,
        status: false,
      });
  }

  async deleteBook(reques, response) {
    const id = reques.params?.id || '';
    if (id) {
      const books = await BooksService.getBooks();
      const book = books.find((book) => book.id === id);
      if (book) {
        let result = await BooksService.deleteBook(id);

        if (result)
          return response
            .status(200)
            .send({ errors: [], response: 'OK', status: true });
        else
          return response.status(500).send({
            errors: ['Unable delete book'],
            response: null,
            status: false,
          });
      } else
        return response
          .status(404)
          .send({ errors: ['Book not found'], response: null, status: false });
    } else
      return response.status(404).send({
        errors: ['Bad request: Not id'],
        response: null,
        status: false,
      });
  }

  async downloadBook(reques, response) {
    const id = reques.params?.id || '';
    const books = await BooksService.getBooks();
    if (id) {
      const book = books.find((book) => book.id === id);
      if (book)
        if (book?.fileBook) {
          return response.status(200).download(book.fileBook);
        } else
          return response.status(404).send({
            errors: ['Books not found file'],
            response: null,
            status: false,
          });
      else
        return response
          .status(404)
          .send({ errors: ['Book not found'], response: null, status: false });
    } else if (!Array.isArray(books) || books?.length === 0)
      return response
        .status(404)
        .send({ errors: ['Books not found'], response: null, status: false });
  }
}

module.exports = new BooksController();
