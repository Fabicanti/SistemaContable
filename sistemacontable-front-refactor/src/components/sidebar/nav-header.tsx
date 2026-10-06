"use client"

import Image from "next/image"
import Link from "next/link"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"

export default function NavHeader() {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg" tooltip="Sistema Contable" className="gap-3 rounded-lg group-data-[collapsible=icon]:justify-center">
          <Link href="/dashboard" aria-label="Sistema Contable, inicio" onClick={() => setOpenMobile(false)}>
            <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
            <div className="grid min-w-0 gap-0.5 group-data-[collapsible=icon]:hidden">
              <span className="truncate text-sm font-semibold tracking-tight">Sistema Contable</span>
              <span className="text-xs text-muted-foreground">Tu espacio de gestión</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
