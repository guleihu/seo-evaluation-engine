class BaseEvaluator {
  constructor(params) {
    this._params = params;
  }

  get evaluator() {
    /* User evaluator itself by default */

    return this;
  }

  get params() {
    return this._params;
  }

  boot() {
    /* Do nothing by default */
  }
}

module.exports = BaseEvaluator;