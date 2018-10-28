class BaseRule {
  constructor(params = {}) {
    this._params = params;
  }

  get params() {
    return this._params;
  }

  evaluate(context) {
    throw 'Method not implemented: validate';
  }
}

module.exports = BaseRule;