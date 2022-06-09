import React from 'react'
import Navbar from '../Navbar/Navbar'
// import Landing from '../Landing/Landing'

//import classes from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
        <Navbar />
        <div>{children}</div>
    </>
  )
}

export default Layout