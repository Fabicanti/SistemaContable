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
import SeparatorTitle from '@/components/shared/separator-title';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/stores/user-store';
import { LoaderCircle } from 'lucide-react';

export default function EntriesCreate() {
  const { user } = useUserStore();
  const { form, isLoadingCreateEntrie, isSuccessCreateEntrie, onSubmit } = useCreateEntrie();

  if (!form) return <div>Cargando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear un asiento contable</CardTitle>
        <CardDescription>
          Completá los detalles y movimientos del asiento. Los datos no se guardarán de forma permanente.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => {
            onSubmit(data, user?.id ?? 0)
          })} className="space-y-4">
            <EntrieDetails
              form={form}
            />

            <SeparatorTitle title='Movimientos' />

            <EntrieMovements
              form={form}
              isSuccess={isSuccessCreateEntrie}
            />

            <Separator />

            <CardFooter className='flex md:justify-end justify-between items-center gap-4'>
              <Button type='reset' variant={'outline'} onClick={() => form.reset()} >Limpiar</Button>
              <Button variant={'pink'} disabled={isLoadingCreateEntrie}>
                {isLoadingCreateEntrie ? (
                  <div className="flex items-center justify-center">
                    <LoaderCircle className="mr-2 animate-spin" />
                    Guardando...
                  </div>) : (
                  "Guardar"
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