// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import socket from '../../libs/socket'
import random from '../../libs/random'

// Components
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CardsPredictionSelector from '../CardsPredictionSelector'
import Card from '../Card'
import PlayersTable from '../PlayersTable'

// Variables
const styles = theme => ({
  centered: {
    textAlign: 'center'
  },
  cardCentered: {
    position: 'absolute'
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
        handleClick={() => this.useCard(cardName)}
        available={this.getRound().decisionId === socket.id} />)
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

  getTimeToPlay () {
    if (this.getRound().decisionId === socket.id) {
      return (
        <div style={{textAlign: 'center'}}>
          <Typography>É a sua vez de jogar...</Typography>
        </div>
      )
    } else {
      return (
        <div style={{textAlign: 'center'}}>
          <Typography>É a vez do jogador {this.getPlayer(this.getRound().decisionId).name}</Typography>
        </div>
      )
    }
  }

  useCard (card) {
    // Check if this is player's time
    if (this.getRound().decisionId !== socket.id || !this.everybodyHavePredicted()) {
      return null
    }

    socket.emit('useCard', card)
  }

  getDuelCards () {
    const round = this.getRound()
    const duelCards = round.duels[round.actualDuelIndex].cards.map((duelCards) => duelCards.card)
    let cards = []
    cards = cards.concat([this.getRound().pivot], duelCards)

    return cards.map((card, index) => {
      return (
        <Card
          key={card + index}
          className={this.props.classes.cardCentered}
          name={card}
          style={{transform: `rotate(${random.number(0, 360)}deg)`, position: 'absolute'}}
          available={true} />
      )
    })
  }

  ifMyDecision (component) {
    if (this.getRound().decisionId === socket.id) return component
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

    if (this.getRound().finished) {
      return (
        <div>
          <Typography>{this.props.data.players.length} jogador(es) conectados...</Typography>
          <Typography variant='display1' className={this.props.classes.centered}>Resultados</Typography>
          <PlayersTable data={this.props.data.players} />
          <br />
          {this.ifMyDecision(<Button variant='raised' color='primary' onClick={() => socket.emit('createRound')}>Próximo round</Button>)}
        </div>
      )
    }

    return (
      <div>
        <Typography>{this.props.data.players.length} jogador(es) conectados...</Typography>
        <Typography variant='display1' className={this.props.classes.centered}>Round {this.props.data.rounds.length}</Typography>
        <br/><br/>
        <div style={{textAlign: 'center', position: 'relative', height: '200px'}}>
          {this.getDuelCards()}
        </div>
        <br/><br/>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ position: 'relative', textAlign: 'center' }}>
            {this.listMyCards()}
          </Grid>
        </Grid>
        <br/><br/>
        {this.getTimeToPlay()}
        <br/><br/>

        {this.predictionTime()}

      </div>
    )
  }
}

export default withStyles(styles)(Game)
