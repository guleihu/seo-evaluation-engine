const helper = require('./helpers');
const DomTooManyStrongRule = require('./DomTooManyStrongRule');

test('validate:valid', () => {
  const htmlValid = `
<html>
<body>
<strong>#1</strong>
</body>
</html>  
`;

  const defects = helper.evaluate(
    htmlValid,
    new DomTooManyStrongRule({
      max: 15,
    }),
  );

  expect(defects).toEqual([]);
});

test('validate:invalid', () => {
  const htmlInvalid = `
<html>
<body>
<strong>#1</strong>
<strong>#2</strong>
<strong>#3</strong>
<strong>#4</strong>
<strong>#5</strong>
<strong>#6</strong>
<strong>#7</strong>
<strong>#8</strong>
<strong>#9</strong>
<strong>#10</strong>
<strong>#11</strong>
<strong>#12</strong>
<strong>#13</strong>
<strong>#14</strong>
<strong>#15</strong>
<strong>#16</strong>
</body>
</html>  
`;

  const defects = helper.evaluate(
    htmlInvalid,
    new DomTooManyStrongRule({
      max: 15,
    }),
  );

  expect(defects.length).toBe(1);
  expect(defects[0] = 'Too many <strong/> more than 15: 16');
});