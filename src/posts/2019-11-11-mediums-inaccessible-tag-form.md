---
title: "Medium's inaccessible tag selector form"
tags:
  - accessibility
---

It had been awhile since I had visited Medium's homepage, mostly because I tend to exit when I am immediately prompted to login to read the article.

Upon landing on the homepage today I noticed a new to me checkbox form to help you get started with an account, sort of.

{% Figure {
  src: '/assets/images/medium-checkbox-form.jpg',
  alt: "Screenshot of Medium's homepage checkbox form",
  ratio: '1000/466',
  border: true
} %}

Upon further inspection I noticed what looked to be a group of checkboxes was ultimately a collection of div's.

## Medium's current markup implementation

```html
<div class="an de df dg dh di dj dk dl aq b by dm dn cb do be">
  <div class="df dp v dq">
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="15" fill="#1E1B1D"></circle>
      <path
        d="M10.78 21h1.73l.73-3.2h2.24l-.74 3.2h1.76l.72-3.2h3.3v-1.6H17.6l.54-2.4H21v-1.6h-2.5l.72-3.2h-1.73l-.73 3.2h-2.24l.74-3.2H13.5l-.73 3.2H9.5v1.6h2.93l-.56 2.4H9v1.6h2.52l-.74 3.2zm2.83-4.8l.54-2.4h2.24l-.54 2.4H13.6z"
        fill="#fff"
      ></path>
    </svg>
  </div>
  Technology
</div>
```

This means that folks who rely on keyboard or voiceover tools to interact with the web are unable to "Select what their into" before they get started.

I've implemented custom checkboxes before, so I took 15 minutes to create an alternavite accessible markup solution that accomplishes the same visual implementation.

## Accessible markup solution

```html
<label class="control" for="technology">
  <input type="checkbox" name="topics" id="technology" />
  <span class="control__content">
    <svg
      aria-hidden="true"
      focusable="false"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <circle cx="15" cy="15" r="15" fill="#1E1B1D"></circle>
      <path
        d="M10.78 21h1.73l.73-3.2h2.24l-.74 3.2h1.76l.72-3.2h3.3v-1.6H17.6l.54-2.4H21v-1.6h-2.5l.72-3.2h-1.73l-.73 3.2h-2.24l.74-3.2H13.5l-.73 3.2H9.5v1.6h2.93l-.56 2.4H9v1.6h2.52l-.74 3.2zm2.83-4.8l.54-2.4h2.24l-.54 2.4H13.6z"
        fill="#fff"
      ></path>
    </svg>
    Technology
  </span>
</label>
```

## Fieldset and legend

We should even take this a step further and wrap the checkboxes in a fieldset and legend. This will help voiceover users understand what they are interacting with.

```html
<form>
  <fieldset>
    <legend>Select what topics you're into</legend>
    <!-- checkboxes -->
  </fieldset>
</form>
```

[Here is a link to a CodePen](https://codepen.io/alexcarpenter/details/RwwBEBL) to see it in action.
