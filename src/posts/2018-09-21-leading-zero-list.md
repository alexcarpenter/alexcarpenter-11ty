---
title: How to make an ordered list with leading zero's using CSS
summary: How to create an ordered list with leading zero's.
tags:
  - css
---
Adam Duncan posted a [question on Twitter](https://twitter.com/duncanadam/status/1043104880049774593) this morning, asking for tweet-sized solutions to achieve an ordered list with leading zero's using CSS.

His solution:

```css
ol { counter-reset: z; }
ol li { counter-increment: z; }
ol li::before { content: counter(z)'. '; }
ol li:nth-child(-n+9)::before { content: '0' counter(z)'. '; }
```

Another alternative solution:

```css
ol {
  list-style-type: none;
  counter-reset: li;
}

li:before {
  counter-increment: li;
  content: counter(li, decimal-leading-zero)'. ';
}
```

Checkout the [CodePen](https://codepen.io/alexcarpenter/pen/XPGZxx) to see it in action.
