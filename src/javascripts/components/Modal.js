import Detabinator from '../helpers/Detabinator'

class Modal {
  constructor () {
    this.showModalButtonEl = document.querySelectorAll('.js-modal-show')
    this.hideModalButtonEl = document.querySelectorAll('.js-modal-hide')
    this.modalEl = document.querySelector('.js-modal')
    this.KEYCODE = {
      ESC: 27
    }
    // this.previousActiveElement
    // Set all modal focusable children to inert by default
    this.modalTabs = new Detabinator(this.modalEl)
    this.modalTabs.inert = true

    // this.previousActiveElement = this.previousActiveElement.bind(this)
    this.showModal = this.showModal.bind(this)
    this.bindKeypress = this.bindKeypress.bind(this)
    this.hideModal = this.hideModal.bind(this)

    this.showModalButtonEl.forEach(child => {
      child.addEventListener('click', this.showModal)
    })
  }

  showModal () {
    // Grab a reference of the previous active element
    // We will use this when the user closes the modal
    // this.previousActiveElement = document.activeElement

    // Remove modal show event listener
    this.showModalButtonEl.forEach(child => {
      child.removeEventListener('click', this.showModal)
    })
    // Add modal close event listener
    this.hideModalButtonEl.forEach(child => {
      child.addEventListener('click', this.hideModal)
    })

    // Watch for ESC keydown to close modal
    document.addEventListener('keydown', this.bindKeypress)

    // Set all children elements of the body element to inert
    Array.from(document.body.children).forEach(child => {
      if (child !== this.modalEl) {
        child.inert = true
      }
    })

    this.modalEl.classList.add('c-modal--active')
    this.modalEl.setAttribute('aria-hidden', false)
    this.modalTabs.inert = false

    this.modalTabs._focusableElements[1].focus()
  }

  bindKeypress (e) {
    if (e.keyCode === this.KEYCODE.ESC) {
      this.hideModal()
    }
  }

  hideModal () {
    // Reinitiate modal show event listener
    this.showModalButtonEl.forEach(child => {
      child.addEventListener('click', this.showModal)
    })
    // Remove modal close event listener
    this.hideModalButtonEl.forEach(child => {
      child.removeEventListener('click', this.showModal)
    })

    // Remove ESC keydown event listener
    document.removeEventListener('keydown', this.bindKeypress)

    // Reset all children elements of the body element to inert
    Array.from(document.body.children).forEach(child => {
      child.inert = false
    })

    this.modalEl.classList.remove('c-modal--active')
    this.modalEl.setAttribute('aria-hidden', true)
    this.modalTabs.inert = true
    // this.previousActiveElement.focus()
  }
}

export default Modal
