import React from 'react'
import './ContactInfoItem.scss'

import { MdPlace } from 'react-icons/md'
import PText from './PText'

const ContactInfoItem = ({
    icon = <MdPlace />,
    text = 'this is an info',
}) => {

    
  return (
    <div className='Item'>
        <div className='icon'>{icon}</div>
        <div className='info'>
            <PText>{text}</PText>
        </div>
    </div>
  )
}

export default ContactInfoItem