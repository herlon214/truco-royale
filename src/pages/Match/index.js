// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Link } from "react-router-dom";


// Components
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'



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
      matchId: ""
    }
  }

  render () {
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

          <Button variant="raised" color="primary">Encontrar partida</Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(Page)