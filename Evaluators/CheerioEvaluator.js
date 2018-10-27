const cheerio = require('cheerio');

const BaseEvaluator = require('./BaseEvaluator');

class CheerioEvaluator extends BaseEvaluator {
  get handler() {
    return this._handler;
  }

  boot() {
    const html = this.params.html;

    this._handler = cheerio.load(html);
  }
}

module.exports = CheerioEvaluator;