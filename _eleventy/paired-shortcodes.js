const {html} = require('common-tags');
const markdown = require('./utils');

module.exports = {
  Testimonial: function (content, options = {}) {
    const {name, occupation, twitter = '', thumbnail = ''} = options;
    return html`
      <figure class="c-testimonial">
        ${twitter &&
        thumbnail &&
        `
<a class="c-testimonial__media" href="https://twitter.com/${twitter}">
<img src="${thumbnail}" alt="" loading="lazy">
</a>
`}
        <blockquote class="c-testimonial__quote">
          <p>${markdown.renderInline(content)}</p>
        </blockquote>
        <figcaption class="c-testimonial__cite">
          ${name} (${occupation})
        </figcaption>
      </figure>
    `;
  },
};
