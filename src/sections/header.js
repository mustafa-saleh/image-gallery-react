/**@jsx jsx */
import {jsx} from '@emotion/react'

import Logo from 'assets/logo.svg'
import * as colors from 'styles/colors'

const styles = {
  banner: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2rem 0',
    alignItems: 'flex-start',
    div: {
      marginLeft: '10px',
    },
    h1: {
      fontSize: '1.4rem',
    },
    p: {
      color: colors.gray80,
    },
  },
}

const Header = () => {
  return (
    <header>
      <div css={styles.banner}>
        <img src={Logo} alt="App Logo" />
        <div>
          <h1>Watson Text to Speech Voices</h1>
          <p>Listen to voices across languages and dialects</p>
        </div>
      </div>
    </header>
  )
}

export default Header
