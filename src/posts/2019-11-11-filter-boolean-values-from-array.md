---
title: "How to filter boolean values from an array"
tags:
  - JavaScript
---
```js
const values = ['Alex', '', true, false, 1, 0];
const filteredValues = values.filter(Boolean);
console.log(filteredValues); // (3) ['Alex', true, 1]
```
