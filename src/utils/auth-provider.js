const localStorageKey = '__auth_provider_token__'
const authURL = process.env.REACT_APP_AUTH_API_URL
const grantType = process.env.REACT_APP_AUTH_GRANT_TYPE
const apikey = process.env.REACT_APP_AUTH_API_KEY

function getLocalToken() {
  return window.localStorage.getItem(localStorageKey)
}

function setLocalToken(token) {
  window.localStorage.setItem(localStorageKey, token)
  return token
}

function removeLocalToken() {
  window.localStorage.removeItem(localStorageKey)
}

function generateToken() {
  return client('token', {grantType, apikey})
}

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: data.grantType,
      apikey: data.apikey,
    }),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getLocalToken, setLocalToken, removeLocalToken, generateToken}
