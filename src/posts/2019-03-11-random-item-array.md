---
title: "Consecutively return a random item from a JavaScript array"
tags:
  - javascript
---
The other week I was working on a [side project](https://github.com/alexcarpenter/standup-starter) where I needed to consecutively return a random item from an array via a button click.

To do this, I first created a function that returns a random item from an array.

```js
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

The problem with using only the `randomItem` function here, is that it was not uncommon to return the same item twice in a row.

To fix that issue, I made use of a `do...while` loop to call the `randomItem` function until it returned a result which is not equal to the previously selected item.

So while `prevItem` is equal to `currentItem`, run the `randomItem` function.

```js/5-8
var fruit = ['Apples', 'Oranges', 'Pears'];

var currentItem = randomItem(fruit);

btn.addEventListener('click', function () {
  var prevItem = currentItem;
  do {
    currentItem = randomItem(fruit);
  } while (prevItem === currentItem);
}, false);
```

Now when we click the button, we will never get the same item returned consecutively.

Checkout the [demo](https://codepen.io/alexcarpenter/pen/QoMKNv?editors=1011) and open the console to see it in action.
