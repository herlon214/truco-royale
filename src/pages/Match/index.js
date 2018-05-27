// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'


// Components
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Game from '../../components/Game'


// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
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
    socket.emit('getGame', this.state.matchId)
    socket.on('refreshGame', (data) => this.setState({ gameData: data }))
  }

  render () {
    console.log(this.state)
    if (this.state.matchId === '') {
      return (
        <div className={this.props.classes.component}>
          <Typography variant="display1">Buscar Partida</Typography>
          <form noValidate autoComplete="off">
            <TextField
              id="match_id"
              label="ID da partida"
              className={this.props.classes.textField}
              value={this.state.matchId}
              onChange={(evt) => this.setState({ matchId: evt.target.value })}
              margin="normal"
            />

            <br /><br />

            <Button variant="raised" color="primary">Encontrar partida</Button>
          </form>
        </div>
      )
    } else {
      return (<Game data={this.state.gameData} />)
    }
  }
}

export default withStyles(styles)(Page)
