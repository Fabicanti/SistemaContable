
import React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'
import { ChevronsUpDown, Settings, LogOut } from 'lucide-react'
import { GradientIcon } from '../shared/gradient-icon'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { User } from '@/interfaces/user-interface'
import useAuth from '@/hooks/use-auth'
import Link from 'next/link'

export default function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const { onLogout } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.roleId === 2 ? '/avatar/admin.svg' : '/avatar/user.png'} alt={user.nombre} />
                <AvatarFallback className="rounded-lg">{(user.nombre + " " + user.apellido).split(" ").map((item) => (item[0]?.toUpperCase())).join('')}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.nombre}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
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
              <DropdownMenuItem>
                <Link href={'/dashboard/configuration'} className="flex items-center gap-2">
                  <GradientIcon Icon={Settings} fromColorHex="f6339a" toColorHex="ff6900" size={24} />
                  Configuración

                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout}>
                <GradientIcon Icon={LogOut} fromColorHex="fb2c36 " toColorHex="fb2c36 " size={24} />
                <p className="text-destructive">Cerrar sesión</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}