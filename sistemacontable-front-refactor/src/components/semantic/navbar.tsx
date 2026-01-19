"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import LogoCompany from '../logo-company';

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="py-4 px-6 bg-background dark:bg-gray-900 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex sm:flex-row justify-between items-center gap-4">
        <LogoCompany name='Sistema Contable' url="/home" size={28} />
        <div className="flex items-center gap-2 w-auto">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => router.push('/login')}
          >
            Iniciar sesión
          </Button>
          <Button
            type="button"
            variant={"violet"}
            className="hidden sm:inline-flex"
            onClick={() => router.push('/register')}
          >
            Registrarse
          </Button>
        </div>
      </div>
    </header>
  );
}