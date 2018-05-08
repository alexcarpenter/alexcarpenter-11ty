---
layout: layouts/index
title: Notes
excerpt:
type: note
pagination:
  data: collections.notes
  size: 12
permalink: notes/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}{% else %}index{% endif %}.html
---
