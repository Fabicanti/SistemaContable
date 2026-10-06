"use client"

import { type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { isNavigationActive, navigationButtonClass, navigationLabelClass } from "./navigation-styles"

export function NavMain({ items, title }: {
  items: { name: string; url: string; icon: LucideIcon }[]
  title: string
}) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={navigationLabelClass}>{title}</SidebarGroupLabel>
      <SidebarMenu className="gap-1.5">
        {items.map((item) => {
          const isActive = isNavigationActive(pathname, item.url)
          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild tooltip={item.name} isActive={isActive} className={navigationButtonClass}>
                <Link href={item.url} aria-current={isActive ? "page" : undefined} onClick={() => setOpenMobile(false)}>
                  <item.icon aria-hidden="true" strokeWidth={1.7} />
                  <span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
