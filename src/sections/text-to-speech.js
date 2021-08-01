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
import theSrc from 'assets/hello_ibm.wav'

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

function TextToSpeechForm({onSubmit}) {
  const [text, setText] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()

    // validation
    onSubmit(text)
  }

  return (
    <form css={styles.form} onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="language">Language</Label>
        <Select id="language">
          {languages.map((language, index) => (
            <Option value={language}>{language}</Option>
          ))}
        </Select>
        {/* <DropDownMenu options={languages} /> */}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="text">Text to Convert</Label>
        <TextArea
          id="text"
          cols="50"
          rows="7"
          placeholder="Type some text here"
          value={text}
          onChange={event => setText(event.target.value)}
        ></TextArea>
      </FormGroup>
      <Button type="submit">PLAY</Button>
    </form>
  )
}

const TextToSpeech = ({handleSubmit, audioSource, flag}) => {
  const audioRef = React.useRef()

  React.useEffect(() => {
    console.log('fire effect')
    if (audioSource) {
      console.log('effect ad=udio source')
      if (audioRef.current) {
        // audioRef.current.pause()
        audioRef.current.load()
        audioRef.current.play()
      }
    }
    // return () => (audioRef.current = null)
  }, [audioSource, flag])

  return (
    <section css={styles.textToSpeech}>
      <h3>TEXT TO SPEECH</h3>
      <TextToSpeechForm onSubmit={handleSubmit} />
      <audio ref={audioRef}>
        <source src={audioSource} />
        Your browser does not support the audio tag.
      </audio>
    </section>
  )
}

export default TextToSpeech
