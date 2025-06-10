
import React from 'react'
import AccountsTable from './ui/accounts-table'
import AccountsOverview from './ui/accounts-overview'

export const metadata = {
  title: "SSAA II - Cuentas",
  description: "Gestión de cuentas del sistema",
}

export default function AccountsPage() {
  return (
    <div className="p-6">
      <AccountsOverview />
      <AccountsTable />
    </div>
  )
}