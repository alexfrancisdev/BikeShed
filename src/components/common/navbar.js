import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'

import { deleteToken, decodeToken, isAuthenticated } from '../../lib/common'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  dropdown: {
    height: 200
  }
})


class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleClick(event){
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose(){
    this.setState({ anchorEl: null })
    console.log('booo')
  }

  handleLogout() {
    deleteToken()
    this.handleClose()
  }

  render(){
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Bikeshed
            </Typography>
            {!isAuthenticated()
              ?
              <div>
                <Button color="inherit"><Link to='/login'>Login</Link></Button>
                <Button color="inherit"><Link to='/register'>Sign Up</Link></Button>
              </div>
              :
              <div>
                <Button color="inherit" onClick={this.handleClick}>{decodeToken().username}</Button>
                <Menu id="render-props-menu" className={classes.root} anchorEl={anchorEl} open={open} onClose={this.handleClose}>
                  <MenuItem onClick={this.handleClose}><Link to='#'>Profile</Link></MenuItem>
                  <MenuItem onClick={this.handleClose}><Link to='#'>My account</Link></MenuItem>
                  <MenuItem onClick={this.handleLogout}><Link to='#'>Logout</Link></MenuItem>
                </Menu>
              </div>
            }

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
