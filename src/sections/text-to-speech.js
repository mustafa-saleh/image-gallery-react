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
import DropDownMenu from 'components/drop-down-menu'
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
  function handleSubmit(event) {
    event.preventDefault()
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
        ></TextArea>
      </FormGroup>
      <Button>PLAY</Button>
    </form>
  )
}

const TextToSpeech = () => {
  return (
    <section css={styles.textToSpeech}>
      <h3>TEXT TO SPEECH</h3>
      <TextToSpeechForm />
    </section>
  )
}

export default TextToSpeech
