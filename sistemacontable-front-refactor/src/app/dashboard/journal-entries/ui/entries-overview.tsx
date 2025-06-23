
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { NotebookPen } from 'lucide-react';
import React from 'react';

export default function EntriesOverview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <NotebookPen />
          Asientos contables
        </CardTitle>
        <CardDescription>
          Visualizá y gestioná los asientos contables registrados en el sistema. Podés crear nuevos y ver detalles.
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}