---
layout: layouts/index
title: Posts
excerpt: Sharing what I have learned. Subscribe via [RSS](/feed.xml).
pagination:
  data: collections.posts
  size: 10
permalink: posts/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
