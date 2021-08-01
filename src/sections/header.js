/**@jsx jsx */
import {jsx} from '@emotion/react'

import Logo from 'assets/logo.svg'
import * as colors from 'styles/colors'

const styles = {
  banner: {
    display: 'flex',
    flexDirection: 'row',
    margin: '3rem 0',
    div: {
      margin: '10px 0 0 10px',
    },
    h1: {
      fontSize: '1.8rem',
    },
    h6: {
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
          <h6>Listen to voices across languages and dialects</h6>
        </div>
      </div>
    </header>
  )
}

export default Header
