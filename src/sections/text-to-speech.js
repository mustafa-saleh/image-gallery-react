/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import {TextArea, Button, Label, FormGroup, Spinner} from 'components/lib'
import * as colors from 'styles/colors'

const styles = {
  textToSpeech: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.base,
    padding: '1.2em',
    border: `1px solid ${colors.gray10}`,
    borderRadius: '3px',
    boxShadow: '0 6px 2px -6px rgb(0 0 0 / 15%)',
    h3: {
      color: colors.purple,
      letterSpacing: '1px',
      fontSize: '1rem',
      marginBottom: '1.2em',
    },
  },
  form: {
    color: colors.text,
    fontSize: '0.95rem',
    small: {
      color: colors.danger,
      paddingTop: '1em',
    },
    pre: {
      marginBottom: 0,
    },
  },
}

const validation = {
  maxLengthExceede: 'Maximum text length allowed is 50 characters',
  requiredField: 'Please, enter some text to convert to speech',
}

function TextToSpeechForm({
  onSubmit,
  buttonText,
  historyText,
  isLoading,
  apiError,
  resetApiError,
}) {
  const [state, setState] = React.useState({text: ''})

  React.useEffect(() => {
    if (historyText) setState({...state, text: historyText})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyText])

  function handleChange(event) {
    const targetValue = event.target.value
    if (state.error) setState({text: state.text})
    if (apiError) resetApiError()
    if (targetValue.length > 50)
      setState({...state, error: validation.maxLengthExceede})
    else setState({text: targetValue})
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!state.text.length)
      setState({...state, error: validation.requiredField})
    else onSubmit(state.text.trim().toLowerCase())
  }

  return (
    <form css={styles.form} onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="speech-text">
          Use the sample text or enter your own text in English
        </Label>
        <TextArea
          cols="40"
          rows="5"
          id="speech-text"
          placeholder="Type some english text here..."
          value={state.text}
          onChange={handleChange}
        ></TextArea>
        {state.error || apiError ? (
          <small>
            <pre>{state.error || apiError.message}</pre>
          </small>
        ) : null}
      </FormGroup>
      <Button type="submit" disabled={isLoading || state.error || apiError}>
        {buttonText}
      </Button>
      {isLoading ? <Spinner css={{marginLeft: '.5em'}} /> : null}
    </form>
  )
}

const TextToSpeech = ({
  handleSubmit,
  audioSource,
  flag,
  historyText,
  isLoading,
  apiError,
  resetApiError,
}) => {
  const audioRef = React.useRef()
  const [buttonText, setButtonText] = React.useState('PLAY')
  const audioSourceRef = React.useRef(audioSource)

  React.useEffect(() => {
    const audioPlayer = audioRef.current
    if (
      audioSource &&
      audioSourceRef &&
      audioSourceRef.current !== audioSource
    ) {
      // new audio source
      audioSourceRef.current = audioSource
      audioPlayer.pause()
      audioPlayer.load()
      audioPlayer.play()
      setButtonText('PAUSE')
    } else if (audioSource && audioPlayer) {
      // resume
      if (
        audioPlayer.paused &&
        audioPlayer.currentTime > 0 &&
        !audioPlayer.ended
      ) {
        audioRef.current.play()
        setButtonText('PAUSE')
      }
      // start
      else if (audioRef.current.paused) {
        audioPlayer.load()
        audioPlayer.play()
        audioPlayer.addEventListener('ended', () => setButtonText('PLAY'))
        setButtonText('PAUSE')
      }
      // pause
      else {
        audioPlayer.pause()
        setButtonText('PLAY')
      }
    }
  }, [audioSource, flag])

  return (
    <section css={styles.textToSpeech}>
      <h3>TEXT TO SPEECH</h3>
      <TextToSpeechForm
        historyText={historyText}
        buttonText={buttonText}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        apiError={apiError}
        resetApiError={resetApiError}
      />
      <audio ref={audioRef}>
        <source src={audioSource} />
        Your browser does not support the audio tag.
      </audio>
    </section>
  )
}

export {TextToSpeech, TextToSpeechForm}
