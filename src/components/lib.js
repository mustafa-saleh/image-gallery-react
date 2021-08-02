/**@jsx jsx */
import {jsx} from '@emotion/react'

import styled from '@emotion/styled/macro'
import {keyframes} from '@emotion/react'
import {FaSpinner} from 'react-icons/fa'
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
    background: colors.purple,
    color: colors.base,
    hoverBackground: colors.purpleDarken10,
    disabledBackground: colors.lightPurple,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}

const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
    letterSpacing: '1px',
    transition: 'all 0.3s ease-in-out 0s',
  },
  ({variant = 'primary'}) => {
    return {
      ...buttonVariants[variant],
      ':hover': {
        background: buttonVariants[variant].hoverBackground,
      },
      ':disabled': {
        background: buttonVariants[variant].disabledBackground,
      },
    }
  },
)

const Label = styled.label({
  marginBottom: '0.6em',
  fontSize: '0.825rem',
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '.875em',
})

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
  TextArea,
  FullPageSpinner,
  Button,
  Spinner,
  Label,
  FormGroup,
}
