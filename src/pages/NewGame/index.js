// Libs
import React from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'

// Components
import Button from '@material-ui/core/Button'

// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
  }
})

const createNewGame = (history) => () => {
  socket.emit('newGame', null, (id) => {
    history.push('/match/' + id)
  })
}

const Page = (props) => {
  return (
    <div className={props.classes.component}>
      Essa é a página de criação da partida. <br/><br/>

      <Button variant="raised" color="primary" onClick={createNewGame(props.history)}>Criar</Button>
    </div>
  )
}

export default withStyles(styles)(Page)
