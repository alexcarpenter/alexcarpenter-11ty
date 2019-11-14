---
title: Sticky footer with flexbox auto margins
summary: How to create a sticky footer with flexbox auto margins.
tags:
  - css
---
There have been a multitude of different methods to create a sticky footer with CSS. Most have used a mix of absolutely positioned elements and some type of viewport math to achieve this seemingly simple pattern.

Recently I have started to make use of one of my favorite features of flexbox, auto margins. Lets take a look at what is needed to make this work.

First, we make sure our `body` element will take up *at least* 100% of the viewport height. Then will set the `display` value to `flex` and have a `flex-direction` of `column`.

Lastly we set our footer element to have a `margin-top` of `auto`.

```css
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto;
}
```

Now, our footer will always be stuck at the bottom of the page until there is enough content to push it outside of the viewport.

Check out the [CodePen](https://codepen.io/alexcarpenter/pen/rZGwNM) to see it in action. Uncomment the `main` element to see it extend when the content is available.
