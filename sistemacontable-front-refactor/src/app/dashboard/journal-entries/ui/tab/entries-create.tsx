"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import EntrieDetails from './form/entrie-details';
import { useCreateEntrie } from '@/hooks/use-entries';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import EntrieMovements from './form/entrie-movements';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/stores/user-store';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function EntriesCreate() {
  const [resetKey, setResetKey] = useState(0);
  const { user } = useUserStore();
  const { form, isLoadingCreateEntrie, isSuccessCreateEntrie, onSubmit } = useCreateEntrie();

  if (!form) return <div>Cargando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del asiento</CardTitle>
        <CardDescription>
          Definí la fecha y el concepto, y agregá los movimientos del asiento.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => {
            onSubmit(data, user?.id ?? 0)
          })} className="space-y-6">
            <EntrieDetails
              form={form}
            />

            <Separator />

            <EntrieMovements
              key={resetKey}
              form={form}
              isSuccess={isSuccessCreateEntrie}
            />

            <Separator />

            <CardFooter className='flex justify-end items-center gap-3 px-0'>
              <Button type='button' variant={'outline'} disabled={isLoadingCreateEntrie} onClick={() => { form.reset(); setResetKey(key => key + 1); }} >Limpiar</Button>
              <Button variant={'pink'} disabled={isLoadingCreateEntrie}>
                {isLoadingCreateEntrie ? (
                  <div className="flex items-center justify-center">
                    <LoaderCircle className="mr-2 animate-spin" />
                    Guardando...
                  </div>) : (
                  "Guardar asiento"
                )
                }
              </Button>
            </CardFooter>

          </form>
        </Form>

      </CardContent>
    </Card>
  )
}