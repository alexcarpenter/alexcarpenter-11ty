const markdown = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
})

module.exports = ({ text, cite }) => `
<figure class="c-quote">
<blockquote class="c-quote__text">
<p>${markdown.renderInline(text)}</p>
</blockquote>
${cite ? `<figcaption class="c-quote__cite">${markdown.renderInline(cite)}</figcaption>` : ''}
</figure>
`;
