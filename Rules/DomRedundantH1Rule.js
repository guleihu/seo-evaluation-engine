const BaseRule = require('./BaseRule');

class DomRedundantH1Rule extends BaseRule {
  validate({evaluators}) {
    const count = evaluators.cheerio.$('h1').length;

    if (count <= 1) {
      return [];
    }

    return [
      `Redundant <h1/>`,
    ];
  }
}

module.exports = DomRedundantH1Rule;