const BaseReader = require('./BaseReader');

class StringReader extends BaseReader {
  read({html}) {
    this._html = html;
  }
}

module.exports = StringReader;