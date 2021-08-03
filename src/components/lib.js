/**@jsx jsx */
import {jsx} from '@emotion/react'

import styled from '@emotion/styled/macro'
import {keyframes} from '@emotion/react'
import {FaSpinner} from 'react-icons/fa'
import {Dialog as ReachDialog} from '@reach/dialog'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '876px',
  width: '90%',
  margin: '0 auto',
  [mq.mini]: {
    width: '94%',
  },
})

const Card = styled.div({
  outlineWidth: 0,
  padding: '14px 16px',
  borderRadius: '3px',
  transition: 'all 0.3s ease-in-out 0s',
  ':hover': {
    color: colors.text,
    background: colors.base,
    boxShadow: '0 10px 25px -10px rgb(0 0 0 / 15%)',
  },
})

const liVariants = {
  default: {},
  selected: {
    color: colors.text,
    background: colors.base,
    boxShadow: '0 10px 25px -10px rgb(0 0 0 / 15%)',
    borderLeft: `3px solid ${colors.purple}`,
  },
}

const Li = styled.li(
  {
    marginBottom: '0.4em',
    ':last-child': {
      marginBottom: 0,
    },
  },
  ({variant = 'default'}) => liVariants[variant],
)

const Select = styled.select({
  border: `1px solid ${colors.gray20}`,
  borderRadius: '3px',
  background: colors.base,
  padding: '8px 12px',
  width: '140px',
  color: colors.text,
  outline: 0,
  transition: 'all 0.3s ease-in-out 0s',
  ':hover': {
    boxShadow: '0 6px 8px -6px rgb(0 0 0 / 15%)',
  },
})

const Option = styled.option({
  outline: 0,
  padding: '10px',
  background: colors.lightGrey,
  ':hover': {
    background: colors.base,
  },
})

const TextArea = styled.textarea({
  border: `1px solid ${colors.gray20}`,
  padding: '14px',
  borderRadius: '3px',
  margin: '0 !important',
  transition: 'all 0.3s ease-in-out 0s',
  ':hover': {
    boxShadow: '0 6px 8px -6px rgb(0 0 0 / 15%)',
  },
  ':focus-visible': {
    outline: 0,
  },
})

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}
const Button = styled.button(
  {
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
    padding: '10px 15px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
}

const Input = styled.input({borderRadius: '3px'}, inputStyles)

const Hr = styled.hr({
  color: colors.gray80,
  marginBottom: '2em',
})

const Label = styled.label({
  marginRight: '1em',
})

const FileInput = styled.input({
  color: colors.gray80,
  fontSize: '0.9rem',
  '::-webkit-file-upload-button': {
    display: 'none',
  },
  ':hover::before': {
    color: colors.purple,
    boxShadow: '0 6px 8px -6px rgb(0 0 0 / 15%)',
    border: `1px solid ${colors.purple}`,
  },
  '::before': {
    content: '"Upload"',
    display: 'inline-block',
    marginRight: '0.4em',
    background: colors.gray,
    color: colors.text,
    padding: '8px 12px',
    border: `1px solid ${colors.gray20}`,
    lineHeight: '1',
    borderRadius: '3px',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease-in-out 0s',
  },
})

const formGroupVariants = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '.875em',
  },
  column: {
    flexDirection: 'column',
  },
}

const FormGroup = styled.div(
  {
    display: 'flex',
  },
  ({variant = 'row'}) => formGroupVariants[variant],
)

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const dialogVariants = {
  small: {
    maxWidth: '450px',
    margin: '20vh auto',
  },
  large: {
    width: '80%',
    margin: '10vh auto',
  },
}

const Dialog = styled(ReachDialog)(
  {
    borderRadius: '3px',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    [mq.small]: {
      width: '100%',
      margin: '10vh auto',
    },
  },
  ({variant = 'small'}) => dialogVariants[variant],
)

const spinnerVariants = {
  fullpage: {
    fontSize: '4em',
    height: '100vh',
  },
  section: {
    fontSize: '3em',
    height: '100%',
    minHeight: '50vh',
  },
}

function FullSpinner({variant = 'fullpage'}) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...spinnerVariants[variant],
      }}
    >
      <Spinner />
    </div>
  )
}

export {
  Container,
  Card,
  Select,
  Option,
  Li,
  Hr,
  Dialog,
  CircleButton,
  Input,
  FileInput,
  TextArea,
  FullSpinner,
  Button,
  Spinner,
  Label,
  FormGroup,
}
