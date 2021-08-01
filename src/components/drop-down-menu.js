import React from 'react'
import {Menu, MenuButton, MenuItem, MenuList} from 'components/lib'

const DropDownMenu = ({options}) => {
  const [state, setState] = React.useState(options[0])

  return (
    <Menu>
      <MenuButton>
        {state} <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        {options.map((option, index) => (
          <MenuItem key={index} onSelect={() => alert('Download')}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropDownMenu
