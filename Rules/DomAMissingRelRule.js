const BaseRule = require('./BaseRule');

class DomAMissingRelRule extends BaseRule {
  validate({evaluators}) {
    const $ = evaluators.cheerio.$;

    let count = 0;

    $('a').each((i, a) => {
      const rel = $(a).attr('rel');

      if (rel.trim().length < 1) {
        count++;
      }
    });

    if (count < 1) {
      return [];
    }

    return [
      `Count of <a/> missing rel: ${count}`,
    ];
  }
}

module.exports = DomAMissingRelRule;