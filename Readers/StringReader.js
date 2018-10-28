const BaseReader = require('./BaseReader');

class StringReader extends BaseReader {
  read() {
    this.html = this.params.html;
  }
}

module.exports = StringReader;