const helper = require('./helpers');
const DomAMissingRelRule = require('./DomAMissingRelRule');

test('validate:valid', () => {
  const htmlValid = `
<html>
<body>
<a href="" rel="Link 1"></a>
<a href="" rel="Link 2"></a>
</body>
</html>  
`;

  const defects = helper.evaluate(htmlValid, new DomAMissingRelRule());

  expect(defects).toEqual([]);
});

test('validate:invalid', () => {
  const htmlInvalid = `
<html>
<body>
<a href="" rel=""></a>
<a href="" rel=""></a>
</body>
</html>  
`;

  const defects = helper.evaluate(htmlInvalid, new DomAMissingRelRule());

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Count of <a/> missing rel: 2');
});