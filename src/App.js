/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import {useAuth} from 'context/auth-context'
import {FullSpinner} from 'components/lib'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {token} = useAuth()
  return (
    <React.Suspense fallback={<FullSpinner />}>
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
