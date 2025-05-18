
import React from 'react'
import RegisterView from './ui/register-view'
import RegisterForm from './ui/register-form'

export default function RegisterPage() {
  return (
    <div className='w-full min-h-screen flex bg-theme-gradient'>
      <RegisterView />
      <RegisterForm />
    </div>
  )
}