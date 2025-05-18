
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { BadgeDollarSign } from 'lucide-react'

export default function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <a href="#">
            <BadgeDollarSign className="h-5 w-5" />
            <span className="text-lg font-semibold bg-gradient-to-tr from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Sistema contable</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}