---
title: 11ty has tag filter
---
I've been using my blog as a notebook lately. Collecting small notes and links to resources about things I am learning and courses I am taking.

I have a few posts started that are living documents on topics I am learning so I wanted to add a note at the top of the post that made it clear that this is and will always be a work in progress post.

11ty has this awesome concept of [filters](https://www.11ty.io/docs/filters/) which I use to format dates, process CSS and JS, etc., so I created a new filter to check if an array contains a string.

It looks like:

```js
eleventyConfig.addFilter('hasTag', function(arr, str) {
  return arr.includes(str);
});
```

and then in my post layout template, I can use it like:

{% verbatim %}
```twig
{% if tags and tags | hasTag('learning') %}
  ...
{% endif %}

<!-- or output boolean value -->

{{ tags | hasTag('learning') }}
```
{% endverbatim %}

This could also be done by looping over the tags array and making the comparison:

{% verbatim %}
```twig
{% for tag in tags %}
  {% if tag === 'learning' %}
    ...
  {% endif %}
{% endfor %}
```
{% endverbatim %}
