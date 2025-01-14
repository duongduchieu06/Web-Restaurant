import React, { Children } from 'react'
import Header from '../headerCopms/header'

const DefaultComponent = ({children}) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default DefaultComponent