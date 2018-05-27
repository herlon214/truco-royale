// Libs
import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import socket from './libs/socket'

// Components
import Header from './components/Header'
import Paper from '@material-ui/core/Paper'

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
    primary: green
  }
})
const styles = theme => ({
  app: {
    background: `url(${backgroundURI}) repeat`,
    height: '100%'
  },
  paper: {
    margin: `30px 10px`,
    padding: '10px',
    height: '70%'
  }
})

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      game: null,
      socket: socket
    }
  }

  componentDidMount () {
    // Connect to the socketio
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
              <Route path="/match/:id" component={MatchPage} />
            </Paper>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
