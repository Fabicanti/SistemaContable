
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
import { Button } from '@/components/ui/button'
import { useDeleteUser } from '@/hooks/use-users';
import { User } from '@/interfaces/user-interface';
import React from 'react'

type Props = {
  user: User;
  onClose: () => void;
}

export default function UserDelete({user, onClose}: Props) {
  const { onSubmit } = useDeleteUser();

  if (!user) return null;

  return (
    <AlertDialog open={!!user} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar este usuario?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El usuario {user.nombre} {user.apellido} será eliminado permanentemente del sistema junto con toda su información asociada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white" onClick={() => onSubmit(user)}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}