const CheerioEvaluator = require('../Evaluators/CheerioEvaluator');

module.exports.validate = (html, rule) => {
  /* Prepare evaluators */

  const evaluatorSrcs = {
    'cheerio': new CheerioEvaluator({html}),
  };

  const evaluators = {};

  Object.entries(evaluatorSrcs).forEach(entry => {
    entry[1].boot();

    evaluators[entry[0]] = entry[1].evaluator;
  });

  /* Validate */

  return rule.validate({evaluators});
};
