module.exports = ({
  images = [],
  caption = '',
  ratio = '3/2',
  columns = null
}) => {
  const templateColumns = columns ? columns : images.length;
  return `
  <figure>
    <div class="o-abreast" style="grid-template-columns: repeat(${templateColumns}, 1fr)">
    ${images
      .map((image, index) => {
        return `<div style="--aspect-ratio: ${ratio};"><img src="${image}" alt="Picture ${index++}" ></div>`;
      })
      .join('')}
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
  `;
};
