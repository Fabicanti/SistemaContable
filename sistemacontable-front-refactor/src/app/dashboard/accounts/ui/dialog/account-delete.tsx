
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button';

import { useDeleteAccount } from '@/hooks/use-accounts';
import { Account } from '@/interfaces/account-interface'
import React from 'react'

type Props = {
  account: Account;
  onClose: () => void;
}

export default function AccountDelete({ account, onClose }: Props) {
  const { onSubmit } = useDeleteAccount();

  if (!account) return null;

  return (
    <AlertDialog open={!!account} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Abrir Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar esta cuenta contable?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es irreversible. La cuenta contable serán eliminada permanentemente del sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white" onClick={() => onSubmit(account.id)}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}