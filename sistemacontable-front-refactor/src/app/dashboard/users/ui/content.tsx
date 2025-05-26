"use client"

import { Payment } from '@/components/table/payment.data'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import React from 'react'
import { toast } from 'sonner'

type Props = {
  row: Payment;
}

export default function Content({ row }: Props) {
  return (
    <>

      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
      onClick={() => {
        navigator.clipboard.writeText(row.id);
        toast("Payment ID copied to clipboard");
      }}
      >
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </>
  )
}