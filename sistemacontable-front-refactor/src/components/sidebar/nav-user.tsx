
import React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'
import { ChevronsUpDown, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { User } from '@/interfaces/user-interface'
import useAuth from '@/hooks/use-auth'
import Link from 'next/link'

export default function NavUser({ user }: { user: User }) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { onLogout } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label={`Menú de usuario: ${user.nombre}`}
              tooltip={user.nombre}
              className="rounded-xl data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.roleId === 2 ? '/avatar/admin.svg' : '/avatar/user.png'} alt={user.nombre} />
                <AvatarFallback className="rounded-lg">{(user.nombre + " " + user.apellido).split(" ").map((item) => (item[0]?.toUpperCase())).join('')}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 gap-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user.nombre}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <ChevronsUpDown aria-hidden="true" className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="dark sidebar-dark w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.roleId === 2 ? '/avatar/admin.svg' : '/avatar/user.png'} alt={user.nombre} />
                  <AvatarFallback className="rounded-lg">{(user.nombre + " " + user.apellido).split(" ").map((item) => (item[0])).join('')}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.nombre}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={'/dashboard/configuration'} onClick={() => setOpenMobile(false)} className="flex items-center gap-2">
                  <Settings aria-hidden="true" />
                  Configuración

                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout} variant="destructive">
                <LogOut aria-hidden="true" />
                <p className="text-destructive">Cerrar sesión</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
