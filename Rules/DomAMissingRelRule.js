const BaseRule = require('./BaseRule');

class DomAMissingRelRule extends BaseRule {
  evaluate({evaluators}) {
    const count = evaluators.cheerio.countTagsMissingAttr('a', 'rel');

    if (count < 1) {
      return [];
    }

    return [
      `Count of <a/> missing rel: ${count}`,
    ];
  }
}

module.exports = DomAMissingRelRule;