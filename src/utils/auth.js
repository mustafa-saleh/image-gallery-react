import {client} from 'utils/api-client'
import {clearToken, setToken} from 'utils/tools'

function handleUserResponse({data: user}) {
  setToken(user.token)
  return user
}

export function login(form) {
  return client('auth/login', {data: form}).then(handleUserResponse)
}

export function register(form) {
  return client('users/register', {data: form}).then(handleUserResponse)
}

export function logout() {
  clearToken()
}
