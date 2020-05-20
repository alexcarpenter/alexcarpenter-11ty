---
title: Adding a callout component to your Eleventy powered website
tags:
  - 11ty
---
{% import "components/macros.njk" as components %}
Inspired by this [excellent blog post](https://prince.dev/blog/callout) by [Prince](https://twitter.com/maxcell) on how to add callouts to your MDX-powered Gatsby blog. I thought it would be fun to achieve this same type of functionality and API within Eleventy using [paired shortcodes](https://www.11ty.dev/docs/shortcodes/#paired-shortcodes) and [Nunjucks](https://mozilla.github.io/nunjucks/).

{% raw %}
```html
<!-- MDX example usage -->
<Callout>
  This is the base variant to callout something on my site
</Callout>

<!-- Eleventy paired shortcode equivalent -->
{% callout %}
  This is the base variant to callout something on my site
{% endcallout %}
```
{% endraw %}

Lets take a look at how we can implement this within our Eleventy configuration file.

```js/2-4
// .eleventy.js
module.exports = config => {
  config.addPairedShortcode('callout', (content, { variant = 'info' }) => {
    return `<aside class="callout callout--${variant}">${content}</aside>`;
  }
}
```

Here we are adding a new paired shortcode called `callout`. The first argument returned in a paired shortcode is the content, then we can define our own "props". In our case, we've defined a variant prop with a default value of `info`.

The main difference we can see between the two setups is we are not making use of any CSS-in-JS to manage styling for the component. You will need to bring your own styling layer, we are only returning the markup for the `callout`.

{% raw %}
```html
{% callout variant="danger" %}
DANGER! DANGER! Pay attention to this!
{% endcallout %}
```
{% endraw %}

## Add markdown support

To add markdown support we can pull in `markdown-it` and apply the `renderInline` method to our content.

```js/1,5
// .eleventy.js
const md = require('markdown-it')();

module.exports = config => {
  config.addPairedShortcode('callout', (content, variant = 'info') => {
    return `<aside class="callout callout--${variant}">${md.renderInline(content)}</aside>`;
  }
}
```

Now we can start using markdown within our callout component.

{% raw %}
```html
{% callout variant="danger" %}
*DANGER! DANGER!* Pay attention to this [link](https://alexcarpenter.me)!
{% endcallout %}
```
{% endraw %}

Lastly, for this to work within our markdown files, we need to define the `markdownTemplateEngine` in our config to use `njk`.

```js/8-10
// .eleventy.js
const md = require('markdown-it')();

module.exports = config => {
  config.addPairedShortcode('callout', (content, variant = 'info') => {
    return `<aside class="callout callout--${variant}">${md.renderInline(content)}</aside>`;
  }

  return {
    markdownTemplateEngine: 'njk',
  };
}
```

---

Feel free to check out my video tutorial on building a paired shortcode here.

{{ components.youtube({ id: 'nUlB8SR039w' }) }}