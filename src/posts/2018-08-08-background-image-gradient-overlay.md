---
title: Background image gradient overlay
summary: Five years ago I made a CodePen to demonstrate how to apply a gradient overlay over a background image. Since then, that pen has been viewed over 294,804 times and hearted 705 times.
tags:
  - css
---
Five years ago I made a [CodePen](https://codepen.io/alexcarpenter/pen/LveDx/) to demonstrate how to apply a gradient overlay over a background image. Since then that pen has been viewed over 294,804 times and hearted 705 times.

Since it still gets referenced daily, I thought I would give it a proper write up.

First lets create our banner element which we will apply our background image and gradient overlay to. We will also add an additional content wrapper for elements that live within our banner, which will reference later.

```html
<div class="banner">
  <div class="banner__content">
    <h1>Banner Heading</h1>
    <p>Banner description</p>
  </div>
</div>
```

Next lets apply our background image to our banner element and set a min-height of 400px.

```css
.banner {
  position: relative;
  width: 100%;
  min-height: 400px;
  background: url('http://unsplash.it/1200x800');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

To apply our gradient overlay, will make use of a [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). We absolutely position the overlay to cover 100% width and height of our banner.

```css
.banner:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, red, blue);
  opacity: 0.6;
}
```

Lastly, lets revisit the banner content wrapper. Since we are applying the gradient overlay with a pseudo-element, you will sometimes run into issues with content inside of the banner displaying underneath the gradient overlay. To fix this we wrap all of our content inside of our banner with a wrapper and set that to recieve a `z-index` higher than the overlay as seen below.

```css
.banner__content {
  position: relative;
  z-index: 10;
}
```

As noted in the first comment, you could omit the pseudo-element and make use of multiple backgrounds. This works great as well, but removes the ability to animate the gradient on hover which can be a common use case.

View the original [CodePen](https://codepen.io/alexcarpenter/pen/LveDx/).
