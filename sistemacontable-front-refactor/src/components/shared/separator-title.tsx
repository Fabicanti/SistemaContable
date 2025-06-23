
import React from 'react'
import { Separator } from '../ui/separator';

type Props = {
  title: string;
}

export default function SeparatorTitle({ title = "" }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <span className="text-sm text-muted-foreground">{title}</span>
      <Separator className="flex-1" />
    </div>
  )
}