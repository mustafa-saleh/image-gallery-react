/**@jsx jsx */
import {jsx} from '@emotion/react'

import Cards from 'components/cards'
import * as colors from 'styles/colors'

const styles = {
  history: {
    display: 'flex',
    flexDirection: 'column',
    h3: {
      color: colors.gray80,
      fontSize: '1rem',
    },
  },
}

const items = [
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos maxime modi iusto cupiditate magnam quam ex adipisci, inventore cum quos ab. Officiis optio fugit veritatis autem tempore esse, cumque tempora.',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos maxime modi iusto cupiditate magnam quam ex adipisci, inventore cum quos ab. Officiis optio fugit veritatis autem tempore esse, cumque tempora.',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos maxime modi iusto cupiditate magnam quam ex adipisci, inventore cum quos ab. Officiis optio fugit veritatis autem tempore esse, cumque tempora.',
  },
]

const History = () => {
  return (
    <section css={styles.history}>
      <h3>HISTORY</h3>
      <Cards items={items} />
    </section>
  )
}

export default History
