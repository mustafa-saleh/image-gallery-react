/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Card} from 'components/lib'
import * as colors from 'styles/colors'

const styles = {
  card: {
    cursor: 'pointer',
    p: {
      margin: 0,
      textAlign: 'justify',
    },
  },
}

const Cards = ({item}) => {
  return (
    <Card>
      <div css={styles.card}>
        <p>{item}</p>
      </div>
    </Card>
  )
}

export default Cards
