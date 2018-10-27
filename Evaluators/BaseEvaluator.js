class BaseEvaluator {
  constructor(params) {
    this._params = params;
  }

  get params() {
    return this._params;
  }

  boot() {
    /* Do nothing by default */
  }
}

module.exports = BaseEvaluator;