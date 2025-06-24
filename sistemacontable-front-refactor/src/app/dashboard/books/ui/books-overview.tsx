
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { BookText } from 'lucide-react';

import React from 'react'
// BookText
export default function BooksOverview() {
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BookText />
          Libros contables
        </CardTitle>
        <CardDescription>
          Visualizá y gestioná el libro mayor del sistema contable. 
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}