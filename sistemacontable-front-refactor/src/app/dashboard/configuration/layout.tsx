"use client";

import { Card, CardContent } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import { Contact, Settings2, ShieldUser } from 'lucide-react';
import { ConfigMenuLink } from './(ui)/config-link';

const configLinks = [
  { title: 'Información personal', shortTitle: 'Perfil', description: 'Tu nombre, correo y datos de usuario.', icon: Contact, url: '/dashboard/configuration/personal' },
  { title: 'Seguridad', shortTitle: 'Seguridad', description: 'Administrá la contraseña de tu cuenta.', icon: ShieldUser, url: '/dashboard/configuration/security' },
];

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <header className="flex items-start gap-4 px-1 py-4">
        <div className="shrink-0 rounded-xl border bg-card p-3 text-primary shadow-sm"><Settings2 className="size-6" aria-hidden="true" /></div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Configuración</h1>
          <p className="text-sm text-muted-foreground">Administrá tu información personal y la seguridad de tu cuenta.</p>
        </div>
      </header>
      <div className="grid items-start gap-5 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
        <nav aria-label="Configuración de la cuenta" className="grid min-w-0 grid-cols-2 gap-2 md:grid-cols-1">
          {configLinks.map((item) => <ConfigMenuLink key={item.url} title={item.title} shortTitle={item.shortTitle} description={item.description} icon={item.icon} href={item.url} isActive={pathname === item.url} />)}
        </nav>
        <Card className="min-w-0 shadow-sm">
          <CardContent className="px-4 sm:px-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
