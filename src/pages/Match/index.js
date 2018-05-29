// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'
import store from '../../libs/store'

// Components
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Game from '../../components/Game'
import SadFace from '@material-ui/icons/SentimentVeryDissatisfied'

// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

const Page = class Page extends Component {
  constructor (props) {
    super(props)

    this.state = {
      matchId: props.match.params.id || '',
      gameData: null
    }
  }

  componentDidMount () {
    if (this.props.match.params.id) {
      // Disconnect from previous game
      if (store.matchId && store.matchId !== this.state.matchId) {
        socket.emit('leave', store.matchId)
      }

      // Connect to the new game
      if (!store.matchId || store.matchId !== this.state.matchId) {
        socket.emit('joinGame', { gameId: this.state.matchId, player: store.player })
        store.matchId = this.state.matchId
      }
    }

    socket.on('refreshGame', (data) => {
      console.log(JSON.stringify(data))
      this.setState({ gameData: data })
    })
  }

  componentWillUnmount () {
    socket.emit('leave', this.state.matchId)
  }

  render () {
    if (!this.props.match.params.id) {
      return (
        <div className={this.props.classes.component}>
          <Typography variant='display1'>Buscar Partida</Typography>
          <form noValidate autoComplete='off'>
            <TextField
              id='match_id'
              label='ID da partida'
              className={this.props.classes.textField}
              value={this.state.matchId}
              onChange={(evt) => this.setState({ matchId: evt.target.value })}
              margin='normal'
            />

            <br /><br />

            <Button
              variant='raised'
              color='primary'
              onClick={() => this.props.history.push('/match/' + this.state.matchId)}>Encontrar partida</Button>
          </form>
        </div>
      )
    }

    if (this.state.matchId !== '' && this.state.gameData === null) {
      return (
        <Grid container justify='center'>
          <CircularProgress className={this.props.classes.progress} />
        </Grid>
      )
    }

    return (<Game data={this.state.gameData} />)
  }
}

export default withStyles(styles)(Page)
