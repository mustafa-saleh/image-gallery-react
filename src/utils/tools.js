function capitalize(string) {
  if (!string.length) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function setLocalStorage(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export {capitalize, getLocalStorage, setLocalStorage}
