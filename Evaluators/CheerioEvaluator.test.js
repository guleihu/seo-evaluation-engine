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

  /* Hasn't initialize handler */

  expect(evaluator.handler).toBe(null);

  /* Boot and initialize handler as instance of cheerio */

  evaluator.boot();

  /* Test using cheerio */

  expect(evaluator.handler('li').length).toBe(2);
  expect(evaluator.handler('head title').text()).toBe('TITLE');
});