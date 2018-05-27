// Libs
import React from 'react'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {}
})

const Selector = ({ predictNumber, maxNumber, handleChange, classes }) => {
  return (
    <div>
      <Typography variant='subheading'>Quantas você ganha?</Typography>
      <Select
        native
        value={predictNumber}
        onChange={handleChange}
      >
        <option value={0}>Nenhuma</option>
        {[...new Array(maxNumber)].map((item, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
      </Select>
    </div>
  )
}

export default withStyles(styles)(Selector)
