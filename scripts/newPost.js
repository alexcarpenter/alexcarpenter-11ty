const fs = require('fs')
const slugify = require('@sindresorhus/slugify')
const dateFns = require('date-fns')

const title = process.argv[2]

if (!title) {
  throw 'a title is required'
}

const slug = slugify(title)
const date = dateFns.format(new Date(), 'YYYY-MM-DD')

fs.writeFileSync(
  `./src/posts/${date}-${slug}.md`,
  `---
title: "${title}"
date: ${date}
---`,
  function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(`${title} was created!`)
  },
)