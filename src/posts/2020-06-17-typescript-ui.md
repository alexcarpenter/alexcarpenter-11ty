---
draft: true
title: What I like about TypeScript as a UI engineer
tags:
  - TypeScript
---
{% import "components/macros.njk" as components %}
I've been learning TypeScript and TailwindCSS on a personal project for the past couple of weeks. Once I grasped the basic knowledge of writing TypeScript within React components, I've come to really enjoy the benefits it offers as a UI engineer.

My work as a UI engineer means, building out components for the team to use. My goal is to make it easy to understand and use. If component apis are confusing, I have not been doing my job right.

## Intellisense

I would be happy with just this feature. Intellisense provides autocomplete functionality within your IDE. No more having to jump into the component file and have to find what props are available and what format they expect.

In the video below, you can see the available props for my `<Button />` component. I also get a list of the available values each prop. If I provide a value not supported, I get inline validation that can be corrected before rebundling.

{{ components.video({
  url: '/assets/videos/ts-autocomplete.mp4',
  ratio: '1/1',
  caption: '',
  backdrop: '#ddd'
}) }}

## Saving time

Imagine a slow build process and misspelling a value within a prop. Wait for the build process to finish, reload the browser only to see a failed prop type. This has happened to many times to myself and others I've worked with. Now imagine TypeScript being able to help you spot that error before you save the file.

These are just two of the benefits I have come across so far. I am excited to keep exploring and understanding a bit more about what other features I might come across that will help make me a better UI engineer.