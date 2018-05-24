// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Link } from "react-router-dom";


// Components
import Button from '@material-ui/core/Button'


// Variables
const styles = theme => ({
  component: {
    textAlign: 'center'
  }
})

const Header = ({ classes }) => (
  <div className={classes.component}>
    Olá mundo!  <br/><br/>

    Vamos jogar? <br/><br/>
    <Link to="new">
      <Button variant="raised" color="primary">Nova partida</Button>
    </Link>
    <br/><br/>
    <Link to="match">
      <Button variant="raised">Partida existente</Button>
    </Link>
  </div>
)

export default withStyles(styles)(Header)