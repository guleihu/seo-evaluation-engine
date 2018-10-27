const BaseRule = require('./BaseRule');

class DomImgMissingAltRule extends BaseRule {
  validate({evaluators}) {
    const count = evaluators.cheerio.countTagsMissingAttr('img', 'alt');

    if (count < 1) {
      return [];
    }

    return [
      `Count of <img/> missing alt: ${count}`,
    ];
  }
}

module.exports = DomImgMissingAltRule;