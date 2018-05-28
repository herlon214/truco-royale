// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'

// Components
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CardsPredictionSelector from '../CardsPredictionSelector'
import Card from '../Card'

// Variables
const styles = theme => ({
  centered: {
    textAlign: 'center'
  }
})

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      predictNumber: 0
    }
  }

  listMyCards () {
    const round = this.getRound()

    const me = round.players.filter((player) => player.playerId === socket.id)[0]

    return me.cards.map((cardName) => {
      return (<Card key={cardName}
        name={cardName}
        available={this.getRound().decisionId === socket.id || this.everybodyHavePredicted()} />)
    })
  }

  getRound () {
    return this.props.data.rounds[this.props.data.actualRoundIndex]
  }

  // Return true if everybody has predicted the round
  everybodyHavePredicted () {
    const predicts = this.getRound().predicts.length
    return predicts === this.getRound().players.length
  }

  getPlayer (id) {
    return this.getRound().players.filter((player) => player.playerId === id)[0]
  }

  // Show prediction selectors
  predictionTime () {
    const round = this.getRound()

    if (this.everybodyHavePredicted()) return

    // Check if the player hasn't predicted yet
    if (round.decisionId !== socket.id) {
      return <div style={{textAlign: 'center'}}>
        <Typography>É a vez do jogador {this.getPlayer(round.decisionId).name}</Typography>
      </div>
    }

    return (
      <div>
        <CardsPredictionSelector
          predictNumber={this.state.predictNumber}
          maxNumber={this.props.data.rounds.length}
          handleChange={(evt) => this.setState({ predictNumber: evt.target.value })} />

        <br/><br/><br/>

        <Button variant='raised' color='primary' onClick={() => socket.emit('predict', this.state.predictNumber)}>Confirmar</Button>
      </div>
    )
  }

  // Match waiting to start
  startMessage () {
    if (this.props.data.players[0].playerId === socket.id) {
      return (
        <div style={{textAlign: 'center'}}>
          <Typography variant='display2'>{this.props.data.id}</Typography>
          <br/><br/>
          <Button variant='raised' onClick={() => socket.emit('startGame', this.props.data.id)}>Começar</Button>
        </div>
      )
    } else {
      return <Typography>Aguardando o líder iniciar a partida...</Typography>
    }
  }

  render () {
    if (this.props.data === null) return <Typography variant='display1' className={this.props.classes.centered}>Jogo não encontrado...</Typography>

    if (!this.props.data.started) {
      return (
        <div>
          <Typography>{this.props.data.players.length} jogador(es) conectados...</Typography>
          <br /><br/>
          {this.startMessage()}
        </div>
      )
    }

    return (
      <div>
        <Typography>{this.props.data.players.length} jogador(es) conectados...</Typography>
        <Typography variant='display1' className={this.props.classes.centered}>Round {this.props.data.rounds.length}</Typography>
        <br/><br/>
        <div style={{textAlign: 'center'}}>
          <Card name={this.getRound().pivot} available={true} />
        </div>
        <br/><br/>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.listMyCards()}
          </Grid>
        </Grid>
        <br/><br/>

        {this.predictionTime()}

      </div>
    )
  }
}

export default withStyles(styles)(Game)
