/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import History from 'sections/history'
import {client} from 'utils/api-client'
import {TextToSpeech} from 'sections/text-to-speech'
import {getLocalStorage, setLocalStorage} from 'utils/tools'
import * as mq from 'styles/media-queries'

const styles = {
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridGap: '0.75rem',
    [mq.small]: {
      gridTemplateColumns: '1fr',
      gridRowGap: '3em',
      '#history-section': {
        order: 2,
      },
    },
  },
}

const speechLocalStorageKey = '__ibm_text_to_speech__'
const initialState = {
  audioSource: null,
  historyText: '',
  flag: false,
  loading: false,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.data}
    case 'RESET_ERROR':
      return {...state, error: action.data}
    case 'FETCH_LOCAL':
      return {...state, flag: !state.flag, audioSource: action.data}
    case 'FETCH_API':
      return {...state, loading: false, audioSource: action.data}
    case 'API_ERROR':
      return {...state, loading: false, error: action.data}
    case 'HISTORY_SELECTION':
      return {
        ...state,
        historyText: action.data.text,
        audioSource: action.data.source,
      }
    default:
      throw new Error(`Not supported action type ${action.type}`)
  }
}

const Main = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  function handleSubmit(textToConvert) {
    const localStorage = getLocalStorage(speechLocalStorageKey)
    // return audio sourece from local storage
    if (localStorage && localStorage[textToConvert]) {
      dispatch({type: 'FETCH_LOCAL', data: localStorage[textToConvert]})
    }
    // fetch audio source from api
    else {
      dispatch({type: 'LOADING', data: true})
      client('synthesize', {data: {text: textToConvert}})
        .then(blob => {
          const reader = new FileReader()
          reader.addEventListener('loadend', () => {
            const storedItems = localStorage || {}
            storedItems[textToConvert] = reader.result
            setLocalStorage(speechLocalStorageKey, storedItems)
            dispatch({type: 'FETCH_API', data: reader.result})
          })
          reader.readAsDataURL(blob)
        })
        .catch(err => {
          const error = new Error('There was an error, please try again')
          dispatch({type: 'API_ERROR', data: error})
        })
    }
  }

  function onHistoryItemSelect(selectedHistoryItem) {
    const localStorage = getLocalStorage(speechLocalStorageKey)
    const data = {
      source: localStorage[selectedHistoryItem],
      text: selectedHistoryItem,
    }
    dispatch({type: 'HISTORY_SELECTION', data})
  }

  function resetError() {
    dispatch({type: 'RESET_ERROR', data: false})
  }

  const historyItems = Object.keys(getLocalStorage(speechLocalStorageKey) || {})

  return (
    <main css={styles.main}>
      <History onSelect={onHistoryItemSelect} items={historyItems} />
      <TextToSpeech
        flag={state.flag}
        historyText={state.historyText}
        audioSource={state.audioSource}
        handleSubmit={handleSubmit}
        isLoading={state.loading}
        apiError={state.error}
        resetApiError={resetError}
      />
    </main>
  )
}

export default Main
