// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'

// Components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// Variables
const styles = theme => ({
  notFound: {
    textAlign: 'center'
  }
})

const Game = ({ data, classes }) => {
  if (data === null) return <Typography variant='display1' className={classes.notFound}>Jogo não encontrado...</Typography>

  if (!data.started) return (
    <div>
      <Typography>{data.players.length} jogadores conectados...</Typography>
      <br /><br/>
      <Button variant='raised'>Começar</Button>
    </div>
  )
}

export default withStyles(styles)(Game)
