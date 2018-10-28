const BaseReader = require('./Readers/BaseReader');
const BaseWriter = require('./Writers/BaseWriter');

class Engine {
  constructor(params = {}) {
    this._reader = null;
    this._writer = null;
    this._evaluators = {};
    this._rules = [];

    if (params.reader) {
      this.reader = params.reader;
    }

    if (params.writer) {
      this.writer = params.writer;
    }

    if (params.evaluators) {
      Object
        .entries(params.evaluators)
        .forEach((entry) => {
          this.registerEvaluator(entry[0], entry[1]);
        });
    }

    if (params.rules) {
      params.rules.forEach(rule => {
        this.addRule(rule);
      })
    }
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
    if (!(writer instanceof BaseWriter)) {
      throw 'Require instance of BaseWriter';
    }

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
      throw 'Evaluator already registered: ' + name;
    }

    this._evaluators[name] = evaluator;

    return this;
  }

  addRule(rule) {
    this._rules.push(rule);

    return this;
  }
}

module.exports = Engine;