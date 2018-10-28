class BaseWriter {
  constructor(params = {}) {
    this._params = params;
  }

  get params() {
    return this._params;
  }

  write(lines) {
    throw ' Method not implemented: write';
  }
}

module.exports = BaseWriter;