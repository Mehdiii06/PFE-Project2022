import React from 'react'
import './PText.scss'

const PText = ({children}) => {
  return (
    <div className='Text'>
        <p>{children}</p>
    </div>
  )
}

export default PText