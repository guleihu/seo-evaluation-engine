# Usage

## Engine

Example:

```javascript
/* Create an engine using factory static method */

const engine = Engine.create({
  reader: new StringReader({html}),
  writer: new ConsoleWriter(),
  rules : [
    new DomHeadCheckRule(),
  ],
});

/* Register another Evaluator later */

engine.registerEvaluator(
  'another',
  new AnotherEvaluator()
);

/* Evaluate and output the results */

engine.evalute();
```

- **CheerioEvaluator** is embedded by default.

## StringReader

Example:

```javascript
new StringReader({
  html: 'SOME_HTML'
});
```

## FileReader

Example:

```javascript
new FileReader({
  path: 'FILEPATH',
});
```

## StreamReader

Example:

```javascript
const stream = fs.createReadStream('FILEPATH');

new StreamReader({stream});
```

## CheerioEvaluator

Example:

```javascript
new CheerioEvaluator();
```

- **Cheerio** instance will be available at `evaluators.cheerio.$`.

## DomAMissingRelRule

Example:

```javascript
new DomAMissingRelRule();
```

## DomHeadCheckRule

Example:

```javascript
new DomHeadCheckRule();
```

## DomImgMissingAltRule

Example:

```javascript
new DomImgMissingAltRule();
```

## DomRedundantH1Rule

Example:

```javascript
new DomRedundantH1Rule();
```

## DomTooManyStrongRule

Example:

```javascript
new DomTooManyStrongRule({
  max: 15,
})
```

- **max** is 15 by default

## ConsoleWriter

Example:

```javascript
new ConsoleWriter();
```

## FileWriter

Example:

```javascript
new FileWriter({
  path: 'FILEPATH',
})
```

## StreamWriter

Example:

```javascript
const stream = fs.createWriteStream('FILEPATH');

new StreamWriter({stream});
```