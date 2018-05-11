---
layout: layouts/index
title: Bookmarks
excerpt: Collecting useful links and resources for my future self.
type: bookmark
pagination:
  data: collections.bookmarks
  size: 10
permalink: bookmarks/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
