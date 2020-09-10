---
title: Using object-fit to display the same images at different sizes across breakpoints
description: How to use object-fit and padding-bottom hack to adjust image sizing responsively.
tags:
  - CSS
  - TailwindCSS
---
{% import "components/macros.njk" as components %}
In my free time, I have been working on a small website where I can share a bit about my hobbies. At the moment, it's been outdoor cooking and RC Cars. The plan for the site is mostly media based, lots of images and videos.

The homepage is currated with a few featured posts followed by the main categories of posts. I wanted to have images displayed a little larger on desktop and adjust their size on mobile devices. At this point things are still really simple. I am using the same image across all sizes. Ideally i'd have multiple sizes to offer up but that is coming.

This site is using TailwindCSS for styling and images are using the `loading="lazy"` attribute to only download the images when needed. Keeping things as performant as possible for a media heavy site.

Since images are lazy loaded, I make use of the "padding-bottom hack" to ensure there isn't any layout shifts as the images are loaded in. Below is the code that displays images at a 16/9 ratio on desktop, and 1/1 aspect ratio below the medium breakpoint.

```html
<div class="relative pb-1/1 md:pb-16/9">
  <img
    class="absolute h-full w-full object-cover"
    src="..."
    alt="..."
  />
</div>
```

The last piece to making this work is using `object-cover` to ensure the images fill the available space. So even though the images are not a 1/1 aspect ratio, I can display them at that size responsively which is pretty cool.

{{ components.video({
  url: '/assets/videos/hobbies-image-sizes-50.mp4',
  ratio: '862/634',
  caption: 'Images displayed at 16/9 on desktop and 1/1 on smaller devices',
  backdrop: '#EEEEEE'
}) }}

You can see this working in the browser at [hobbies.alexcarpenter.me](https://hobbies.alexcarpenter.me).