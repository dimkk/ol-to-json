# ol-to-json

converts text with line delimiters and ordered list to json

## Install

```sh
npm i ol-to-json
```

## Usage

```js
// const ol2json = require("ol-to-json");
// or
import ol2json from 'ol-to-json';

const testString = 'this is test header \r\n 1. line 1 \r\n 1.1. line 11 \r\n line 11 next';
let result = ol2json(testString, '\r\n');
console.log(result);
```

output:

```js
{
    header:"this is test header "
    1:{
        text: " line 1 "
        1:{
            text: "line 11 line 11 next"
        }
    }
}
```

more complex result in index.test.ts
