class BaseReader {
  constructor(input = {}) {
    this._html = null;
    this._input = input;
  }

  read() {
    throw 'Method not implemented: read';
  }

  get html() {
    return this._html;
  }
}

module.exports = BaseReader;