---
title: How to create custom checkbox and radio inputs with CSS
summary: ""
youtubeId: "54YeIQ7Eo_g"
duration: "6:39"
tags:
  - css
primaryColor: "#4ca55e"
---
One major thing I forgot to outline in the screencast is ensuring there is a focused state applied to the custom indicator when the user has focused the input. The code provided below includes a focus state.

```html
<!-- checkbox -->
<label class="control">
  <input type="checkbox" class="control__input visually-hidden">
  <span class="control__indicator"></span>
  Blue
</label>

<!-- radio -->
<label class="control">
  <input type="radio" name="color" class="control__input visually-hidden">
  <span class="control__indicator control__indicator--radio"></span>
  Blue
</label>
```

```css
.control {
  display: inline-flex;
  align-items: center;
}

.control__indicator {
  margin-right: .25rem;
  width: .75rem;
  height: .75rem;
  background-color: #ccc;
  border-radius: 3px;
}

.control__indicator--radio {
  border-radius: 50%;
}

.control__input:focus ~ .control__indicator {
  box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
}

.control__input:checked ~ .control__indicator {
  background-color: #05f;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4gIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4gIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOCA3bC0xLjQxLTEuNDEtNi4zNCA2LjM0IDEuNDEgMS40MUwxOCA3em00LjI0LTEuNDFMMTEuNjYgMTYuMTcgNy40OCAxMmwtMS40MSAxLjQxTDExLjY2IDE5bDEyLTEyLTEuNDItMS40MXpNLjQxIDEzLjQxTDYgMTlsMS40MS0xLjQxTDEuODMgMTIgLjQxIDEzLjQxeiIvPjwvc3ZnPg==');
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
}

/* Visually hide the browser input to ensure it is still focusable via keyboards */
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```

[Here's a demo on CodePen](https://codepen.io/alexcarpenter/pen/rNNbwqB) that you can play with.
