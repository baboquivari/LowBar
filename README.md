# Lowbar

A re-implementation of Underscore's methods. This was an exercise in building solid javascript skills.

## Function List

1. identity
2. first
3. last
4. each
5. indexOf
6. filter
7. reject
8. map
9. pluck
10. reduce
11. contains
12. every
13. some
14. extend
15. defaults
16. indexOfWithBinary
17. once
18. memoize
19. delay
20. shuffle
21. sortBy
22. zip
23. sortedIndex
24. throttle

## How to import into another project

Copy the `lowbar.js` file into your directory and require it into the desired files

```javascript
const _ = require('your/unique/path');
```
*or*
```javascript
import _ from 'your/unique/path';
```

The functions can then be accessed using the following syntax:
```javascript
_.throttle();
```

## Running tests

Ensure that you are running the latest version of node (v8.1.1 on 15th June 2017)
```
$ node --version
```

Ensure that you have mocha installed
```
$ npm i mocha -g
```

Install dependencies
```
$ npm i
```

Run the tests
```
$ npm t
```