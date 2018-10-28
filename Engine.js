const BaseReader = require('./Readers/BaseReader');
const BaseWriter = require('./Writers/BaseWriter');
const BaseEvaluator = require('./Evaluators/BaseEvaluator');
const BaseRule = require('./Rules/BaseRule');
const CheerioEvaluator = require('./Evaluators/CheerioEvaluator');

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

  static create(params) {
    const mergedParams = {
      reader    : params.reader ? params.reader : null,
      writer    : params.writer ? params.writer : null,
      evaluators: {
        cheerio: new CheerioEvaluator(),
      },
      rules     : params.rules ? params.rules : null,
    };

    /* Merge extra evaluators. */
    /* Existing cheerio evaluator will be replaced if the same key is provided */

    if (params.evaluators) {
      mergedParams.evaluators = {
        ...mergedParams.evaluators,
        ...params.evaluators,
      }
    }

    return new Engine(mergedParams);
  }

  registerEvaluator(name, evaluator) {
    if (this._evaluators[name]) {
      throw 'Evaluator already registered: ' + name;
    }

    if (!(evaluator instanceof BaseEvaluator)) {
      throw 'Require instance of BaseEvaluator';
    }

    this._evaluators[name] = evaluator;

    return this;
  }

  addRule(rule) {
    if (!(rule instanceof BaseRule)) {
      throw 'Require instance of BaseRule';
    }

    this._rules.push(rule);

    return this;
  }

  runEvaluators(html) {
    /* Boot evaluators */

    Object.keys(this.evaluators).forEach(key => {
      this.evaluators[key].boot({html})
    });

    /* Collect defects */

    const defects = [];

    this.rules.forEach(rule => {
      rule
        .evaluate({evaluators: this.evaluators})
        .forEach(defect => {
          defects.push(defect);
        })
    });

    return this.writer.write(defects);
  };

  evaluate() {
    const rs = this.reader.read();

    if (rs instanceof Promise) {
      return rs.then(() => {
        return Promise.resolve(this.runEvaluators(this.reader.html))
      });
    }
    else {
      return this.runEvaluators(this.reader.html);
    }
  }
}

module.exports = Engine;