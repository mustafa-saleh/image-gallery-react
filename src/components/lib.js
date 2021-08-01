/**@jx jsx */
import {jsx} from '@emotion/react'

import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {
  Menu as ReachMenu,
  MenuButton as ReachMenuButton,
  MenuItem as ReachMenuItem,
  MenuList as ReachMenuList,
} from '@reach/menu-button'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '876px',
  margin: '0 auto',
  [mq.small]: {
    width: '96%',
  },
})

const Card = styled.div({
  outlineWidth: 0,
  padding: '14px 16px',
  borderRadius: '3px',
  transition: 'all 0.3s ease-in-out 0s',
  ':hover': {
    background: colors.base,
    boxShadow: '0 10px 25px -10px rgb(0 0 0 / 15%)',
  },
})

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
    background: colors.blue,
    color: colors.base,
    hoverBackground: colors.blueDarken10,
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
  },
  ({variant = 'primary'}) => {
    return {
      ...buttonVariants[variant],
      ':hover': {
        background: buttonVariants[variant].hoverBackground,
      },
    }
  },
)

const Label = styled.label({
  marginBottom: '0.6em',
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '.875em',
})

const Menu = styled(ReachMenu)({})
const MenuButton = styled(ReachMenuButton)({})
const MenuItem = styled(ReachMenuItem)({})
const MenuList = styled(ReachMenuList)({})

export {
  Container,
  Card,
  Select,
  Option,
  TextArea,
  Button,
  Label,
  FormGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
}
