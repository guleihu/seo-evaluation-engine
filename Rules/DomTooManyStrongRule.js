const BaseRule = require('./BaseRule');

class DomTooManyStrongRule extends BaseRule {
  constructor(params) {
    if (isNaN(params.max)) {
      params.max = 15;
    }

    super(params);
  }

  evaluate({evaluators}) {
    const max = this.params.max;

    if (isNaN(max)) {
      throw 'Parameter is not a number: max';
    }

    const count = evaluators.cheerio.$('strong').length;

    if (count > max) {
      return [
        `Too many <strong/> more than ${max}: ${count}`,
      ];
    }

    return [];
  }
}

module.exports = DomTooManyStrongRule;