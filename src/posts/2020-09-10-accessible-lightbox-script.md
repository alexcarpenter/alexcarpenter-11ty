---
draft: true
title: Building a lightweight and accessible lightbox script
description:
tags:
  - Accessibility
  - JavaScript
  - Performance
primaryColor: "#276749"
---
{% import "components/macros.njk" as components %}
{{ components.video({
  url: '/assets/videos/lightbox-keyboard-events.mp4',
  ratio: '708/688 ',
  backdrop: '#276749'
}) }}

## Markup
To keep the script as lightweight and performant as possible, I let the HTML do the heavy lifting of outputing the lightbox markup on the page if there is gallery images instead of using JS to construct the markup.

Here is what the page container and lightbox markup looks like within the `body` element.

```html
<body>
  <div>
    <!-- Page markup -->
  </div>
  <div inert="true">
    <!-- Lightbox markup -->
  </div>
</body>
```

This allows me to trap the keyboard focus within the lightbox when it is visible using the [inert](https://html.spec.whatwg.org/multipage/interaction.html#inert) attribute. By default the lightbox gets initialized with inert, to prevent the user from interacting the the lightbox content while it is not visible.

To keep things peformant for the user, I make use of the `loading="lazy"` attribute on the lightbox images to only download the resource when it is visible. This keeps the initial page loads small, while still offering the images for the user to consume.

## Script
The script follows the revealing module pattern, and has a few methods `show`, `hide`, `next`, and `previous`. There is also a getter function, that returns whether the lightbox is hidden or visible.

With the basic structure of the script in place, I make use of event delegation to watch for click and keydown events on the document.

### Click events
The click event listener uses a if conditional that looks for the event target to match a data attribute via the `closest` method. There are four data attributes that I watch for. One to show the lightbox, one to hide the lightbox, and two that watch for next and previous functionality.

This setup allows me to add the `data-lightbox-hide` attribute to the lightbox backdrop and lightbox close button without having to have multiple event listeners.

### Keyboard events
Similarly to the click events, we have an event listener watching for keydown events to ensure the lightbox is accessible for keyboard users. This simply matches event keycodes to next, previous, and hide functionality.

---

View the site to experience it yourself at [hobbies.alexcarpenter.me](https://alexcarpenter.me). You also take a peak at the source code on [Github](https://github.com/alexcarpenter/hobbies).