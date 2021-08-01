/**@jsx jsx */
import {jsx} from '@emotion/react'

import * as colors from 'styles/colors'

const styles = {
  footer: {
    position: 'relative',
    bottom: '0',
    marginTop: '2em',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: colors.text,
  },
}

const Footer = () => {
  return (
    <footer css={styles.footer}>
      <small>Copyright 2021 by Mustafa. No Rights Reserved</small>
    </footer>
  )
}

export default Footer
