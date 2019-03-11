const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false,
})

module.exports = ({ text, cite }) => `
<figure class="c-quote">
<blockquote class="c-quote__text">
<p>${markdown.renderInline(text)}<p>
</blockquote>
${cite ? `<figcaption class="c-quote__cite">${markdown.renderInline(cite)}</figcaption>` : ''}
</figure>
`;