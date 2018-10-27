class BaseEvaluator {
  constructor(params) {
    this._handler = null;
    this._params = params;
  }

  get handler() {
    /* User evaluator itself as handler by default */

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