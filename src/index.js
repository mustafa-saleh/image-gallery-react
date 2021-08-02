import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import {FullPageSpinner} from 'components/lib'
import 'styles/main'

ReactDOM.render(
  <React.Suspense fallback={<FullPageSpinner />}>
    <App />
  </React.Suspense>,
  document.getElementById('root'),
)
