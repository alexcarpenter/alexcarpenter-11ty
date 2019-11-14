---
title: Better CSS outlines with box-shadows
summary: I think we can all agree that the default browser outline styling isn't the most beautiful design implementation.
tags:
  - css
  - accessibility
---
I think we can all agree that the default browser outline styling isn't the most beautiful design implementation. I also think we can agree that it may not be pretty but it does *function well*.

> Not replace it with any other visual indication. This is bad practice and can hurt the user experience for keyboard users.

It can be common to see folks remove the outline completely and not replace it with any other visual indication. This is bad practice and can hurt the user experience for keyboard users.

To appease our designers while keeping our site accessible, lets replace the default outline style and replace it with a box-shadow implemenatation shown below.

```css
input:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, .5);
}
```

So we can see we set the outline to 0 when the input is focused and added a box-shadow declaration to replace its functionality. As an added bonus, using a box-shadow also follows border-radius declarations. So if our input has a 4px border radius, our faux outline will not have a gap in the corners.

Check out the [CodePen](https://codepen.io/alexcarpenter/pen/vaPwaa) example to see it in action.
