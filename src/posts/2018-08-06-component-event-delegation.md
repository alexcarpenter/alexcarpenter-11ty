---
title: Component event delegation
summary: Lets take a look at how we can make use of event delegation to manage our components event listeners efficiently.
tags:
  - javascript
---
Last week I wrote about [checking for an element on a page](/posts/2018/08/check-for-element/) before executing our Javascript to avoid errors. That example works well if you only have one element to attach an event listener to. If you have multiple components and triggers, we should look into using event delegation to keep our code performant.

So lets refactor our modal component code from last week to make use of event delegation.

```js
function modal() {
  var trigger = document.querySelector('[data-modal-trigger]');
  trigger.addEventListener('click', function() {
    // Modal functionality code
  }, false);
}
modal();
```

First lets pass the `event` through to our modal function. Then we can use the `closest()` method to see if our modal trigger was clicked.

Now that we have refactored our modal function. We can attach an event listener to the document. Now any time a click happens within the document, we run our modal code and pass through the click event.

```js
function modal(event) {
  if (!event.target.closest('[data-modal-trigger]') return;
  // Modal functionality code
}

document.addEventListener('click', function(event) {
  modal(event);
}, false);
```

This allows us to add multiple components to our site and only have a single event listener as shown below.

```js
function modal(event) {
  if (!event.target.closest('[data-modal-trigger]') return;
  // Modal functionality code
}

function accordion(event) {
  if (!event.target.closest('[data-accordion-trigger]') return;
  // Accordion functionality code
}

document.addEventListener('click', function(event) {
  modal(event);
  accordion(event);
}, false);
```

Note that this assumes that your components are all run off of a click event, which might not always be the case. You might also have components which need to watch for `mouseover` or `mouseout` events, which would require seperate event listeners.

Check out the [CodePen](https://codepen.io/alexcarpenter/pen/pZKeKV) to see the code in action.
