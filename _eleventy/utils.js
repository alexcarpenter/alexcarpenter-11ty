const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(require('markdown-it-anchor'), {
    level: [2, 3],
  })
  .use(require('markdown-it-kbd'))
  .use(require('markdown-it-mark'));

module.exports = markdown;
