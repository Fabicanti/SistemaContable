import EntriesOverview from "./ui/entries-overview"
import EntriesTabs from "./ui/entries-tabs"

export const metadata = {
  title: "SSAA II - Asientos",
  description: "Gestión de asientos contables del sistema",
}

export default function JournalEntriesPage() {
  return (
    <div className="p-6">
      <EntriesOverview />
      <EntriesTabs />
    </div>
  )
}