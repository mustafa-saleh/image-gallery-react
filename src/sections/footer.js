/**@jsx jsx */
import {jsx} from '@emotion/react'

import * as colors from 'styles/colors'

const styles = {
  footer: {
    // position: 'relative',
    // bottom: '0',
    // width: '100%',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: colors.gray80,
  },
}

const Footer = () => {
  return (
    <footer css={styles.footer}>
      <p>Copyright 2021 by Mustafa. All Rights Reserved</p>
    </footer>
  )
}

export default Footer
