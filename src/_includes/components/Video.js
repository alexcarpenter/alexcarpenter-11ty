module.exports = ({
  url = '',
  ratio = '16/9',
  controls = true,
  autoPlay = false,
  loop = false,
  caption = ''
}) => `
  <figure class="c-video">
    <div style="--aspect-ratio: ${ratio};">
      <video${controls ? ' controls' : ''}${autoPlay ? ' autoPlay' : ''}${loop ? ' loop' : ''}>
        <source src="${url}" type="video/mp4">
        <p>Your browser doesn't support HTML5 video. Here is a <a href="${url}">link to the video</a> instead.</p>
      </video>
    </div>
    ${controls ? '' : `<button class="c-video__pause js-pause-video"><span class="u-hidden-visually">Pause video</span></button>`}
    ${caption ? `<figcaption class="c-video__caption">${caption}</figcaption>` : ''}
  </figure>
`
