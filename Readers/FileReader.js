const fs = require('fs');
const BaseReader = require('./BaseReader');

class FileReader extends BaseReader {
  read() {
    const path = this.params.path;

    if (!path) {
      throw 'Missing parameter: path';
    }

    this._html = fs.readFileSync(path, 'utf8');
  }
}

module.exports = FileReader;