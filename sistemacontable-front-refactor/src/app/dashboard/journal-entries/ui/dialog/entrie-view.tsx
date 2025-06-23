
import React from 'react';

import SeparatorTitle from '@/components/shared/separator-title';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Entrie } from '@/interfaces/entrie-interface';
import { formatBalance } from '@/lib/utils';

type Props = {
  entrie: Entrie;
  onClose: () => void;
}

export default function EntrieView({ entrie, onClose }: Props) {

  const formattedDate: string = new Date(entrie.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });


  if (!entrie) return null;

  return (
    <div>
      <Dialog open={!!entrie} onOpenChange={onClose}>
        <DialogContent
          className="w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-5xl px-4 py-6"
        >
          <div className="w-full overflow-x-hidden space-y-4">
            <DialogHeader>
              <DialogTitle>Asiento contable</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Detalles de los asientos.
            </DialogDescription>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <Card className="py-4">
                  <CardContent className="space-y-2">
                    <p><strong>Fecha: </strong>{formattedDate}</p>
                    <p className={`${!entrie.descripcion && 'italic text-muted-foreground'} break-words`}>{entrie.descripcion || 'No hay descripción'}</p>
                  </CardContent>
                </Card>
                <Card className="py-4">
                  <CardContent className="space-y-2">
                    <div className="flex items-center h-full">
                      <div className="h-12 flex items-center justify-start gap-2">

                        <Avatar className="h-10 w-10">
                          <AvatarImage src={'/avatar/admin.svg'} alt={`${entrie.id}`} />
                          <AvatarFallback>{'AV'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-center">
                          <span>{entrie.usuarioName}</span>
                          <span className="font-semibold text-xs">Propietario</span>
                        </div>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <SeparatorTitle title="Asientos" />

              <div
                className="rounded-lg border overflow-y-auto"
                style={{ maxHeight: '250px' }}
              >
                {entrie.detalles.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-muted/50'>
                        <TableHead className="font-semibold border-r">CUENTA</TableHead>
                        <TableHead className="font-semibold border-r">DEBE</TableHead>
                        <TableHead className="font-semibold">HABER</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entrie.detalles.map((movement, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium border-r">
                            {`${movement.haber !== 0 ? '\u00A0'.repeat(8) : ''}${movement.nombreCuenta}`}
                          </TableCell>
                          <TableCell className="text-right border-r">
                            {movement.debe !== 0 ? formatBalance(movement.debe) : movement.debe}
                          </TableCell>
                          <TableCell className="text-right">
                            {movement.haber !== 0 ? formatBalance(movement.haber) : movement.haber}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4">No hay registro de movimientos.</div>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant={'outline'} onClick={onClose}>
                  Cerrar
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}