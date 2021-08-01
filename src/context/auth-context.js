/** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
// import {queryCache} from 'react-query'
import * as auth from 'utils/auth-provider'
// import {client} from 'utils/api-client'
// import {useAsync} from 'utils/hooks'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const localToken = auth.getLocalToken()
  const [token, setToken] = React.useState(localToken)

  React.useEffect(() => {
    if (token) {
      auth.setLocalToken(token)
    } else {
      auth.removeLocalToken()
    }
  }, [token])

  return <AuthContext.Provider value={{token, setToken}} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export {AuthProvider, useAuth}
