"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GradientIcon } from '@/components/shared/gradient-icon';
import { BadgeDollarSign } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="py-4 px-6 bg-background dark:bg-gray-900 backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto flex sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <GradientIcon Icon={BadgeDollarSign} fromColorHex="7f22fe" toColorHex="ff6900" size={24} />
          <h1 className="text-2xl font-bold bg-gradient-to-tr from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent hidden sm:block">
            Sistema Contable
          </h1>
        </div>
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