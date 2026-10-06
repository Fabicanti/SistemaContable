
import UsersOverview from "./ui/users-overview";
import UsersTable from "./ui/users-table";

export const metadata = {
  title: "SSAA II - Usuarios",
  description: "Gestión de usuarios del sistema",
}

export default function UsersPage() {
  return (
    <div className="p-6">
      <UsersOverview />
      <UsersTable />
    </div>
  )
}