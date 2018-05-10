---
layout: layouts/index
title: Bookmarks
excerpt: Collecting useful web development links and resources for my future self.
type: bookmark
pagination:
  data: collections.bookmarks
  size: 12
permalink: bookmarks/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
