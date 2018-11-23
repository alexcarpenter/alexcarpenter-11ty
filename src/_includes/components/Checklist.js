module.exports = ({ items = [] }) => {
  return `
  <ul class="c-checklist">
    ${items
      .map(item => {
        return `<li class="c-checklist__item ${item.checked ? 'c-checklist__item--checked' : ''}">${item.text}</li>`;
      })
      .join('')}
  </ul>
  `;
};
