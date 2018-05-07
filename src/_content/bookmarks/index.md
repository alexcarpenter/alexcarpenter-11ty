---
layout: layouts/index
title: Bookmarks
excerpt:
type: bookmark
pagination:
  data: collections.bookmarks
  size: 12
permalink: bookmarks/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
