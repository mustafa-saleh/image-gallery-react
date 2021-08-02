import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import {FullPageSpinner} from 'components/lib'
import 'styles/main'

ReactDOM.render(
  <React.Suspense fallback={<FullPageSpinner />}>
    <App />
  </React.Suspense>,
  document.getElementById('root'),
)
