// Libs
import React from 'react'
import convertCardName from '../../libs/convertCardName'

// Resources
import images from '../../../assets/cards/*'

const Component = ({ name, available, className, style, handleClick }) => {
  const opacity = available ? 1.0 : 0.5
  style = Object.assign({}, style, { height: '150px', opacity, margin: '10px' })

  return (<img 
    className={className}
    onClick={handleClick}
    src={images[convertCardName(name) + '.png']}
    style={style}
  />)
}

export default Component
