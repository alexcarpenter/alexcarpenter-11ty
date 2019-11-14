---
title: "How to check if an object within array contains a value"
tags:
  - javascript
---
When needing to check whether or not an object within an array contains a value, we can use the `some()` method which returns a Boolean value.

To demonstrate we can create two arrays containing objects with a key of status and a value of either *sent* or *draft*.

```js
const arrOne = [
	{ status: 'sent' },
	{ status: 'draft' },
	{ status: 'sent' },
];

const arrTwo = [
	{ status: 'sent' },
	{ status: 'sent' },
	{ status: 'sent' },
];
```

Next, we create a callback function to test for a status of draft.

```js
const hasDraft = obj => obj.status === 'draft';
```

Now we can test array one and two for elements with a status of draft using the `some()` method.

```js
arrOne.some(hasDraft); // true
arrTwo.some(hasDraft); // false
```

[Here's a demo on CodePen](https://codepen.io/alexcarpenter/pen/qBWzPpN?editors=0011) that you can play with.
