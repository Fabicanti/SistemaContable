import { NotebookPen } from "lucide-react";
export default function EntriesOverview() {
  return (
    <header className="flex items-start gap-4 px-1 py-4">
      <div className="rounded-xl border bg-card p-3 text-primary shadow-sm">
        <NotebookPen className="size-6" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Asientos contables
        </h1>
        <p className="text-sm text-muted-foreground">
          Registrá movimientos y consultá el libro de asientos.
        </p>
      </div>
    </header>
  );
}
