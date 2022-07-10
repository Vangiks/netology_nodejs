#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class Logger {
  file = null;
  constructor(file) {
    const stream = fs.createWriteStream(file);
    this.file = { ...path.parse(file), stream };
  }

  log(text) {
    this.file.stream.write(text);
  }
}

module.exports = Logger;
