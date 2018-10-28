const DomHeadCheckRule = require('./DomHeadCheckRule');
const helper = require('./helpers');

test('validate:valid', () => {
  const htmlValid = `
<html>
<head>
  <title>TITLE</title>
  <meta name="description" content="META_DESC">
  <meta name="keywords" content="META_KEYWORDS">
</head>
<body></body>
</html>
`;

  const defects = helper.evaluate(htmlValid, new DomHeadCheckRule());

  expect(defects).toEqual([]);
});

test('validate:invalid:missing-title', () => {
  const htmlInvalid = `
<html>
<head>
  <meta name="description" content="META_DESC">
  <meta name="keywords" content="META_KEYWORDS">
</head>
<body></body>
</html>  
`;

  const defects = helper.evaluate(htmlInvalid, new DomHeadCheckRule());

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Missing <title/> in <head/>');
});

test('validate:invalid:missing-meta-description', () => {
  const htmlInvalid = `
<html>
<head>
  <title>TITLE</title>
  <meta name="keywords" content="META_KEYWORDS">
</head>
<body></body>
</html>  
`;

  const defects = helper.evaluate(htmlInvalid, new DomHeadCheckRule());

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Missing <meta name="description"/> in <head/>');
});

test('validate:invalid:missing-meta-keywords', () => {
  const htmlInvalid = `
<html>
<head>
  <title>TITLE</title>
  <meta name="description" content="META_DESC">
</head>
<body></body>
</html>  
`;

  const defects = helper.evaluate(htmlInvalid, new DomHeadCheckRule());

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Missing <meta name="keywords"/> in <head/>');
});

test('validate:invalid:missing-all', () => {
  const htmlInvalid = `
<html>
<head></head>
<body></body>
</html>  
`;

  const defects = helper.evaluate(htmlInvalid, new DomHeadCheckRule());
  const expected = [
    'Missing <title/> in <head/>',
    'Missing <meta name="description"/> in <head/>',
    'Missing <meta name="keywords"/> in <head/>',
  ];

  expect(defects.length).toBe(3);
  expect(defects).toEqual(expect.arrayContaining(expected))
});