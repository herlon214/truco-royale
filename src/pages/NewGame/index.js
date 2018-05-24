// Libs
import React from 'react'
import { withStyles } from '@material-ui/core'

// Components
import Button from '@material-ui/core/Button'


// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
  }
})

const Page = ({ classes }) => (
  <div className={classes.component}>
    Essa é a página de criação da partida.
  </div>
)

export default withStyles(styles)(Page)