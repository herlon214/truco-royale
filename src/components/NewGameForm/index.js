// This component is a boilerplate to create others

// Libs
import React, {Component} from 'react'
import { withStyles } from '@material-ui/core'

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
  constructor(props) {
    super(props);
    this.state = {nickname: ''};
  }

  onSubmit(history){
    this.props.onSubmit(history);
  }

  render() {
    const {history} = this.props.history; 
    const form =
    <div>
      <FormControl>
        <Grid container alignItems="flex-end" spacing={8}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField label='Insira seu apelido' ref="nickname" />
          </Grid>
        </Grid>
      </FormControl>
      <div style={ {marginTop: '10px'}}>
        <Button variant='raised' color='primary' onClick={this.onSubmit(history)}>Criar</Button>
      </div>
      
    </div>
      

      
      return form;
  }
}

export default withStyles(styles)(NewGameForm)

