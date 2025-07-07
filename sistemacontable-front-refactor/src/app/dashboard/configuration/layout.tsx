"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { Contact, ShieldUser } from "lucide-react";
import { ConfigMenuLink } from "./(ui)/config-link";

const configLinks = [
  {
    title: "Información personal",
    description: "Editá tu nombre, email y otros datos personales",
    icon: Contact,
    url: "/dashboard/configuration/personal",
  },
  {
    title: "Seguridad del usuario",
    description: "Cambiá tu contraseña o desactivá tu cuenta de forma permanente.",
    icon: ShieldUser,
    url: "/dashboard/configuration/security",
  },
];

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="p-6">
      <Card className="h-[88vh] w-full flex flex-col shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Configuración del usuario</CardTitle>
          <CardDescription>Administrá tu perfil y seguridad de cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">

          {/* Tabs para mobile */}
          <div className="mb-4 md:hidden">
            <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
              <TabsList className="w-full grid grid-cols-2">
                {configLinks.map((item) => (
                  <TabsTrigger key={item.url} value={item.url}>
                    {item.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Vista en grid para desktop */}
          <div className="grid h-full grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Menú lateral solo visible en desktop */}
            <div className="hidden md:flex flex-col gap-4">
              {configLinks.map((item, index) => (
                <ConfigMenuLink
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  href={item.url}
                  isActive={pathname === item.url}
                />
              ))}
            </div>

            {/* Contenido */}
            <div className="col-span-2">
              <Card className="h-full">
                <CardContent className="h-full p-4 overflow-auto">
                  {children}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
