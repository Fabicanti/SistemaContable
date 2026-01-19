
import Image from 'next/image'
import Navbar from '@/components/semantic/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Bell, Receipt, Users } from 'lucide-react'

export const metadata = {
  title: "SSAA II",
  description: "Página de SSAA II",
}

const features = [
  {
    title: "Analíticas detalladas",
    subtitle: "Mirá tu negocio en tiempo real",
    icon: BarChart3,
    points: [
      "Dashboards claros con ingresos, egresos y resultados.",
      "Filtros por período, sucursal y tipo de cuenta.",
      "Exportá reportes en segundos para compartir con tu equipo.",
    ],
  },
  {
    title: "Control de usuarios y permisos",
    subtitle: "Cada uno ve lo que tiene que ver",
    icon: Users,
    points: [
      "Roles para contadores, administradores y operadores.",
      "Historial de acciones para auditar cambios.",
    ],
  },
  {
    title: "Asientos y conciliaciones",
    subtitle: "Menos carga manual, menos errores",
    icon: Receipt,
    points: [
      "Plantillas para asientos frecuentes.",
      "Validaciones automáticas antes de confirmar.",
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-theme-gradient">
      <Navbar />
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between bg-background/40 p-6 md:p-10 rounded-xl gap-8">
          <section className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gestioná tu contabilidad con facilidad
            </h2>
            <p className="mb-6">
              Organiza asientos, controla usuarios, maneja cuentas y mucho más con una plataforma pensada para vos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="pink">Empezar ahora</Button>
              <Button variant="outline">Ver documentación</Button>
            </div>
          </section>

          <div className="w-full md:w-1/2 md:flex justify-center mt-6 md:mt-0 hidden">
            <Image
              src="/home/home-view-1.svg"
              alt=""
              height={300}
              width={400}
              priority
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <section className="mt-10 md:mt-14 bg-background/40 p-6 md:p-10 rounded-xl">
          <div className="text-center md:text-left mb-6 md:mb-8 ">
            <h3 className="text-2xl md:text-3xl font-semibold">
              Todo lo que necesitás para tu contabilidad
            </h3>
            <p className="mt-2 text-sm md:text-base  max-w-2xl mx-auto md:mx-0">
              Automatizá tareas repetitivas, mantené tus libros al día y tené siempre
              claridad sobre el estado de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="bg-background/50 backdrop-blur-sm border-white/10 hover:border-pink-500/60 transition-colors h-full"
              >
                <CardHeader className="flex flex-row items-center gap-3 pb-3">
                  <div className="size-10 rounded-full bg-pink-500/15 flex items-center justify-center">
                    <feature.icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base md:text-lg">
                      {feature.title}
                    </CardTitle>
                    {feature.subtitle && (
                      <CardDescription className="text-xs md:text-sm">
                        {feature.subtitle}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
                  {feature.points.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>

      {/* <footer className="py-4 text-center text-sm text-gray-900 bg-white/80">
        © 2025 Mi Sistema Contable. Todos los derechos reservados.
      </footer> */}
    </div>
  )
}