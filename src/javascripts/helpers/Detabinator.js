class Detabinator {
  constructor (element) {
    if (!element) {
      throw new Error('Missing required argument. new Detabinator needs an element reference')
    }
    this._inert = false
    this._focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
    this._focusableElements = Array.from(
      element.querySelectorAll(this._focusableElementsString)
    )
  }

  get inert () {
    return this._inert
  }

  set inert (isInert) {
    if (this._inert === isInert) {
      return
    }

    this._inert = isInert

    this._focusableElements.forEach((child) => {
      if (isInert) {
        // If the child has an explict tabindex save it
        if (child.hasAttribute('tabindex')) {
          child.__savedTabindex = child.tabIndex
        }
        // Set ALL focusable children to tabindex -1
        child.setAttribute('tabindex', -1)
      } else {
        // If the child has a saved tabindex, restore it
        // Because the value could be 0, explicitly check that it's not false
        if (child.__savedTabindex === 0 || child.__savedTabindex) {
          return child.setAttribute('tabindex', child.__savedTabindex)
        } else {
          // Remove tabindex from ANY REMAINING children
          child.removeAttribute('tabindex')
        }
      }
    })
  }
}

export default Detabinator
