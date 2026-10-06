"use client"

import { useId } from "react"
import { type LucideIcon } from "lucide-react"

interface Props {
  Icon: LucideIcon
  size?: number
  fromColorHex: string
  toColorHex: string
  className?: string
}

export const GradientIcon = ({ Icon, size = 18, fromColorHex, toColorHex, className }: Props) => {
  const gradientId = `icon-gradient-${useId().replace(/:/g, "")}`
  const color = (hex: string) => `#${hex.trim().replace(/^#/, "")}`
  return (
    <Icon size={size} className={className} stroke={`url(#${gradientId})`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color(fromColorHex)} />
          <stop offset="100%" stopColor={color(toColorHex)} />
        </linearGradient>
      </defs>
    </Icon>
  )
}
