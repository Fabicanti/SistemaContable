
import Image from 'next/image'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
// import LogoCompany from '../logo-company'

export default function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <a href="#">
            <Image
              src="/favicon.svg"
              alt="Logo del sistema"
              width={20}
              height={20}
            />
            <span className="text-lg font-semibold bg-gradient-to-tr from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Sistema contable</span>
          </a>
          {/* <LogoCompany name='Sistema Contable' url="/dashboard" size={20} /> */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}