
import React from 'react'
import PersonalForm from './ui/personal-form'

export const metadata = {
  title: "Configuración - Información Personal",
  description: "Configuración de usuario - Información personal",
}

export default function ConfigPersonalPage() {
  return (
    <div>
      <PersonalForm />
    </div>
  )
}