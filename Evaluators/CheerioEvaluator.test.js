const CheerioEvaluator = require('./CheerioEvaluator');

test('construct', () => {
  const html = `
<html>
<head>
  <title>TITLE</title>
</head>
<body>
  <ul>
    <li></li>
    <li></li>
  </ul>
</body>
</html>
`;

  const evaluator = new CheerioEvaluator({html});

  /* Hasn't boot evaluator hence null cheerio instance inside */

  expect(evaluator.$).toBe(null);

  /* Boot */

  evaluator.boot();

  /* Test using cheerio */

  expect(evaluator.$('li').length).toBe(2);
  expect(evaluator.$('head title').text()).toBe('TITLE');
});