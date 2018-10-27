class BaseRule {
  constructor(params = {}) {
    this._params = params;
  }

  get params() {
    return this._params;
  }

  validate(context) {
    throw 'Method not implemented: validate';
  }
}

module.exports = BaseRule;