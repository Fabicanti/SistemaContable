"use client"

import { type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import {
    SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar';

import { GradientIcon } from '../shared/gradient-icon';

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
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                className="justify-between"
              >
                <a
                  href={item.url}
                  className={isActive ? "text-foreground font-semibold" : ""}
                >
                  <div className="flex items-center gap-2">
                    <GradientIcon
                      Icon={item.icon}
                      fromColorHex="f6339a"
                      toColorHex="ff6900"
                      size={20}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <div
                    className="ml-2 size-3.5 rounded-full bg-gradient-to-br from-[#f6339a] to-[#ff6900]"
                  />}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}