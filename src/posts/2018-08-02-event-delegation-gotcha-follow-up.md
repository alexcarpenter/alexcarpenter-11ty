---
title: Event delegation gotcha follow-up
summary: Yesterday I wrote about an event delegation gotcha that I ran into while building a few small JS libraries. Since posting, Chris Ferdinandi shared with me another alternative solution.
tags:
  - javascript
---
Yesterday I wrote about an [event delegation gotcha](/posts/2018/08/event-delegation-gotcha/) that I ran into while building a few small JS libraries. I ran the post by [Chris Ferdinandi](https://gomakethings.com/) and he pointed out I could make use of a different method called `closest()` instead of `matches()` as seen below.

```js/2/3
document.addEventListener('click',  event => {
  // If event doesn't match our toggle selector return
  if (!event.target.closest('.accordion-toggle')) return
  if (!event.target.matches('.accordion-toggle')) return
  // Run toggle code
  togglePanel()
}, false)
```

Depending on the browsers you are looking to support, `matches()` offers a little better support than `closest()`. So using the one line css trick might be an option for you if you are counting bytes.
