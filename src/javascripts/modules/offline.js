export default function () {
  window.addEventListener('offline', handleOffline)
  window.addEventListener('online', handleOnline)
  window.addEventListener('load', () => {
    navigator.onLine ? handleOnline() : handleOffline()
  })

  function handleOffline () {
    const template = document.querySelector('#offline-message-template')
    return document.body.prepend(template.content.cloneNode(true))
  }

  function handleOnline () {
    const message = document.querySelector('#offline-message')
    return message ? document.body.removeChild(message) : null
  }
}
