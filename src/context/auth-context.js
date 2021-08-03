/** @jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import * as auth from 'utils/auth'
import {reduceError} from 'utils/tools'
import {getToken} from 'utils/tools'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const [state, setState] = React.useState({
    user: null,
    error: null,
    status: 'IDLE',
    token: null,
  })

  React.useEffect(() => {
    const token = getToken()
    if (token) setState({...state, token})
  }, [state])

  const login = form => {
    setState({status: 'LOADING'})
    auth
      .login(form)
      .then(user => setState({user, token: user.token, status: 'RESOLVED'}))
      .catch(error => setState({status: 'REJECTED', error: reduceError(error)}))
  }

  const register = form => {
    setState({status: 'LOADING'})
    auth
      .register(form)
      .then(user => setState({user, token: user.token, status: 'RESOLVED'}))
      .catch(error => setState({status: 'REJECTED', error: reduceError(error)}))
  }

  const logout = () => {
    auth.logout()
    setState({status: 'RESOLVED'})
  }

  const resetContextError = () => setState({...state, error: null})

  const value = {
    login,
    logout,
    register,
    token: state.token,
    user: state.user,
    error: state.error,
    status: state.status,
    resetContextError: resetContextError,
  }
  return <AuthContext.Provider value={value} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export {AuthProvider, useAuth}
