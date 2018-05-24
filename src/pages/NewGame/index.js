// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'

// Components
import Button from '@material-ui/core/Button'


// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
  }
})

const Header = ({ classes }) => (
  <div className={classes.component}>
    Essa é a página de criação da partida.
  </div>
)

export default withStyles(styles)(Header)