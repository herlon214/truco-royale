// Libs
import React from 'react'
import { withStyles } from '@material-ui/core'

// Components
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// Variables
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
})

const Component = ({ classes, data }) => (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <TableCell>Jogador</TableCell>
        <TableCell numeric>Vidas</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(player => {
        return (
          <TableRow key={player.playerId}>
            <TableCell component="th" scope="row">
              {player.name}
            </TableCell>
            <TableCell numeric>{player.lifes}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  </Table>
)

export default withStyles(styles)(Component)
