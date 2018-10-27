class BaseReader {
  constructor() {
    this._html = null;
  }

  read(input) {
    // To be implemented
  }

  get html() {
    return this._html;
  }
}

module.exports = BaseReader;