"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useUserStore } from '@/stores/user-store';
import React from 'react'
import { formatDateToSpanish } from '@/lib/utils';


export default function UsersOverview() {
  const { user } = useUserStore();

  return (
    <div>

      <Card className="mb-6 gap-3 py-5">
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


        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
          <div>
            <strong>Contacto:</strong> {user?.nombre} {user?.apellido}
          </div>
          <div>
            <strong>Correo:</strong> {user?.email}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}