const {html} = require('common-tags');
const {hostname} = require('./filters');
const markdown = require('./utils');

module.exports = {
  Figure: function ({
    src,
    alt = '',
    caption = '',
    ratio = '16/9',
    breakout = false,
    lazyload = false,
  }) {
    const img = html`
      <figure>
        <div style="--aspect-ratio: ${ratio};">
          <img src="${src}" alt="${alt}" ${lazyload ? ` loading="lazy"` : ''} />
        </div>
        ${caption
          ? `<figcaption class="u-text-center u-margin-top-05 u-color-gray">${markdown.renderInline(
              caption,
            )}</figcaption>`
          : ''}
      </figure>
    `;
    return html`
      ${breakout
        ? `<div class="u-breakout">
          <div class="o-container o-container--lg">
            ${img}
          </div>
        </div>`
        : img}
    `;
  },

  Note: function ({
    label = 'Note',
    text = '',
    type = 'default',
    labelHidden = false,
    link,
  }) {
    return html`
      <div class="c-note c-note--${type}">
        <p>
          <span class="c-note__label${labelHidden ? ' u-hidden-visually' : ''}"
            >${label}:</span
          >
          ${markdown.renderInline(text)}${link
            ? `<br><a class="u-link" href="${link.url}">${link.text} <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg></a>`
            : ''}
        </p>
      </div>
    `;
  },

  Stats: function ({items = []}) {
    return html`
      <dl class="c-stats">
        ${items
          .map(
            (item) => `
          <dt class="c-stats__title">${item.title}</dt>
          <dd class="c-stats__description">${item.description}</dd>
        `,
          )
          .join('')}
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
    backdrop = '',
  }) {
    return html`
      <figure class="c-video">
        <div class="c-video__backdrop"${
          backdrop ? ` style="--backdrop: ${backdrop};"` : ''
        }>
          <div style="--aspect-ratio: ${ratio};">
            <video${controls ? ` controls` : ''}${autoPlay ? ` autoPlay` : ''}${
      loop ? ` loop` : ''
    }${mute ? ` muted` : ''}>
              <source src="${url}" type="video/mp4">
              <p>Your browser doesn't support HTML5 video. Here is a <a href="${url}">link to the video</a> instead.</p>
            </video>
          </div>
        </div>
        ${
          caption
            ? `<figcaption class="u-text-center c-video__caption">${markdown.renderInline(
                caption,
              )}</figcaption>`
            : ''
        }
      </figure>
    `;
  },

  Youtube: function (id, lazyload = false, fullWidth = false, title = '') {
    return html`<figure style="--aspect-ratio: 16/9;">
      <iframe title="${title}" width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </figure>`;
  },

  Quote: function ({text, cite, size}) {
    return html`
      <figure class="c-quote">
        <blockquote
          class="c-quote__text${size ? ` c-quote__text--${size}` : ''}"
        >
          <p>${markdown.renderInline(text)}</p>
        </blockquote>
        ${cite
          ? `<figcaption class="c-quote__cite${
              size ? ` u-text-align-right` : ''
            }">${markdown.renderInline(cite)}</figcaption>`
          : ''}
      </figure>
    `;
  },

  Link: function (url, text, external = false, download = false) {
    return html`
      <a href="${url}" class="c-link" ${external ? 'rel="external"' : ''} ${download ? 'download' : ''}>
        ${text ? text : hostname(url)}
        ${download ?
          `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" focusable="false" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
        : external
          ? `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>`}
      </a>
    `;
  },

  Heading: function ({
    as = 'h2',
    text = '',
    size = 'md',
    link = null,
    prepend = null,
    append = null,
  }) {
    return html`
      <${as} class="u-font-size-${size}">
        ${prepend ? prepend : ''}
        ${
          link
            ? `<a href="${link}">${markdown.renderInline(text)}</a>`
            : `${markdown.renderInline(text)}`
        }
        ${append ? append : ''}
      </${as}>
    `;
  },

  Pill: function (str, url) {
    if (url) {
      return html` <a class="c-pill" href="${url}">${str}</a> `;
    }
    return html` <span class="c-pill">${str}</span> `;
  },
};
