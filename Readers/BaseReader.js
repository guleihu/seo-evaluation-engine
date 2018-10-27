class BaseReader {
  constructor() {
    this._html = null;
  }

  read(input) {
    throw 'Method not implemented: read';
  }

  get html() {
    return this._html;
  }
}

module.exports = BaseReader;