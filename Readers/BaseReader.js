class BaseReader {
  constructor(params = {}) {
    this._html = null;
    this._params = params;
  }

  get html() {
    return this._html;
  }

  set html(val) {
    this._html = val;
  }

  get params() {
    return this._params;
  }

  read() {
    throw 'Method not implemented: read';
  }
}

module.exports = BaseReader;