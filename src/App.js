/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Container} from 'components/lib'
import Header from 'sections/header'
import History from 'sections/history'
import TextToSpeech from 'sections/text-to-speech'
import Footer from 'sections/footer'

const styles = {
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridGap: '0.75rem',
  },
}

function App() {
  return (
    <Container>
      <Header />
      <main css={styles.main}>
        <History />
        <TextToSpeech />
      </main>
      <Footer />
    </Container>
  )
}

export default App
