const {
  html
} = require('common-tags')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2, 3],
  permalink: false,
})
const slugify = require('@sindresorhus/slugify');

module.exports = {
  Figure: function ({
    src,
    alt = '',
    caption = '',
    ratio = '16/9',
    fullWidth = false,
    border = false,
    lazyload = false
  }) {
    return html`
      <figure${fullWidth ? ` class="o-content__fullWidth"` : ''}>
        <div${border ? ` class="u-bordered"` : ''} style="--aspect-ratio: ${ratio};">
          <img src="${src}" alt="${alt}"${lazyload ? ` loading="lazy"` : ''} />
        </div>
        ${caption ? `<figcaption>${markdown.renderInline(caption)}</figcaption>` : ''}
      </figure>
    `;
  },

  Note: function ({
    label = 'Note',
    text = '',
    type = 'default',
    labelHidden = false,
    link
  }) {
    return html`
      <div class="c-note c-note--${type}">
        <p><span class="c-note__label${labelHidden ? ' u-hidden-visually' : ''}">${label}: </span>${markdown.renderInline(text)}${link ? `<br><a class="u-link" href="${link.url}">${link.text} <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true"viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>` : ''}</p>
      </div>
    `;
  },

  Gear: function ({
    favorite = false,
    archived = false,
    name = '',
    desc = '',
    img = 'http://placehold.it/200x200',
    link = {
      url: '',
      label: ''
    }
  }) {
    return html`
      <div class="c-gear${favorite ? ' c-gear--favorite' : '' }${archived ? ' c-gear--archived' : '' }">
        ${favorite ? `<span class="c-gear__label">Favorite</span>` : ''}
        ${archived ? `<span class="c-gear__label">Archived</span>` : ''}
        <div class="c-gear__media" style="--aspect-ratio: 1/1">
          <img src="${img}" alt="${name}"  loading="lazy" />
        </div>
        <div class="c-gear__content">
          <p class="c-gear__headline" id="${slugify(name)}">${name}</p>
          <p class="c-gear__description">${desc}</p>
          ${link.label && link.url ? `<a href="${link.url}" class="u-link">${link.label} <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true"viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>` : ''}
        </div>
      </div>
    `;
  },

  Stats: function ({
    items = []
  }) {
    return html`
      <dl class="c-stats">
        ${items.map((item) => `
          <dt class="c-stats__title">${item.title}</dt>
          <dd class="c-stats__description">${item.description}</dd>
        `).join('')}
      </dl>
    `;
  },

  Video: function ({
    url = '',
    ratio = '16/9',
    controls = true,
    autoPlay = false,
    loop = false,
    mute = true,
    caption = '',
    backdrop = ''
  }) {
    return html`
      <figure class="c-video">
        <div class="c-video__backdrop"${backdrop ? ` style="--backdrop: ${backdrop};"` : ''}>
          <div style="--aspect-ratio: ${ratio};">
            <video${controls ? ` controls` : ''}${autoPlay ? ` autoPlay` : ''}${loop ? ` loop` : ''}${mute ? ` muted` : ''}>
              <source src="${url}" type="video/mp4">
              <p>Your browser doesn't support HTML5 video. Here is a <a href="${url}">link to the video</a> instead.</p>
            </video>
          </div>
        </div>
        ${caption ? `<figcaption class="c-video__caption">${markdown.renderInline(caption)}</figcaption>` : ''}
      </figure>
    `;
  },

  Youtube: function (id, lazyload = false, fullWidth = false) {
    return html`
      <figure${fullWidth ? ` class="o-content__fullWidth"` : ''} style="--aspect-ratio: 16/9;">
        <iframe${lazyload ? ` loading="lazy"` : ''} width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </figure>
    `;
  },

  Quote: function ({
    text,
    cite,
    size
  }) {
    return html`
      <figure class="c-quote">
        <blockquote class="c-quote__text${size ? ` c-quote__text--${size}` : ''}">
          <p>${markdown.renderInline(text)}</p>
        </blockquote>
        ${cite ? `<figcaption class="c-quote__cite${size ? ` u-text-align-right` : ''}">${markdown.renderInline(cite)}</figcaption>` : ''}
      </figure>
    `;
  },

  Link: function (url, text) {
    return html`
      <a href="${url}" class="u-link">
        ${text ? text : url.slice(url.indexOf(':') + 3)}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true"viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
      </a>
    `
  },

  Heading: function ({
    as = 'h2',
    text = '',
    size = 'md',
    link = null,
    prepend = null,
    append = null
  }) {
    return html`
      <${as} class="u-font-size-${size}">
        ${prepend ? prepend : ''}
        ${link ? `<a href="${link}">${markdown.renderInline(text)}</a>` : `${markdown.renderInline(text)}`}
        ${append ? append : ''}
      </${as}>
    `
  }
}
