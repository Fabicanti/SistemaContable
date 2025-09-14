"use client";

import { Copy, Settings2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import { DataTable } from '@/components/table/data-table';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useUsersAll } from '@/hooks/use-users';
import { Separator } from '@radix-ui/react-separator';

import { usersColumns } from '../table/users-columns';
import { copyToClipboard } from '@/lib/utils';
import UserUpdate from './dialog/user-update';
import { useUserStore } from '@/stores/user-store';
import UserDelete from './dialog/user-delete';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/interfaces/user-interface';
import SkeletonDataTable from '@/components/skeleton/table-skeleton';

export default function UsersTable() {
  const { user: myUser } = useUserStore();
  const { dataUsers, loadingUsers } = useUsersAll();

  // Acciones para actualizar y eliminar usuarios
  const [updateUser, setUpdateUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const actions = (user: User) => {
    return (
      <div>
        <DropdownMenuItem onClick={() => copyToClipboard(String(user.id))}>
          <Copy /> Copiar ID
        </DropdownMenuItem>
        {myUser?.roleId === 2 && (<>
          <DropdownMenuItem onClick={() => setUpdateUser(user)}>
            <Settings2 /> Editar usuario
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => setDeleteUser(user)} variant="destructive">
            <Trash2 /> Eliminar usuario
          </DropdownMenuItem>
        </>)}
      </div>
    )
  }

  return (
    <div>
      <Card className="mb-6">
        <CardHeader className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Gestión de usuarios</CardTitle>
          <CardDescription>Tabla con información y acciones para cada usuarios.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          {loadingUsers ? (
            <SkeletonDataTable />
          ) : (
            <DataTable
              columns={usersColumns}
              data={dataUsers.filter((user) => user.id !== myUser?.id)}
              filterableColumns={['nombre', 'apellido', 'email']}
              actions={actions}
            />
          )}
        </CardContent>
      </Card>

      {updateUser &&
        <UserUpdate
          user={updateUser}
          onClose={() => setUpdateUser(null)}
        />
      }
      {deleteUser &&
        <UserDelete
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
        />
      }
    </div>
  )
}