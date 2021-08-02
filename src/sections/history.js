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

const RenderHistoryItems = ({items, selected, handleSelect}) => {
  if (items && items.length)
    return (
      <ul>
        {items.map((item, index) => (
          <Li
            key={index}
            variant={index === selected ? 'selected' : 'default'}
            onClick={() => handleSelect(index, item)}
          >
            <Card item={capitalize(item)} />
          </Li>
        ))}
      </ul>
    )
  else return <pre>NO HISTORY ITEMS AVAIABLE FOR DISPLAY</pre>
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
      <div css={styles.cardList}>
        <RenderHistoryItems
          items={items}
          selected={selected}
          handleSelect={handleSelect}
        />
      </div>
    </section>
  )
}

export default History
