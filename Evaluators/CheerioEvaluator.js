const cheerio = require('cheerio');

class CheerioEvaluator {
  constructor() {
    this._handler = null;
  }

  get handler() {
    return this._handler;
  }

  boot(html) {
    this._handler = cheerio.load(html);
  }
}

module.exports = CheerioEvaluator;