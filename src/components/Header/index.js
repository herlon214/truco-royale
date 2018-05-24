// Libs
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Link } from "react-router-dom";

// Components
import Typography from '@material-ui/core/Typography'

// Variables
const styles = theme => ({
  header: {
    background: '#020202',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '20px 5px',
    boxShadow: '#1f1f1f 0px 5px 20px'
  }
})

const Header = ({ classes }) => (
  <header>
    <Link to="/">
      <Typography variant="display2" className={classes.header}>TRUCO ROYALE</Typography>    
    </Link>
  </header>
)

export default withStyles(styles)(Header)