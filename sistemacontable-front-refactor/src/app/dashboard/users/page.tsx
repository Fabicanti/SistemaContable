import { columns } from "@/components/table/columns/payments-columns";
import { DataTable } from "@/components/table/data-table";
import { payments } from "@/components/table/payment.data";

export default function UsersPage() {
  return (
    <div className="p-2">
      <DataTable columns={columns} data={payments} filterableColumns={['clientName', 'status' ,'email']}/>
    </div>
  )
}