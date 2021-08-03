/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Hr, Container} from 'components/lib'
import Header from 'sections/header'
import Main from 'sections/main'

function App() {
  return (
    <Container>
      <Header />
      <Hr />
      <Main />
    </Container>
  )
}

export default App
