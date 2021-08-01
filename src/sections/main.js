/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import History from 'sections/history'
import TextToSpeech from 'sections/text-to-speech'
import {client} from 'utils/api-client'

const authToken = process.env.REACT_APP_AUTH_TOKEN
const textToSpeechKey = '__ibm_text_to_speech__'

const styles = {
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridGap: '0.75rem',
  },
}

const Main = () => {
  const [audioSource, setAudioSource] = React.useState(null)
  const [historyText, setHistoryText] = React.useState('')
  const [flag, setFlag] = React.useState(false)

  function handleSubmit(text) {
    const localValue = JSON.parse(window.localStorage.getItem(textToSpeechKey))
    if (localValue && localValue[text]) {
      // const url = URL.createObjectURL(JSON.parse(localValue))
      // console.log({localValue})
      setAudioSource(localValue[text])
      setFlag(!flag)
    } else {
      client('synthesize', {
        data: {text},
        token: authToken,
        headers: {Accept: 'audio/wav'},
      })
        .then(blob => {
          const reader = new FileReader()
          reader.addEventListener('loadend', () => {
            let storedItems =
              JSON.parse(window.localStorage.getItem(textToSpeechKey)) || {}
            storedItems[text] = reader.result
            console.log({storedItems})
            window.localStorage.setItem(
              textToSpeechKey,
              JSON.stringify(storedItems),
            )
            setAudioSource(reader.result)
          })
          reader.readAsDataURL(blob)
          // const blobText = await blob.text()
          // console.log({blob, bloblStr: JSON.stringify(blob), blobText})
          // const url = URL.createObjectURL(blob)
          // setAudioSource(url)
        })
        .catch(err => console.log(err))
    }
  }

  function onHistoryItemSelect(selectedHistoryItem) {
    const localValue = JSON.parse(window.localStorage.getItem(textToSpeechKey))
    setAudioSource(localValue[selectedHistoryItem])
    setHistoryText(selectedHistoryItem)
  }

  const historyItems = React.useMemo(
    () => Object.keys(JSON.parse(window.localStorage.getItem(textToSpeechKey))),
    [audioSource],
  )

  return (
    <main css={styles.main}>
      <History onSelect={onHistoryItemSelect} items={historyItems} />
      <TextToSpeech
        flag={flag}
        historyText={historyText}
        audioSource={audioSource}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default Main
