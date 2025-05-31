"use client"

import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarRail } 
from "@/components/ui/sidebar"
import { 
  AudioWaveform, 
  BadgeDollarSign, 
  Banknote, 
  BookText, 
  Building2, 
  Calendar, 
  Command, 
  FileSpreadsheet, 
  GalleryVerticalEnd, 
  Home, 
  Inbox, 
  LayoutDashboard, 
  Search, 
  Settings, 
  Users, 
  Wallet } 
from "lucide-react"
import NavHeader from "./nav-header"
import NavUser from "./nav-user"
import { NavMain } from "./nav-main"
import { useUserStore } from "@/stores/user-store"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  principal: [
    {
      name: "Dashboard",
      url: "/dashboard/",
      icon: LayoutDashboard,
    },
    {
      name: "Usuarios",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Cuentas",
      url: "#",
      icon: Wallet,
    },
  ],
  projects: [
    {
      name: "Asientos",
      url: "#",
      icon: Banknote,
    },
    {
      name: "Libros",
      url: "#",
      icon: BookText,
    },
  ],
  sueldos: [
    {
      name: "Empleados",
      url: "#",
      icon: Building2
    },
    {
      name: "Recibos",
      url: "#",
      icon: FileSpreadsheet
    }
  ]
}

export function AppSidebar() {
  const { user } = useUserStore();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.principal} title="Menú Principal" />
        <NavMain items={data.projects} title="Contabilidad" />
        <NavMain items={data.sueldos} title="Liquidación de sueldos" />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}