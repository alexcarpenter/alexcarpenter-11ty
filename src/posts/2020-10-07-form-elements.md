---
title: Form elements API
description:
tags:
  - JavaScript
---
I've been working with forms a lot this past week and discovered the `HTMLFormElement.elements` API. This allows you to collect all of the inputs within a form and access them via their index or name.

Lets say we have a form with a first name and last name field as shown below.

```html
<form>
  <label for="firstName">First Name</label>
  <input type="text" name="firstName" value="Alex" />
  <label for="lastName">Last Name</label>
  <input type="text" name="lastName" value="Carpenter" />
</form>
```

We can then access the form inputs in JavaScript by query selecting the form and collect the inputs via `form.elements`.

```js
const form = document.querySelector('form');
const elements = form.elements;

// Get input values by index
elements[0].value // ~> Alex
elements[1].value // ~> Carpenter

// Get input values by name
elements['firstName'].value // ~> Alex
elements['lastName'].value // ~> Carpenter
```

This makes for an efficient method of accessing form data with vanilla JavaScript.
