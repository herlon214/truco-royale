// Libs
import React from 'react'
import convertCardName from '../../libs/convertCardName'

// Resources
import images from '../../../assets/cards/*'

const Component = ({ name, available }) => {
  const opacity = available ? 1.0 : 0.5
  return (<img src={images[convertCardName(name) + '.png']} style={{ height: '150px', opacity }}/>)
}

export default Component
