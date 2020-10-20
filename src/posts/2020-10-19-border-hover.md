---
title: How to change border width on hover without affecting layout
description: I recently came across a situation where I needed to modify the border width of an element when hovering or focusing the element.
tags:
  - CSS
---
{% import "components/macros.njk" as components %}
I recently came across a situation where I needed to modify the border width of an element when hovering or focusing the element.

Immediately without much thought, I just adjusted the `border-width` on hover and focus.

```scss/4
.card {
  border: 1px solid #eee;
  &:hover,
  &:focus {
    border-width: 2px;
  }
}
```

The issue here is that the `border-width` increase causes a layout shift within the element and surrounding elements.

{{ components.video({
  url: '/assets/videos/button-border-hover.mp4',
  ratio: '6/3',
  backdrop: 'var(--theme-color-gray)'
}) }}

To get around the layout issues of modifying `border-width`, instead we can make use of a inset box-shadow to create a faux border that we show on hover.

```scss/5/4
.card {
  border: 1px solid #eee;
  &:hover,
  &:focus {
    border-width: 2px;
    box-shadow: inset 0px 0px 0px 2px #eee;
  }
}
```

Now it's as if the border is growing from `1px` to `2px` without affecting any layout. View the [demo on CodePen](https://codepen.io/alexcarpenter/pen/XWKKONX).
