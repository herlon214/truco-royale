// Libs
import React from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'

// Components
import NewGameForm from '/components/NewGameForm';
import Grid from '@material-ui/core/Grid'

// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
  },
  form: {
    justifyContent: 'center',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  
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
      <Grid container justify='center'>
        <Grid item xs={12} md={6}>
          <Grid container className={props.classes.form}>
            <NewGameForm onSubmit={createNewGame} history={props.history} />
          </Grid>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default withStyles(styles)(Page)
