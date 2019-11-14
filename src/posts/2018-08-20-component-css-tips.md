---
title: 5 tips for styling the component layer
summary: Here are 5 tips to consider next time you begin styling components for a project.
tags:
  - css
---
When working within the component layer of your project here are five tips that I have found to be helpful–independent of what methodology or tooling you may be using.

## 1. Build components in isolation

Setup a test page that only includes the component that you are building. This helps remove any ideas of styling your component based on its location.

## 2. Components should fill the available space they live within

By default components should fill the available space it lives within. Use `max-width` delarations where applicable. Refrain from using percentage `max-width` declarations and stick to px dimensions if necessary.

For example, if you declare your component to have a max-width of 25%, it makes it quite difficult to use that component within a smaller sidebar area.

## 3. Remove spatial styling from components

As hinted above, make use of the [object layer](https://smoothie-css.com/#2-global) to help control spacing, width, and height styling.

## 4. Contain component styles to a single file

Refrain from adding modifier classes to components outside of *its* CSS file. This will help when debugging component specific issues. Make use of [parent selectors](http://thesassway.com/intermediate/referencing-parent-selectors-using-ampersand) to add modifiers when needed.

## 5. Prefix component classes

Lastly, prefix components with `.c-[component-name]` for extra clarity.
