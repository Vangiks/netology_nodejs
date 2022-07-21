const multer = require('multer');

class File {
  constructor(filename, destination) {
    this.filename = filename;
    this.destination = destination;
    this.storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, destination);
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
    });
  }

  upload() {
    return multer({ storage: this.storage });
  }
}

module.exports = File;
