import { BookText } from "lucide-react";

export default function BooksOverview() {
  return (
    <header className="flex items-start gap-4 px-1 py-4">
      <div className="rounded-xl border bg-card p-3 text-primary shadow-sm">
        <BookText className="size-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Libros contables
        </h1>
        <p className="text-sm text-muted-foreground">
          Consultá los movimientos y el saldo de cada cuenta en el libro mayor.
        </p>
      </div>
    </header>
  );
}
