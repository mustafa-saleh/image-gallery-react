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

const History = ({items}) => {
  const itemKeys = Object.keys(items)

  return (
    <section css={styles.history}>
      <h3>HISTORY</h3>
      {/* <Cards items={itemKeys} /> */}
      <div css={styles.cardList}>
        {itemKeys ? (
          <ul>
            {itemKeys.map((item, index) => (
              <li key={index}>
                <Card item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <pre>NO HISTORY ITEMS AVAIABLE FOR DISPLAY</pre>
        )}
      </div>
    </section>
  )
}

export default History
