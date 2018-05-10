---
layout: layouts/index
title: Posts
excerpt: Articles, notes, and other short ramblings.
type: post
pagination:
  data: collections.posts
  size: 12
permalink: posts/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
