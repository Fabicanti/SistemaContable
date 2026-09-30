import React from "react";
import { DashboardCards } from "./(ui)/dash-cards";
import { DashboardChart } from "./(ui)/dash-chart";
import { Verification } from "./verification";
import { DashboardDetails } from "./(ui)/dash-details";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export const metadata = {
  title: "SSAA II - Dashboard",
  description: "Resumen general del sistema",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Verification />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 lg:px-6">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Vista general
                </span>
                <Badge
                  variant="outline"
                  className="border-pink-500/20 bg-pink-500/5 text-pink-700 dark:text-pink-300"
                >
                  Datos de ejemplo
                </Badge>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Resumen de tu actividad
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Un vistazo a tus cuentas, movimientos y próximos pendientes.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs text-muted-foreground">
              <CalendarDays className="size-4" aria-hidden="true" />
              Junio 2024 · Demostración
            </div>
          </div>
          <DashboardCards />
          <div className="px-4 lg:px-6">
            <DashboardChart />
          </div>
          <DashboardDetails />
        </div>
      </div>
    </div>
  );
}
