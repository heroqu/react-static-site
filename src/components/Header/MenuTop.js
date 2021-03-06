import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import NavButton from '../buttons/NavButton'

import navMessages from '../../Intl/navMessages'

const Spacer = props => {
  const { width } = props
  const style = {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: width || 'auto'
  }
  return <div style={style}> </div>
}

const MenuTop = props => {
  const { classes } = props
  return (
    <AppBar color="default" className="AppBar">
      <Toolbar color="inherit" className={classes.toolBar}>
        <Fragment>
          {Object.keys(navMessages).map((key, idx) => (
            <NavButton
              key={`ButtonNumber_${idx}`}
              size="small"
              color="inherit"
              className={classes.button}
              to={`/${key}`}
            >
              {navMessages[key]}
            </NavButton>
          ))}
          <Spacer width={110} />
        </Fragment>
      </Toolbar>
    </AppBar>
  )
}

const styles = theme => ({
  button: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  // appBar: {
  // ...
  // - moved to src/Theme/index.css, so that webpack would not
  //   load the same background picture twice
  // },
  toolBar: {
    justifyContent: 'center',
    background: 'transparent',
    padding: 0,
    minHeight: '1rem'
  }
})

export default withStyles(styles)(MenuTop)
