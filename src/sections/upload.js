/**@jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import {Button, FileInput, Label, FormGroup, Spinner} from 'components/lib'
import * as colors from 'styles/colors'

const styles = {
  upload: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.base,
    padding: '1.2em',
    border: `1px solid ${colors.gray10}`,
    borderRadius: '3px',
    boxShadow: '0 6px 2px -6px rgb(0 0 0 / 15%)',
    h3: {
      color: colors.text,
      letterSpacing: '1px',
      fontSize: '1rem',
      marginBottom: '1.2em',
    },
  },
  form: {
    color: colors.text,
    fontSize: '1rem',
    small: {
      color: colors.danger,
      marginLeft: '2em',
    },
  },
}

function UploadForm({onSubmit, status, error, resetError}) {
  const [file, setFile] = React.useState()

  React.useEffect(() => {
    if (status === 'RESOLVED_UP' && file) setFile(null)
  }, [file, status])

  function handleChange(event) {
    resetError()
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!file) return

    const data = new FormData()
    data.append('image', file)
    onSubmit(data, setFile)
  }

  return (
    <form
      css={styles.form}
      onSubmit={handleSubmit}
      enctype="multipart/form-data"
    >
      <FormGroup>
        <Label htmlFor="image">Please select an Image</Label>
        <FileInput
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" disabled={error || status === 'UPLOADING'}>
        Submit
      </Button>
      {status === 'UPLOADING' ? <Spinner css={{marginLeft: '.5em'}} /> : null}
      {error && status === 'REJECTED_UP' ? <small>{error}</small> : null}
    </form>
  )
}

const UploadToGallery = ({handleSubmit, status, error, resetError}) => {
  return (
    <section css={styles.upload}>
      <h3>UPLOAD TO GALLERY</h3>
      <UploadForm
        onSubmit={handleSubmit}
        status={status}
        error={error}
        resetError={resetError}
      />
    </section>
  )
}

export {UploadToGallery, UploadForm}
