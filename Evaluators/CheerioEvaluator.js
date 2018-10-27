const cheerio = require('cheerio');

const BaseEvaluator = require('./BaseEvaluator');

class CheerioEvaluator extends BaseEvaluator {
  constructor(params) {
    super(params);

    this.cheerio = null;
  }

  get evaluator() {
    return this.cheerio;
  }

  boot() {
    const html = this.params.html;

    this.cheerio = cheerio.load(html);
  }
}

module.exports = CheerioEvaluator;