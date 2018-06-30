import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import NavButton from '../Buttons/NavButton'

// import BgImage from '../../assets/images/starsky_018.png'

import { navMessages } from '../../i18n/FMessages'

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
              variant="flat"
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
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  },
  // appBar: {
  // * moved to index.css, so that webpack would not
  // * load the same background picture twice
  //
  //   background:
  //     url(${BgImage}),
  //     linear-gradient(
  //     90deg,
  //     hsla(220, 25%, 50%, 0),
  //     hsla(220, 25%, 77%, 0.85) 35%,
  //     hsla(220, 25%, 77%, 1) 50%,
  //     hsla(220, 25%, 77%, 0.85) 65%,
  //     hsla(220, 25%, 50%, 0)
  //   ),
  //   hsla(220, 20%, 45%, 1),
  //   padding: 5,
  // },
  toolBar: {
    justifyContent: 'center',
    background: 'transparent',
    padding: 0,
    minHeight: '1em'
  }
})

export default withStyles(styles)(MenuTop)