
export const navigationStateClass = "text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-pink-400/10 data-[active=true]:text-pink-200 data-[active=true]:hover:bg-pink-400/15 data-[active=true]:hover:text-pink-400 data-[active=true]:active:bg-pink-400/15 data-[active=true]:active:text-pink-200 data-[active=true]:[&>svg]:text-pink-400 [&>svg]:text-current"
export const navigationButtonClass = `h-10 gap-3 rounded-lg ${navigationStateClass}`
export const navigationSubButtonClass = `h-9 rounded-lg ${navigationStateClass}`
export const navigationLabelClass = "mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"

export function isNavigationActive(pathname: string, url: string) {
  const path = pathname.replace(/\/+$/, "")
  const target = url.replace(/\/+$/, "")
  return target !== "#" && (path === target || (target !== "/dashboard" && path.startsWith(`${target}/`)))
}
