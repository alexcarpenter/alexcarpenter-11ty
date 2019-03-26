module.exports = ({ items = [] }) => {
  return `<dl class="c-stats">
${items.map((item) => `
<dt class="c-stats__title">${item.title}</dt>
<dd class="c-stats__description">${item.description}</dd>
`).join('')}
</dl>`;
}
