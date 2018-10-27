const BaseReader = require('./BaseReader');

class StringReader extends BaseReader {
  read() {
    this._html = this._input.html;
  }
}

module.exports = StringReader;