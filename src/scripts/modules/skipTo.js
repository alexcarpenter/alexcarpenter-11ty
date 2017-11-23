export default function () {
  const skipTo = document.querySelector('[data-skip-to]')

  if (!skipTo) {
    return
  }

  const skipToLinks = skipTo.children
  const skipToFirst = skipToLinks[0]
  const skipToLast = skipToLinks[skipToLinks.length - 1]
  const keyCodes = {
    upArrow: 40,
    downArrow: 38
  }

  skipTo.addEventListener('click', focusElement)
  skipTo.addEventListener('keydown', bindKeyPress)

  function focusElement (event) {
    const target = event.target
    const id = target.getAttribute('href').slice(1)
    const targetElement = document.getElementById(id)

    if (targetElement) {
      targetElement.focus()
    }
  }

  function bindKeyPress (event) {
    const eventWhich = event.which
    const eventTarget = event.target

    if (eventWhich === keyCodes.upArrow || eventWhich === keyCodes.downArrow) {
      event.preventDefault()

      switch (eventWhich) {
        case keyCodes.upArrow:
          const skipToLastActive = eventTarget === skipToLast
          skipToLastActive ? skipToFirst.focus() : eventTarget.nextElementSibling.focus()
          break
        case keyCodes.downArrow:
          const skipToFirstActive = eventTarget === skipToFirst
          skipToFirstActive ? skipToLast.focus() : eventTarget.previousElementSibling.focus()
          break
      }
    }
  }
}
