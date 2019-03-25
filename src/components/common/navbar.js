import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { deleteToken, decodeToken, isAuthenticated } from '../../lib/common'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}


class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { classes } = this.props
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
                <Button color="inherit">Login</Button>
                <Button color="inherit">Sign Up</Button>
              </div>
              :
              <Button color="inherit">{decodeToken().username}</Button>
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
