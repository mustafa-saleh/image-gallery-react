/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import Card from 'components/card'
import {Li} from 'components/lib'
import {capitalize} from 'utils/tools'
import * as colors from 'styles/colors'

const styles = {
  history: {
    display: 'flex',
    flexDirection: 'column',
    // paddingTop: '1.2em',
    h3: {
      color: colors.text,
      letterSpacing: '1px',
      fontSize: '1rem',
      marginBottom: '1em',
    },
  },
  cardList: {
    color: colors.gray80,
    fontSize: '0.9rem',
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      maxHeight: '64vh',
      overflowY: 'scroll',
      '::-webkit-scrollbar': {
        display: 'none',
      },
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
  const [selected, setSelected] = React.useState(-1)

  function handleSelect(itemIndex, item) {
    setSelected(itemIndex)
    onSelect(item)
  }

  return (
    <section id="history-section" css={styles.history}>
      <h3>FETCH HISTORY</h3>
      {/* <Cards items={itemKeys} /> */}
      <div css={styles.cardList}>
        {items ? (
          <ul>
            {items.map((item, index) => (
              <Li
                variant={index === selected ? 'selected' : 'default'}
                key={index}
                onClick={() => handleSelect(index, item)}
              >
                <Card item={capitalize(item)} />
              </Li>
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
