const BaseReader = require('./BaseReader');

class StringReader extends BaseReader {
  read() {
    this._html = this.params.html;
  }
}

module.exports = StringReader;