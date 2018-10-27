const BaseReader = require('./Readers/BaseReader');

class Engine {
  constructor() {
    this._reader = null;
    this._writer = null;
    this._evaluators = {};
    this._rules = [];
  }

  get reader() {
    return this._reader;
  }

  set reader(reader) {
    if (!(reader instanceof BaseReader)) {
      throw 'Requires instance of BaseReader';
    }

    this._reader = reader;

    return this;
  }

  get writer() {
    return this._writer;
  }

  set writer(writer) {
    this._writer = writer;

    return this;
  }

  get evaluators() {
    return this._evaluators;
  }

  get rules() {
    return this._rules;
  }

  registerEvaluator(name, evaluator) {
    if (this._evaluators[name]) {
      throw 'Evaluator already defined: ' + name;
    }

    this._evaluators[name] = evaluator;

    return this;
  }

  addRule(rule) {
    this._rules.push(rule);
  }
}

module.exports = Engine;