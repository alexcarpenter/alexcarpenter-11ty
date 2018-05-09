export default function embed() {
  const embeds = document.querySelectorAll('[data-embed-src]')

  if (embeds.length < 1) {
    return
  }

  embeds.forEach(embed => {
    const embedTitle = embed.innerText
    const embedRatio = embed.dataset.embedRatio
    const embedSrc = embed.dataset.embedSrc
    const container = document.createElement('div')
    container.style.setProperty('--aspect-ratio', embedRatio)
    container.innerHTML = `<iframe src="${embedSrc}" width="640" height="360" frameborder="0" title="${embedTitle}" allowfullscreen></iframe>`
    embed.parentNode.insertBefore(container, embed.nextSibling)
    embed.remove()
  })
}
