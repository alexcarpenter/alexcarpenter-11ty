---
title: Managing Flow and Rhythm with CSS Custom Properties
author: Andy Bell
link: https://24ways.org/2018/managing-flow-and-rhythm-with-css-custom-properties/
---
I've converted mostly to only using top margin when spacing elements on a page. This article by Andy Bell showcase how you can make use of the [lobotomized owl](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) and custom properties to create flow and rythmn within your sites.

```css
.flow {
  --flow-space: 1em;
}

.flow > * + * {
  margin-top: var(--flow-space);
}
```
