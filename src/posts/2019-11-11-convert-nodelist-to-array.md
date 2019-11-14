---
title: "How to convert a NodeList to an array"
tags:
  - javascript
---
```html
<!-- Example HTML markup -->
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ul>
```

```js
const items = document.querySelectorAll('li');
console.log(items) // NodeList(4) [li, li, li, li]
```

## [...]

```js
const items = [...document.querySelectorAll('li')];
console.log(items) // (4) [li, li, li, li]
```

[MDN - Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Array.from()

```js
const itemsArray = Array.from(document.querySelectorAll('li'));
console.log(items) // (4) [li, li, li, li]
```

[MDN - Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)


## [].slice.call

```js
const items = [].slice.call(document.querySelectorAll('li'));
console.log(items) // (4) [li, li, li, li]
```

[MDN - Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
