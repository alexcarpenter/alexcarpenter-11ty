const embeds = document.querySelectorAll('[data-embed-src]');

for (let i = 0; i < embeds.length; i += 1) {
  const embed = embeds[i];
  const embedTitle = embed.innerText;
  const embedRatio = embed.dataset.embedRatio;
  const embedSrc = embed.dataset.embedSrc;

  // Setup container
  const container = document.createElement('div');
  container.style.setProperty('--aspect-ratio', embedRatio);
  container.innerHTML = `<iframe src="${embedSrc}" width="640" height="360" frameborder="0" title="${embedTitle}" allowfullscreen></iframe>`;

  // Insert container after embed link
  embed.parentNode.insertBefore(container, embed.nextSibling);

  // Remove embed link
  embed.remove();
}
