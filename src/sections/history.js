/**@jsx jsx */
import {jsx} from '@emotion/react'

import Card from 'components/card'
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
  cardList: {
    color: colors.gray80,
    fontSize: '0.9rem',
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    li: {
      marginBottom: '0.4em',
      ':last-child': {
        marginBottom: 0,
      },
    },
  },
}

const History = ({items, onSelect}) => {
  return (
    <section css={styles.history}>
      <h3>HISTORY</h3>
      {/* <Cards items={itemKeys} /> */}
      <div css={styles.cardList}>
        {items ? (
          <ol>
            {items.map((item, index) => (
              <li key={index} onClick={() => onSelect(item)}>
                <Card item={item} />
              </li>
            ))}
          </ol>
        ) : (
          <pre>NO HISTORY ITEMS AVAIABLE FOR DISPLAY</pre>
        )}
      </div>
    </section>
  )
}

export default History
