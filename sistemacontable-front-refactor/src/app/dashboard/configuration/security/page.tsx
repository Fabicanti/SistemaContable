import React from 'react'
import SecurityPassword from './ui/security-password'

export const metadata = {
  title: "Configuración - Seguridad del usuario",
  description: "Configuración de usuario - Seguridad",
}

export default function SecurityUserConfiguration() {
  return (
    <div>
      <SecurityPassword />
    </div>
  )
}