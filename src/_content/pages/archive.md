---
layout: layouts/index
title: Archives
excerpt:
pagination:
  data: collections.all
  size: 12
permalink: archives/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
