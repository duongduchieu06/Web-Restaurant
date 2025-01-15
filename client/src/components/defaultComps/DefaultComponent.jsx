import React from 'react'
import Header from '../headerCopms/header'
import Footer from '../footerComps/footer'

const DefaultComponent = ({children}) => {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default DefaultComponent