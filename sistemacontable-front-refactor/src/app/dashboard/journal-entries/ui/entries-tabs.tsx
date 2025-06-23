
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EntriesCreate from './tab/entries-create';
import EntriesTable from './tab/entries-table';

export default function EntrieTabs() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="entries" className='mt-2'>
        <TabsList className='w-full'>
          <TabsTrigger value="entries">Crear asientos</TabsTrigger>
          <TabsTrigger value="entries-table">Ver asientos</TabsTrigger>
        </TabsList>
        <TabsContent value="entries">
          <EntriesCreate />
        </TabsContent>
        <TabsContent value="entries-table">
          <EntriesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}