---
title: Unsetting buttons
summary: One line of CSS to get you to a sane starting point when making button and link elements look visually similar.
tags:
  - css
---
It's not uncommon to style the `button` and `a[href]` elements to look the same throughout your website or application. This often means resetting the default button styling and dealing with browser inconsistencies to make them visually similar.

One method to get you to a sane starting point, is to unset all of the default styling for both elements as shown below.

```css
button, .button {
  all: unset;
}
```

Check out the [CodePen](https://codepen.io/alexcarpenter/pen/yxaQYr) to see it in action.

Browser support is limited, so be sure to check your requirements before using this method.
