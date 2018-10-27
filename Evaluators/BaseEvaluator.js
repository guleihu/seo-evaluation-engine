class BaseEvaluator {
  constructor() {
    this._handler = null;
  }

  get handler() {
    /* User evaluator itself as handler by default */

    return this;
  }

  boot() {
    /* Do nothing by default */
  }
}

module.exports = BaseEvaluator;