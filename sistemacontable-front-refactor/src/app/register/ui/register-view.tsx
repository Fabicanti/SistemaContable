
import Image from 'next/image'
import React from 'react'

export default function RegisterView() {
  return (
    <div className='hidden relative lg:flex h-auto w-1/2 bg-muted dark:bg-gray-900 items-center justify-center'>
      <Image
        src={'/register/register-view.svg'}
        alt='Login view'
        width={600}
        height={600}
        priority
      />
    </div>
  )
}