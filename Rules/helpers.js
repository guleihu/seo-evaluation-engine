const CheerioEvaluator = require('../Evaluators/CheerioEvaluator');

module.exports.evaluate = (html, rule) => {
  /* Boot evaluators */

  const evaluators = {
    'cheerio': new CheerioEvaluator(),
  };

  Object.keys(evaluators).forEach(key => {
    evaluators[key].boot({html});
  });

  /* Validate */

  return rule.evaluate({evaluators});
};
