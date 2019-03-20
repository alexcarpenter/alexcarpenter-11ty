module.exports = ({ url = '', text = '', type = 'default', external = false, size = '' }) => `
  <a href="${url}" ${external ? `rel="external"` : ''} class="c-link c-link--${type} ${size ? `c-link--${size}` : ''}"><span>${text}${external ? '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path fill="var(--color-gray)" d="M66 8H48V0h32v32h-8V14L38 48l-6-6L66 8zm6 40h8v32H0V0h32v8H8v64h64V48z"/></svg>' : ''}</span></a>
`
