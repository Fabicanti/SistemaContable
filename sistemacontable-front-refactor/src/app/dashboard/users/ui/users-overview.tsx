"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useUserStore } from '@/stores/user-store';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import UserCreate from './dialog/user-create';
import { formatDateToSpanish } from '@/lib/utils';


export default function UsersOverview() {
  const { user } = useUserStore();
  const [createUser, setCreateUser] = useState<boolean>(false);

  return (
    <div>

      <Card className="mb-6">
        <CardHeader className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.roleId === 2 ? '/avatar/admin.svg' : '/avatar/user.png'}  alt="Foto de perfil" />
              <AvatarFallback>{(user?.nombre + " " + user?.apellido).split(" ").map((item) => (item[0]?.toUpperCase())).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Empresa: SSAA II</CardTitle>
              <CardDescription>Cliente desde: {formatDateToSpanish(new Date())}</CardDescription>
            </div>
          </div>

          {user?.roleId === 2 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type='button' variant="outline" onClick={() => setCreateUser(true)}><Plus /> Usuario</Button>
              </TooltipTrigger>
              <TooltipContent side='left' sideOffset={5}>
                <p>Agregar un nuevo usuario</p>
              </TooltipContent>
            </Tooltip>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div>
            <strong>Contacto:</strong> {user?.nombre} {user?.apellido}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
        </CardContent>
      </Card>
      {createUser &&
        <UserCreate
          open={createUser}
          onClose={() => setCreateUser(false)}
        />
      }
    </div>
  )
}