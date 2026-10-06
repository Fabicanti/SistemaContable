
// export const metadata = {
//   title: "SSAA II - Registrar empleado.",
//   description: "Resumen general del sistema",
// }
"use client";
// Esto es solo una prueba. SE ESCRIBE "EMPLOYEES"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function EmployeesPage() {
  return (
    <div className="space-y-6 p-6">
      <Card className="overflow-hidden">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Texto */}
          <div className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">Registrar empleado</CardTitle>
              <CardDescription className="mt-2">
                Cargá los datos personales, de contacto y laborales para crear un legajo.
              </CardDescription>
            </CardHeader>

            <Separator className="my-4" />

            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Datos personales: nombre, apellido, CUIL, fecha de nacimiento.</li>
              <li>• Domicilio y contacto: país, región, ciudad, dirección, teléfono, email.</li>
              <li>• Información laboral: puesto, departamento, fecha de ingreso, legajo, estado, sueldo básico.</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              {/* Ajustá la ruta del formulario real */}
              <Button asChild><Link href="/empleados/nuevo/registrar">Completar formulario</Link></Button>
              <Button variant="outline" asChild><Link href="/empleados/tabla">Ver tabla</Link></Button>
            </div>
          </div>

          {/* Imagen */}
          <div className="p-6">
            <AspectRatio ratio={16 / 9} className="rounded-2xl border ">
              <Image
                src="/employee/employee-view-1.svg" // reemplazá por tu imagen
                alt="Ilustración de empleados"
                fill
                // className="object-cover rounded-2xl"
                priority
              />
            </AspectRatio>
          </div>
        </div>
      </Card>

      {/* Placeholder: acá podrías montar tu formulario real si querés tenerlo en la misma página */}
      {/* <YourEmployeeForm /> */}
    </div>
  );
}