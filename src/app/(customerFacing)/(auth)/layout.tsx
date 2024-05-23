import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className='w-full relative'>
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className='h-screen flex items-center justify-center'>
           {children} 
        </div>
        
    </section>
  )
}

export default AuthLayout