/**@jsx jsx */
import {jsx} from '@emotion/react'

import {
  Select,
  Option,
  TextArea,
  Button,
  Label,
  FormGroup,
  Spinner,
} from 'components/lib'
import React from 'react'
import DropDownMenu from 'components/drop-down-menu'
import * as auth from 'utils/auth-provider'
import {useAuth} from 'context/auth-context'
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
      color: colors.error,
      paddingTop: '1em',
    },
    pre: {
      marginBottom: 0,
    },
  },
}

const languages = [
  'English',
  'Arabic',
  'Brazilian',
  'Chinese',
  'Dutch',
  'French',
  'Germa',
  'Italia',
  'Japanes',
  'Korea',
  'Spanis',
]

function TextToSpeechForm({onSubmit, buttonText, historyText, isLoading}) {
  const [text, setText] = React.useState('')
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (historyText) setText(historyText)
  }, [historyText])

  function handleChange(event) {
    const value = event.target.value
    if (error) {
      setError(null)
    }

    value.length > 50
      ? setError({message: 'Maximum text length allowed is 50 characters'})
      : setText(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.length)
      setError({message: 'Please, enter some text to convert to speech'})
    else onSubmit(text.trim().toLowerCase())
  }

  return (
    <form css={styles.form} onSubmit={handleSubmit}>
      {/* <FormGroup>
        <Label htmlFor="language">Language</Label>
        <Select id="language">
          {languages.map((language, index) => (
            <Option value={language}>{language}</Option>
          ))}
        </Select>
        <DropDownMenu options={languages} />
      </FormGroup> */}
      <FormGroup>
        <Label htmlFor="text">
          Use the sample text or enter your own text in English
        </Label>
        <TextArea
          id="text"
          cols="40"
          rows="5"
          placeholder="Type some english text here..."
          value={text}
          onChange={handleChange}
        ></TextArea>
        {error ? (
          <small>
            <pre>{error.message}</pre>
          </small>
        ) : null}
      </FormGroup>
      <Button type="submit" disabled={isLoading}>
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
}) => {
  const audioRef = React.useRef()
  const [buttonText, setButtonText] = React.useState('PLAY')

  React.useEffect(() => {
    const cleanUpRef = audioRef.current
    if (audioSource && audioRef.current) {
      if (
        audioRef.current.paused &&
        audioRef.current.currentTime > 0 &&
        !audioRef.current.ended
      ) {
        audioRef.current.play()
      } else if (audioRef.current.paused) {
        console.log('paused')
        audioRef.current.load()
        audioRef.current.play()
        setButtonText('PAUSE')
        audioRef.current.addEventListener('ended', () => {
          setButtonText('PLAY')
        })
      } else {
        audioRef.current.pause()
        setButtonText('PLAY')
      }
      // return () => {
      //   cleanUpRef.removeEventListner('ended', () => {
      //     setButtonText('PLAY')
      //   })
      // }
    }
  }, [audioSource, flag])

  return (
    <section id="speech-section" css={styles.textToSpeech}>
      <h3>TEXT TO SPEECH</h3>
      <TextToSpeechForm
        historyText={historyText}
        buttonText={buttonText}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <audio ref={audioRef}>
        <source src={audioSource} />
        Your browser does not support the audio tag.
      </audio>
    </section>
  )
}

export {TextToSpeech, TextToSpeechForm}
