# Free utility in Node

Get OS memory stats in OSX and Linux.

## Install with

```bash
npm install node-free
```

## Usage

```javascript
var memory = require('node-free');

memory.total(); // total memory in bytes
memory.used(); // used memory in bytes
memory.free(); // free memory in bytes
```

Prettify output with [bytes](https://github.com/visionmedia/bytes.js)

## Tested with

- OSX  
- Centos 6 and 7

## License 

[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/sydcanem/node-free/blob/master/LICENSE)