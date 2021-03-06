// Libs
import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import socket from './libs/socket'

// Components
import Header from './components/Header'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'

// Pages
import NewGamePage from './pages/NewGame'
import IndexPage from './pages/Index'
import MatchPage from './pages/Match'

// Resources
import backgroundURI from '../assets/background.jpg'
import green from '@material-ui/core/colors/green'

// Variables
const theme = createMuiTheme({
  palette: {
    primary: Object.assign({}, green, { contrastText: '#fff' })
  }
})
const styles = theme => ({
  app: {
    background: `url(${backgroundURI}) repeat`,
    height: '100%'
  },
  paper: {
    margin: `30px 10px`,
    padding: '10px'
  }
})

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      game: null,
      message: '',
      messageOpen: false
    }
  }

  componentDidMount () {
    // Handle socket events
    socket.on('error', (message) => {
      this.setState({
        message,
        messageOpen: true
      })
    })

    socket.on('message', (message) => {
      this.setState({
        message,
        messageOpen: true
      })
    })
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="app" className={this.props.classes.app}>
            <Header />

            <Paper className={this.props.classes.paper} elevation={4}>
              <Route exact path="/" component={IndexPage} />
              <Route path="/new" component={NewGamePage} />
              <Route exact path="/match" component={MatchPage} />
              <Route path="/match/:id" component={MatchPage} />
            </Paper>

            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={this.state.messageOpen}
              onClose={() => this.setState({ messageOpen: false })}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{this.state.message}</span>}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
