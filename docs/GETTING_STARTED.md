# Getting Started

## Install
```bash
yarn add @guleihu/seo-evaluation-engine
```

## Configure & Run
```javascript
const Engine = require('@guleihu/seo-evaluation-engine/Engine');
const StringReader = require('@guleihu/seo-evaluation-engine/Readers/StringReader');
const ConsoleWriter = require('@guleihu/seo-evaluation-engine/Writers/ConsoleWriter');
const DomHeadCheckRule = require('@guleihu/seo-evaluation-engine/Rules/DomHeadCheckRule');

const html = `
<html>
<head></head>
<body></body>
</html>
`;

const engine = Engine.create({
  reader: new StringReader({html}),
  writer: new ConsoleWriter(),
  rules : [
    new DomHeadCheckRule(),
  ],
});

engine.evaluate();
```

## Output
    Missing <title/> in <head/>
    Missing <meta name="description"/> in <head/>
    Missing <meta name="keywords"/> in <head/>
