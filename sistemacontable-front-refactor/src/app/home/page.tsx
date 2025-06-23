
import Image from 'next/image'
import Navbar from '@/components/semantic/navbar'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: "SSAA II",
  description: "Página de SSAA II",
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-theme-gradient">
      <Navbar />
      <main className="flex-grow md:flex-grow flex justify-evenly items-center bg-background/40 px-6 md:px-10 mx-4 md:mx-40 my-10 md:my-20 rounded-xl gap-8">
        <section className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gestioná tu contabilidad con facilidad
          </h2>
          <p className="mb-6">
            Organiza asientos, controla usuarios, maneja cuentas y mucho más con una plataforma pensada para vos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant={'pink'} >Empezar ahora</Button>
            <Button variant="outline">Ver documentación</Button>
          </div>
        </section>

        <div className="w-full md:w-auto justify-center hidden md:flex">
          <Image
            src="/home/home-view-1.svg"
            alt=""
            height={300}
            width={400}
            priority
          />
        </div>
      </main>

      {/* <footer className="py-4 text-center text-sm text-gray-900 bg-white/80">
        © 2025 Mi Sistema Contable. Todos los derechos reservados.
      </footer> */}
    </div>
  )
}