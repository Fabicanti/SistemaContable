"use client"

import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarRail } 
from "@/components/ui/sidebar"
import {
  BookText, 
  Building2,
  FileSpreadsheet,
  LayoutDashboard,
  NotebookPen,
  Users, 
  Wallet } 
from "lucide-react"
import NavHeader from "./nav-header"
import NavUser from "./nav-user"
import { NavMain } from "./nav-main"
import { useUserStore } from "@/stores/user-store"

const data = {
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
      url: "/dashboard/accounts",
      icon: Wallet,
    },
  ],
  projects: [
    {
      name: "Asientos",
      url: "/dashboard/journal-entries",
      icon: NotebookPen,
    },
    {
      name: "Libros",
      url: "/dashboard/books",
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