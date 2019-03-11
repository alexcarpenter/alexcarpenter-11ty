module.exports = ({ label = 'Note', text = '', type = 'default', labelHidden = false, link }) => `
  <div class="c-note c-note--${type}">
    <p><span class="c-note__label${labelHidden ? ' u-hidden-visually' : ''}">${label}: </span>${text}${link ? `<br><a href="${link.url}">${link.text}</a>${link.external ? ' <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="var(--color-gray)" d="M66 8H48V0h32v32h-8V14L38 48l-6-6L66 8zm6 40h8v32H0V0h32v8H8v64h64V48z"/></svg>' : ''}` : ''}</p>
  </div>
`
