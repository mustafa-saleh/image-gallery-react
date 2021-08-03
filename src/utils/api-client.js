import * as auth from 'utils/auth'
const apiURL = process.env.REACT_APP_API_URL

async function client(
  endpoint,
  {data, token, isMultipart, headers: customHeaders, ...customConfig} = {},
) {
  const config = isMultipart
    ? {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          ...customHeaders,
        },
        ...customConfig,
      }
    : {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': data ? 'application/json' : undefined,
          ...customHeaders,
        },
        ...customConfig,
      }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      // refresh the page
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
