
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import React from 'react'

export default function EntriesViewer() {
  return (
    <div>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>No tenés permisos para crear asientos</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Tu cuenta se encuentra en modo <strong>espectador</strong>. Podés ver la información
            contable, pero no crear, editar ni eliminar asientos.
          </p>
          <ul className="list-inside list-disc text-sm">
            <li>Revisar asientos y libros contables existentes</li>
            <li>Consultar saldos, movimientos y reportes disponibles</li>
            <li>
              Solicitar a un administrador que te otorgue permisos si necesitás cargar asientos
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
