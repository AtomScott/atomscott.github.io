# Quick and Dirty Set

[![Build Status](https://travis-ci.org/qwtel/qd-set.svg?branch=master)](https://travis-ci.org/qwtel/qd-set)

A tiny (10 LOC) [ES6 `Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) implementation.
Think of it as a forwards-compatible [`_.uniq(array)`](http://underscorejs.org/#uniq).

**Disclaimer**: Not a complete polyfill, don't use on large data.

## Usage
```js
import { Set } from 'qd-set/esm/index';

const s = new Set([1, 2, 2, 3])
s.size       // => 3
s.add(3)     // => Set([1, 2, 3])
s.add(4)     // => Set([1, 2, 3, 4])
s.has(4)     // => true
s.delete(3)  // => 3
s.forEach(x => console.log(x))
// 1
// 2
// 4
s.clear()    
s.size       // => 0
s.has(1)     // => false
```

Need `keys`, `values`, `entries`?

```js
import { Set } from 'qd-set/esm/with-iter';

const s = new Set([1, 2, 2, 3])
const it = s.values();
it.next().value  // => 1
it.next().value  // => 2
it.next().value  // => 3
it.next().done   // => true
```

## Source

```js
export function Set(a = []) {
  a = a.filter((x, i) => i === a.indexOf(x));
  a.size = a.length;
  a.has = x => a.indexOf(x) > -1;
  a.add = x => { if (!a.has(x)) { a.size++; a.push(x); } return a; };
  a.delete = x => { let t; if (t = a.has(x)) { a.size--; a.splice(a.indexOf(x), 1) } return t; };
  a.clear = () => { while (a.pop()) {} a.size = 0; };
  return a;
}
```
