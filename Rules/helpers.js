const CheerioEvaluator = require('../Evaluators/CheerioEvaluator');

module.exports.validate = (html, rule) => {
  /* Boot evaluators */

  const evaluators = {
    'cheerio': new CheerioEvaluator(),
  };

  Object.keys(evaluators).forEach(key => {
    evaluators[key].boot({html});
  });

  /* Validate */

  return rule.validate({evaluators});
};
