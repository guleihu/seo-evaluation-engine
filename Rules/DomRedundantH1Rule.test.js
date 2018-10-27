const helper = require('./helpers');
const DomRedundantH1Rule = require('./DomRedundantH1Rule');

test('validate:valid', () => {
  const htmlValid = `
<html>
<body>
<h1>#1</h1>
</body>
</html>  
`;

  const defects = helper.validate(htmlValid, new DomRedundantH1Rule());

  expect(defects).toEqual([]);
});

test('validate:invalid', () => {
  const htmlInvalid = `
<html>
<body>
<h1>#1</h1>
<h1>#2</h1>
</body>
</html>  
`;

  const defects = helper.validate(htmlInvalid, new DomRedundantH1Rule());

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Redundant <h1/>');
});