"use client"
import { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  size?: number;
  fromColorHex: string;
  toColorHex: string;
}

export const GradientIcon = ({ Icon, size = 18, fromColorHex, toColorHex }: Props) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="url(#gradient)">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`#${fromColorHex}`} />
          <stop offset="100%" stopColor={`#${toColorHex}`} />
        </linearGradient>
      </defs>
      <Icon width={size} height={size} stroke="url(#gradient)" strokeWidth="2" />
    </svg>
  );
};