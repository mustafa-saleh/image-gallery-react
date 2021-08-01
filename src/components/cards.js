/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Card} from 'components/lib'
import * as colors from 'styles/colors'

const styles = {
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
  content: {
    cursor: 'pointer',
    p: {
      margin: 0,
      textAlign: 'justify',
    },
  },
}

const Cards = ({items}) => {
  return (
    <div css={styles.cardList}>
      {items ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Card>
                <div css={styles.content}>
                  <p>{item.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <pre>NO HISTORY ITEMS AVAIABLE FOR DISPLAY</pre>
      )}
    </div>
  )
}

export default Cards
