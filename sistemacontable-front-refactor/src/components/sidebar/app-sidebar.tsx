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
  LayoutDashboard,
  NotebookPen,
  Plus,
  ScanSearch,
  Users, 
  Wallet } 
from "lucide-react"
import NavHeader from "./nav-header"
import NavUser from "./nav-user"
import { NavMain } from "./nav-main"
import { useUserStore } from "@/stores/user-store"
import { NavCollapse } from "./nav-collapse"

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
      title: "Empleados",
      url: "#",
      icon: Building2,
      isActive: true,
      items: [
        {
          title: "Crear",
          iconItem: Plus,
          url: "/dashboard/employees/create",
        },
        {
          title: "Ver empleados",
          url: "#",
          iconItem: ScanSearch,
        },
      ],
    },
    // {
    //   name: "Recibos",
    //   url: "#",
    //   icon: FileSpreadsheet
    // }
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
        <NavCollapse items={data.sueldos} title="Liquidación de sueldos" />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}