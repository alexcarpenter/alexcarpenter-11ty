module.exports = ({ src, alt = '', caption = '', ratio = '16/9', border = false }) => `
  <figure class="u-extend">
    <div${border ? ` class="u-bordered"` : ''} style="--aspect-ratio: ${ratio};">
      <img src="${src}" alt="${alt}" />
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`
