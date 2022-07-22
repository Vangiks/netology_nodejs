const multer = require('multer');

class File {
  constructor(destination, filename = null, options = null) {
    this.filename = filename;
    this.destination = destination;
    this.options = options;
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        let name = file.originalname;
        if (this.filename) {
          name = this.filename;
        }
        if (this.options?.uniqueName) {
          name = `${Date.now()}-${name}`;
        }
        cb(null, name);
      },
    });
  }

  upload() {
    return multer({ storage: this.storage });
  }
}

module.exports = File;
