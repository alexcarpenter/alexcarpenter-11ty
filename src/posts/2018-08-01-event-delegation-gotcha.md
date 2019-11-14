---
title: Event delegation gotcha
summary: While making a few small Javascript libraries, I discovered this one small event delegation gotcha and found a one line CSS fix to solve the problem.
tags:
  - javascript
---
{% Note {
  text: "Since posting this, Chris shared with me the `closest()` method which works without having to remove pointer events from nested elements. Read about the difference [here](/posts/2018/08/event-delegation-gotcha-follow-up/)."
} %}

---

While making an effort to learn Javascript over the past year I made a couple of small JS libraries. When possible I have always resorted to using event delegation to keep things performant.

While making a small accordion library, I found it common to include an svg icon within the accordion toggle to designate its open and closed state. As an example, you can see I marked up the accordion toggle using a `button` element and inside of the button I included an plus icon svg as well.

```html
<button class="accordion-toggle">
  Toggle
  <svg viewBox="0 0 10 10">
    <rect height="8" width="2" y="1" x="4"/>
    <rect height="2" width="8" y="4" x="1"/>
  </svg>
</button>
```

Next, I setup my event listener on the document, and watched for events. If the `event.target` doesn't match the CSS selector on my button I would return, otherwise I would run the `togglePanel()` function.

```js
document.addEventListener('click',  event => {
  // If event doesn't match our toggle selector return
  if (!event.target.matches('.accordion-toggle')) return
  // Run toggle code
  togglePanel()
}, false)
```

This works great, except when a users clicks on the svg inside the button. Since we are checking for a CSS selector match using the `matches` method, the `event.target` would be the svg and not our button. To fix this we need to make sure when the svg is clicked, that it does not register an event. To do that we can add `pointer-events: none;` to the svg within the button as shown below.

```css
button svg {
  pointer-events: none;
}
```

Now our event delegation code will work as expected. Check out this [CodePen](https://codepen.io/alexcarpenter/pen/mjxXwj) to see it in action. Comment out the CSS to see how the code fails when clicking the svg.
