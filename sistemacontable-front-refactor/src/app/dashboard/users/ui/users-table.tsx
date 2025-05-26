"use client";

import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { usersColumns } from '../columns/users-columns'
import { useUsersAll } from '@/hooks/use-users'

export default function UsersTable() {

  const { dataUsers, loadingUsers } = useUsersAll()

  return (
    <div className="p-2">
      <DataTable
        columns={usersColumns}
        data={dataUsers}
        filterableColumns={['nombre', 'apellido', 'email', 'username']}
      />
    </div>
  )
}