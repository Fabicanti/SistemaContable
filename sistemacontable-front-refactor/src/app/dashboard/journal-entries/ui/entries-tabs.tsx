"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/stores/user-store";

import EntriesCreate from "./tab/entries-create";
import EntriesTable from "./tab/entries-table";
import EntrieViewer from "./alert/entrie-viewer";

export default function EntrieTabs() {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="entries" className="mt-2 gap-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="entries">Nuevo asiento</TabsTrigger>
          <TabsTrigger value="entries-table">Asientos registrados</TabsTrigger>
        </TabsList>
        <TabsContent value="entries">
          {user.roleId === 3 ? <EntrieViewer /> : <EntriesCreate />}
        </TabsContent>
        <TabsContent value="entries-table">
          <EntriesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
