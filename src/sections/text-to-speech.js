/**@jsx jsx */
import {jsx} from '@emotion/react'

import {
  Select,
  Option,
  TextArea,
  Button,
  Label,
  FormGroup,
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
    h3: {
      color: colors.gray80,
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

function TextToSpeechForm({onSubmit, buttonText, historyText}) {
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
    onSubmit(text.trim().toLowerCase())
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
          cols="50"
          rows="5"
          placeholder="Type some text here..."
          value={text}
          onChange={handleChange}
        ></TextArea>
        {error ? (
          <small>
            <pre>{error.message}</pre>
          </small>
        ) : null}
      </FormGroup>
      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

const TextToSpeech = ({handleSubmit, audioSource, flag, historyText}) => {
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
      return () => {
        cleanUpRef.removeEventListner('ended', () => {
          setButtonText('PLAY')
        })
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
      />
      <audio ref={audioRef}>
        <source src={audioSource} />
        Your browser does not support the audio tag.
      </audio>
    </section>
  )
}

export default TextToSpeech
