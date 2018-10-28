const helper = require('./helpers');
const DomImgMissingAltRule = require('./DomImgMissingAltRule');

test('validate:valid', () => {
  const htmlValid = `
<html>
<body>
<img src="" alt="Test Pic 1">
<img src="" alt="Test Pic 2">
</body>
</html>  
`;

  const defects = helper.evaluate(htmlValid, new DomImgMissingAltRule());

  expect(defects).toEqual([]);
});

test('validate:invalid', () => {
  const htmlInvalid = `
<html>
<body>
<img src="" alt="">
<img src="" alt="">
</body>
</html>  
`;

  const defects = helper.evaluate(htmlInvalid, new DomImgMissingAltRule());

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Count of <img/> missing alt: 2');
});