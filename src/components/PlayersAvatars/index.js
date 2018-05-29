// Libs
import React from 'react'
import { withStyles } from '@material-ui/core'

// Components
import PlayerAvatar from '../PlayerAvatar'

// Variables
const styles = theme => ({

  row: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Component = ({ featured, predicts, players, classes }) => {
  console.log(featured)
  return (
    <div className={classes.row}>
      {
        players.map((player) => (
          <PlayerAvatar
            player={player}
            predicts={predicts}
            style={{
              opacity: player.playerId === featured || !featured ? 1.0 : 0.3
            }} />
        ))
      }
    </div>
  )
}

export default withStyles(styles)(Component)
