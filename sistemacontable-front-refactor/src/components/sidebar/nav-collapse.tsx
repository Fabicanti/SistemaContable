"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { isNavigationActive, navigationButtonClass, navigationLabelClass, navigationSubButtonClass } from "./navigation-styles"

export function NavCollapse({ items, title }: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: { title: string; iconItem: LucideIcon; url: string }[]
  }[]
  title: string
}) {
  const pathname = usePathname()
  const { state, isMobile, setOpenMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={navigationLabelClass}>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.items?.some((child) => isNavigationActive(pathname, child.url)) ?? false
          if (state === "collapsed" && !isMobile) {
            return (
              <SidebarMenuItem key={item.title}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} aria-label={item.title} isActive={isActive} className={navigationButtonClass}>
                      <item.icon aria-hidden="true" strokeWidth={1.7} />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" sideOffset={12} className="dark sidebar-dark min-w-52 rounded-xl">
                    <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items?.map((child) => child.url === "#" ? (
                      <DropdownMenuItem key={child.title} disabled><child.iconItem />{child.title} · Próximamente</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem key={child.title} asChild>
                        <Link href={child.url} aria-current={isNavigationActive(pathname, child.url) ? "page" : undefined}>
                          <child.iconItem aria-hidden="true" />{child.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )
          }
          return (
            <Collapsible key={`${item.title}-${isActive}`} asChild defaultOpen={isActive || item.isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={isActive} className={navigationButtonClass}>
                    <item.icon aria-hidden="true" strokeWidth={1.7} />
                    <span>{item.title}</span>
                    <ChevronRight aria-hidden="true" className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mt-2 gap-1">
                    {item.items?.map((child) => (
                      <SidebarMenuSubItem key={child.title}>
                        {child.url === "#" ? (
                          <SidebarMenuSubButton aria-disabled="true" className="h-auto min-h-9 flex-wrap text-xs">
                            <child.iconItem aria-hidden="true" /><span>{child.title}</span>
                            <span className="pl-6 text-[10px]">Próximamente</span>
                          </SidebarMenuSubButton>
                        ) : (
                          <SidebarMenuSubButton asChild isActive={isNavigationActive(pathname, child.url)} className={navigationSubButtonClass}>
                            <Link href={child.url} aria-current={isNavigationActive(pathname, child.url) ? "page" : undefined} onClick={() => setOpenMobile(false)}>
                              <child.iconItem aria-hidden="true" /><span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
