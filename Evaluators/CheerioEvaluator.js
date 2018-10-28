const cheerio = require('cheerio');

const BaseEvaluator = require('./BaseEvaluator');

class CheerioEvaluator extends BaseEvaluator {
  constructor(params = {}) {
    super(params);

    this.cheerio = null;
  }

  get $() {
    return this.cheerio;
  }

  boot({html}) {
    this.cheerio = cheerio.load(html);
  }

  countTagsMissingAttr(tag, attr) {
    let count = 0;

    this.$(tag).each((i, tagEl) => {
      const attrText = this.$(tagEl).attr(attr);

      if (attrText.trim().length < 1) {
        count++;
      }
    });

    return count;
  }
}

module.exports = CheerioEvaluator;