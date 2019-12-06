---
order: 1
title: "NationBuilder homepage"
team: "NationBuilder"
summary: "Developed a new homepage to showcase the leaders who are using NationBuilder and highlight features from the new control&nbsp;panel."
year: "2019"
roles:
  - "Front-end development"
  - "SVG animations"
tech:
  - "NationBuilder"
  - "Liquid"
  - "anime.js"
link: "https://nationbuilder.com"
banner: "nationbuilder.png"
primaryColor: "#D0021B"
---
With the recent launch of the [new control panel](https://nationbuilder.com/new_control_panel), I worked closely with the design team to help reimagine the homepage. With a few small design sprints, we had an idea about the design direction we wanted to go and I started digging into how I could breathe some life into the design with the use of animations.

After the final designs were approved, I met with the designer to go over the ideas they had for the animated scenes positioned throughtout the homepage. From that meeting, I knew I wanted to make use of SVGs to be able to preserve the sizing and positioning of elements across different devices with no need for media-query CSS conditions. I also discovered I would need to trigger the animations based on a few different conditions – scroll position and when made visible within a tabbed interface.

{% Video {
  url: '/assets/videos/segmentation.mp4',
  ratio: '1620/1220',
  caption: 'Segmentation SVG animation',
  controls: false,
  autoPlay: true,
  loop: true,
  backdrop: '#1498BE'
} %}

To do this, I reached for [anime.js](https://animejs.com/) to help with choreographing the animations.

> Anime.js (/ˈæn.ə.meɪ/) is a lightweight JavaScript animation library with a simple, yet powerful API. It works with CSS properties, SVG, DOM attributes and JavaScript Objects.

Using anime to manage the animations allowed me to build out the animation logic with JavaScript and trigger animations based on certain conditions.

```js
// Create our anime timeline and default autoplay to false
var scene1 = new anime.timeline({
  autoplay: false
});

// Trigger animation when scene enters the viewport
inView('#scene1')
  .once(function() {
    scene1.play();
  });

// Trigger animation when tab panel container is active
document.addEventListener('tabbed', function() {
  var panelId = event.detail.content.getAttribute('id');
  switch(panelId) {
    case 'panel-scene-1':
      scene1.play();
      break;
    default:
      console.log(panelId + ' does not exist.');
  }
}, false);
```

An extra benefit of using this setup, is that if JavaScript is disabled or fails to load, the SVGs display in their final state, so nothing looks broken. Progressive enhancement for the win!

{% Video {
  url: '/assets/videos/permission-sets.mp4',
  ratio: '1620/1220',
  caption: 'Permission sets SVG animation',
  controls: false,
  autoPlay: true,
  loop: true,
  backdrop: '#1498BE'
} %}

After the launch, I created a handful of high quality GIFs and MP4s of the homepage animations for the marketing team to use within their marketing materials.
