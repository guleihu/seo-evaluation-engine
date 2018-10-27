const DocImgMissingAltRule = require('./DocImgMissingAltRule');
const CheerioEvaluator = require('../Evaluators/CheerioEvaluator');

function validate(html) {
  /* Prepare evaluators */

  const evaluatorSrcs = {
    'cheerio': new CheerioEvaluator({html}),
  };

  const evaluators = {};

  Object.entries(evaluatorSrcs).forEach(entry => {
    entry[1].boot();

    evaluators[entry[0]] = entry[1].evaluator;
  });

  /* Create rule and validate */

  const rule = new DocImgMissingAltRule();

  return rule.validate({evaluators});
}

test('validate:valid', () => {
  const htmlValid = `
<html>
<body>
<img src="" alt="Test Pic 1">
<img src="" alt="Test Pic 2">
</body>
</html>  
`;

  const defects = validate(htmlValid);

  expect(defects).toEqual([]);
});

test('validate:invalid', () => {
  const htmlValid = `
<html>
<body>
<img src="" alt="">
<img src="" alt="">
</body>
</html>  
`;

  const defects = validate(htmlValid);

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Count of <img/> missing alt: 2')
});