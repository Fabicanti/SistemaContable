"use client"



import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { GradientIcon } from "../shared/gradient-icon"
import { usePathname } from "next/navigation"
import { ChevronRight, LucideIcon } from "lucide-react"

export function NavCollapse({
  items,
  title,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      iconItem: LucideIcon
      url: string
    }[]
  }[],
  title: string,
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
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
                        <span>{item.title}</span>
                      </div>
                      {isActive && <div
                        className="ml-2 size-3.5 rounded-full bg-gradient-to-br from-[#f6339a] to-[#ff6900]"
                      />}
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </a>

                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <subItem.iconItem />
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>)
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
