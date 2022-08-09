const fetch = require('node-fetch');

const config = require('../../config');

class CounterBook {
    constructor() {
        this.host = config.APP_COUNTER_BOOKS_HOST;
    }

    async icreaseCounter(bookId) {
        return await fetch(
            `${this.host}/counter/${bookId}/incr`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            }
          )
            .then((data) => {
              return data.json();
            })
            .then((response) => response.response);
    }

    async getCounter(bookId) {
        return await fetch(`${this.host}/counter/${bookId}`)
        .then((data) => {
          return data.json();
        })
        .then((response) => response.response);
    }
}

module.exports = CounterBook;

