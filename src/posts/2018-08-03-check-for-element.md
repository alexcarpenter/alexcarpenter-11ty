---
title: Check for an element on a page before running Javascript code
summary: It can be common to run a piece of Javascript code based on the availability of an element on the page like a button.
tags:
  - javascript
---
It can be common to run a piece of Javascript code based on the availability of an element on the page like a button. If the button is present we want to run a method, otherwise we want it to return (stop from executing).

Lets use our modal component as an example. We've consolidated our modal functionality into a function. We query select our modal trigger button and then add an eventlistener that watches for clicks on our button. When that button is clicked we want to run our modal show or hide methods as needed.

```js
function modal() {
  var trigger = document.querySelector('[data-modal-trigger]');

  trigger.addEventListener('click', function() {
    // Modal functionality code
  }, false);
}

modal();
```

The code above *assumes* the trigger element will always be available. In our case that won't always be true. We only want our modal to be present on the about page. So when our users visit the homepage or contact page, the above code  will throw an error (`Uncaught TypeError: Cannot read property 'addEventListener' of null`) because the trigger element is not available on the page.

To fix this, we need to first check for the trigger on the page and do some logic based on its availibility. Since we are using `querySelector` which references a single element, we can check for that element using `if (trigger)`. This will be `true` if the element is available, and `false` if not available. With that in mind we can add this logic before our event listener is added as seen highlighted below. You can see we also added an exclamation mark before our trigger variable. This means **if not**. So **if** the trigger **is not** available `return`.

```js/4
function modal() {
  var trigger = document.querySelector('[data-modal-trigger]');

  // Return early if our trigger is not available
  if (!trigger) return;

  trigger.addEventListener('click', function() {
    // Modal functionality code
  }, false);
}

modal();
```

Now our modal functionality code will only execute if our trigger is available and will not throw and error otherwise.
