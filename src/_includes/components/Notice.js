const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false,
})

module.exports = ({ text, type = 'default' }) => `
  <div class="c-notice c-notice--${type}">
    ${markdown.render(text)}
  </div>
`
