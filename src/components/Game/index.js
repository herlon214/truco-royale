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

    return me.cards.map((cardName) => <Card key={cardName} name={cardName} available={this.iHavePredicted() || this.everybodyHavePredicted()} />)
  }

  getRound () {
    return this.props.data.rounds[this.props.data.actualRoundIndex]
  }

  // Return true if the player has predicted the round
  iHavePredicted () {
    return this.getRound().predicts.filter((predict) => predict.playerId === socket.id).length > 0
  }

  // Return true if everybody has predicted the round
  everybodyHavePredicted () {
    const predicts = this.getRound().predicts.filter((predict) => predict.playerId === socket.id).length
    return predicts === this.getRound().players.length
  }

  // Show prediction selectors
  predictionTime () {
    // Check if the player hasn't predicted yet
    if (this.iHavePredicted()) {
      return null
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

  render () {
    if (this.props.data === null) return <Typography variant='display1' className={this.props.classes.centered}>Jogo não encontrado...</Typography>

    if (!this.props.data.started) {
      return (
        <div>
          <Typography>{this.props.data.players.length} jogador(es) conectados...</Typography>
          <br /><br/>
          <Button variant='raised' onClick={() => socket.emit('startGame', this.props.data.id)}>Começar</Button>
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
