"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle2 } from "lucide-react";

export default function EmployeesCreate() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto  space-y-6">
        <Card className="overflow-hidden">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-5 md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="text-3xl font-semibold tracking-tight">
                  Registrar un empleado
                </CardTitle>
                <CardDescription className="mt-2">
                  Administrá el alta, los datos y el historial laboral de tu equipo.
                  Cargá legajos completos y asegurá liquidaciones precisas y al día.
                </CardDescription>
              </CardHeader>

              <Separator className="my-4" />

              <p className="text-sm leading-7 ">
                Registrar un empleado centraliza su información personal, de contacto y laboral
                en un solo lugar. Con estos datos podés calcular haberes, asignar conceptos,
                controlar ausencias, generar recibos y cumplir con tus obligaciones legales
                sin fricción.
              </p>

              {/* Bullets escaneables */}
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[
                  "Legajo único y ordenado",
                  "Liquidaciones confiables y al día",
                  "Historial y trazabilidad de cambios",
                  "Campos clave para auditorías y reportes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Separator className="my-4" />
              
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">Privacidad y uso de datos</h3>

              <p className="text-sm leading-7">
                La información se utiliza exclusivamente para la administración del personal y la liquidación de sueldos conforme a la normativa vigente. 
                Podés solicitar la rectificación o baja cuando corresponda.
              </p>

              <Separator className="my-4" />

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild aria-label="Completar formulario de registro de empleado">
                  <Link href="/empleados/nuevo/registrar">Completar formulario</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  aria-label="Ver tabla de empleados"
                >
                  <Link href="/empleados/tabla">Ver tabla</Link>
                </Button>
              </div>
            </div>

            {/* Imagen */}
            <div className="p-5 md:p-6">
              <AspectRatio ratio={9 / 6} className="rounded-2xl border border-muted bg-muted">
                <Image
                  src="/employee/employee-view-1.svg"
                  alt="Ilustración de gestión de empleados para liquidación de sueldos"
                  fill
                  // className="rounded-2xl object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
