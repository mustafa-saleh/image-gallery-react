/**@jsx jsx */
import {jsx} from '@emotion/react'

import Logo from 'assets/logo.svg'
import {Button} from 'components/lib'
import * as colors from 'styles/colors'
import {useAuth} from 'context/auth-context'

const styles = {
  banner: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2em 0 1em 0',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    '> div': {
      display: 'flex',
    },
    h1: {
      fontSize: '1.4rem',
      color: colors.purple,
    },
    p: {
      color: colors.gray80,
    },
    button: {
      fontWeight: '600',
      transition: 'all 0.3s ease-in-out 0s',
      ':hover': {
        color: colors.orange,
        boxShadow: '0 4px 6px -4px rgb(0 0 0 / 15%)',
        border: `1px solid ${colors.orange}`,
      },
    },
  },
}

const Header = () => {
  const {logout} = useAuth()
  return (
    <header css={styles.banner}>
      <div>
        <img src={Logo} width="60" height="60" alt="App Logo" />
        <div css={{marginLeft: '10px'}}>
          <h1>IMAGE GALLERY</h1>
          <p>React app to manage user images </p>
        </div>
      </div>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </header>
  )
}

export default Header
