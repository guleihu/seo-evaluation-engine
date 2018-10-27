const CheerioEvaluator = require('./CheerioEvaluator');

test('construct', () => {
  const evaluator = new CheerioEvaluator();
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

  /* Hasn't initialize handler */

  expect(evaluator.handler).toBe(null);

  /* Boot and initialize handler as instance of cheerio */

  evaluator.boot(html);

  /* Test using cheerio */

  expect(evaluator.handler('li').length).toBe(2);
  expect(evaluator.handler('head title').text()).toBe('TITLE');
});