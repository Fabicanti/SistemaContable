import { sortableHeader } from "@/components/table/utils/columns-utils";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/interfaces/user-interface";

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "nombreCompleto",
    enableHiding: false,
    header: () => <div className="text-muted-foreground font-medium px-0">Nombre completo</div>,
    cell: ({ row }) => {
      const user = row.original
      const initials = `${user.nombre?.[0] ?? ""}${user.apellido?.[0] ?? ""}`.toUpperCase()

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.roleId === 2 ? '/avatar/admin.svg' : '/avatar/user.png'} alt={`${user.nombre} ${user.apellido}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span>{user.nombre} {user.apellido}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: sortableHeader<User>("Correo", true),
  },
  {
    accessorKey: "roleId",
    header: sortableHeader<User>("Rol", true),
    cell: ({ row }) => {
      const role = row.original.roleId;
      return (
        <div>
          {role === 2 ? <Badge variant="admin" className="text-xs">Administrador</Badge> :
          (role === 3 ? <Badge variant="secondary" className="text-xs">Espectador</Badge> :
            <Badge variant="default" className="text-xs">Usuario</Badge>)}
        </div>
      );
    },
    enableHiding: false
  },
]