---
title: "59% of form inputs unlabeled"
tags:
  - accessibility
---
WebAIM recently released a large volume of [accessibility data](https://webaim.org/projects/million/) they collected from the "top" 1 million web sites. Here are some of the data points they collected 😔.

* Home pages averaged 59.6 detectable errors each
* 1 in 13 page elements has an error
* WCAG failure rate at least 97.8%
* 36 low contrast texts on the average home page
* 1/3 of images lack alt text
* 59% of form inputs unlabeled

What stood out to me was <mark>59% of form inputs unlabeled</mark>.

To combat this issue, let's take a look at how we can take advantage of the system we are using (in our case [Nunjucks](https://mozilla.github.io/nunjucks/)) to bake accessibility into our workflow.

{% Note {
  text: 'This example is built using Nunjuck macros, but can also be translated to other templating languages or JavaScript frameworks.',
  link: {
    external: true,
    url: "https://mozilla.github.io/nunjucks/templating.html#macro",
    text: "Nunjuck macros documentation"
  }
} %}

## 1. Create text input macro

{% raw %}
```html
<!-- components/text-input.njk -->
{% macro textInput() %}
{% endmacro %}
```
{% endraw %}

## 2. Create HTML markup

{% raw %}
```html
{% macro textInput() %}
  <label for="" class="form-label"/></label>
  <input id="" class="form-control form-control--text" type="text">
{% endmacro %}
```
{% endraw %}

## 3. Pass in props

{% raw %}
```html
{% macro textInput(props) %}
  <label for="{{ props.id }}" class="form-label{% if props.label.hidden %} form-label--hidden{% endif %}"/>{{ props.label.text }}</label>
  <input id="{{ props.id }}" class="form-control form-control--text" type="text" {% if props.required %}required{% endif %}>
{% endmacro %}
```
{% endraw %}

## 4. Usage

{% raw %}
```html
{% from "components/text-input.njk" import textInput %}

{{ textInput({
  id: "firstName",
  required: true,
  label: {
    text: "First name",
    hidden: true
  }
}) }}
```
{% endraw %}

## 5. Output

```html
<label for="firstName" class="form-label form-label--hidden">First name</label>
<input id="firstName" class="form-control form-control--text" type="text" required="">
```

Now we don't have to question whether or not there is a label associated with an input because it is baked into our workflow.
