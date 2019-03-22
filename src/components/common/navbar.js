import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const NavBar = () => {
  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <h1>
    React Material UI Example
          </h1>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default NavBar
