// Libs
import React from 'react'
import { withStyles } from '@material-ui/core'

// Components
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

// Variables
const styles = theme => ({
  avatar: {
    margin: 10
  }
})

const Component = ({ classes, style, player }) => (
  <Tooltip id='tooltip-top' title={player.name} placement='top'>
    <Avatar className={ classes.avatar } style={style}>{player.name[0]}</Avatar>
  </Tooltip>
)

export default withStyles(styles)(Component)
