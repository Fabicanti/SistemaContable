"use client"

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { GradientIcon } from "../shared/gradient-icon"

export function NavMain({
  items,
  title
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[],
  title: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <a href={item.url}>
                <GradientIcon Icon={item.icon} fromColorHex="f6339a" toColorHex="ff6900" size={24}/>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}