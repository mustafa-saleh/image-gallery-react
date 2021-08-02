/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Container} from 'components/lib'
import Header from 'sections/header'
import Footer from 'sections/footer'
import Main from 'sections/main'

function App() {
  return (
    <Container>
      <Header />
      <Main />
      <Footer />
    </Container>
  )
}

export default App
