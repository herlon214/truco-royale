// This component is a boilerplate to create others

// Libs
import React, {Component} from 'react'
import { withStyles } from '@material-ui/core'
import store from '../../libs/store'

// Components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'

// Variables
const styles = theme => ({
  button: {
    margin: '10px',
    padding: theme.spacing.unit * 2
  }
})

class NewGameForm extends Component {
  constructor (props) {
    super(props)
    this.state = {nickname: store.player.name}

    this.onSubmit      = this.onSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  onSubmit () {
    this.props.onSubmit(this.props.history)
  }

  onValueChange (evt) {
    // Persist data
    store.player.name = evt.target.value
    this.setState({ nickname: evt.target.value })
  }

  render () {
    const form =
    <div>
      <FormControl>
        <Grid container alignItems="flex-end" spacing={8}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField label='Insira seu apelido'
              value={this.state.nickname}
              onChange={this.onValueChange}/>
          </Grid>
        </Grid>
      </FormControl>
      <div style={{marginTop: '10px'}}>
        <Button variant='raised' color='primary' 
          onClick={() => this.onSubmit(this.state.nickname)}>Criar</Button>
      </div>
    </div>

    return form
  }
}

export default withStyles(styles)(NewGameForm)
