const localStorageKey = '__gallery_auth_token__'

function capitalize(string) {
  if (!string.length) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function reduceError(error) {
  const fallback = 'Sorry, something wrong happened!'
  if (!error || !error.errors) return fallback

  if (typeof error.errors === 'string') return error.errors
  return Object.values(error.errors).join('. ')
}

function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function setToken(token) {
  window.localStorage.setItem(localStorageKey, token)
}

function clearToken() {
  window.localStorage.removeItem(localStorageKey)
}

export {capitalize, clearToken, isValidEmail, reduceError, getToken, setToken}
