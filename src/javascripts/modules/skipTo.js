export default function () {
  const skipTo = document.querySelector('[data-skip-to]')

  if (skipTo) {
    const skipToLinks = skipTo.children

    skipTo.addEventListener('click', (event) => {
      const target = event.target
      const id = target.getAttribute('href').slice(1)
      const section = document.getElementById(id)

      if (section) {
        section.focus()
      }
    })
  }
}
