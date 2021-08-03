/** @jsx jsx */
import {jsx} from '@emotion/react'

import React from 'react'
import {Input, Button, Spinner, FormGroup} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'
import {useAuth} from './context/auth-context'
import {isValidEmail} from 'utils/tools'
import * as colors from 'styles/colors'

const styles = {
  unAuthenticatedApp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    h1: {
      fontSize: '1.6rem',
      marginBottom: '1em',
    },
  },
  modal: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridGap: '0.75rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    pre: {
      margin: '0',
      marginBottom: -5,
      whiteSpace: 'break-spaces',
      color: colors.danger,
    },
    '> div': {
      margin: '10px auto',
      width: '100%',
      maxWidth: '300px',
    },
  },
}

const errors = {
  password: 'Please enter a valid password, min 6 & max 50 characters',
  email: 'Please, enter a valid email',
}

function LoginForm({onSubmit, submitButton, status, error}) {
  const [validationError, setValidationError] = React.useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    let {email, password} = event.target.elements
    email = email.value
    password = password.value

    if (!isValidEmail(email)) setValidationError(errors.email)
    else if (password.trim().length < 6 || password.trim().length > 50)
      setValidationError(errors.password)
    else onSubmit({email, password})
  }

  return (
    <form onSubmit={handleSubmit} css={styles.form}>
      <FormGroup variant="column">
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </FormGroup>
      <FormGroup variant="column">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          status === 'LOADING' ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
      <div>
        {error || validationError ? (
          <pre>{error || validationError}</pre>
        ) : null}
      </div>
    </form>
  )
}

function UnauthenticatedApp() {
  const {login, register, status, error} = useAuth()

  return (
    <div css={styles.unAuthenticatedApp}>
      <Logo width="100" height="100" />
      <h1>IMAGE GALLERY</h1>
      <div css={styles.modal}>
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              status={status}
              error={error}
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              status={status}
              error={error}
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
