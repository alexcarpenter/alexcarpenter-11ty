module.exports = ({
  image = '',
  heading = '',
  link = '',
  text = ''
}) => {
  return `
  <div class="c-card">
    ${image ?
      `
        <div style="--aspect-ratio: 3/2;">
          <img src="${image}" alt="" />
        </div>
      ` : ''
    }
    <div class="c-card__inner">
      ${heading ?
        `<h3 class="c-card__heading">
          ${link ?
            `<a href="${link}">${heading}</a>` :
            `${heading}`
          }
        </h3>` : ''
      }
      ${text ? `<p class="c-card__text">${text}</p>` : ''}
    </div>
  </div>
  `
}
