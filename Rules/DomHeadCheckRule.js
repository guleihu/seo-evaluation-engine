const BaseRule = require('./BaseRule');

class DomHeadCheckRule extends BaseRule {
  validate({evaluators}) {
    const defects = [];
    const $ = evaluators.cheerio.$;

    if ($('head title').length < 1) {
      defects.push('Missing <title/> in <head/>');
    }

    if ($('head meta[name=description]').length < 1) {
      defects.push('Missing <meta name="description"/> in <head/>');
    }

    if ($('head meta[name=keywords]').length < 1) {
      defects.push('Missing <meta name="keywords"/> in <head/>');
    }

    return defects;
  }
}

module.exports = DomHeadCheckRule;