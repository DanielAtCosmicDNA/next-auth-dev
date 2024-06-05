'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { SessionProvider } from 'next-auth/react'

const AuthContext = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

AuthContext.propTypes = {
  children: PropTypes.any
}

export default AuthContext
