const CheerioEvaluator = require('../Evaluators/CheerioEvaluator');

module.exports.validate = (html, rule) => {
  /* Boot evaluators */

  const evaluators = {
    'cheerio': new CheerioEvaluator({html}),
  };

  Object.keys(evaluators).forEach(key => {
    evaluators[key].boot();
  });

  /* Validate */

  return rule.validate({evaluators});
};
