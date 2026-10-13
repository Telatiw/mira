import React, { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex justify-center items-center bg-primary/10 px-4'>
      {children}
    </div>
  )
}

export default AuthLayout
