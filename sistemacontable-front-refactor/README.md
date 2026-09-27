This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Base de interfaz

- React y React DOM 19.3, con tipos de React 19.
- Next.js 15.5 y Tailwind CSS 4.3.
- shadcn/ui: componentes locales, estilo `new-york`, primitivas del paquete unificado `radix-ui`.
- Recharts 3 para los gráficos existentes; Lucide para iconos y Sonner para notificaciones.
- Tema claro/oscuro en `src/app/globals.css`, con variables OKLCH y tipografía Geist.

La migración conserva las variantes de botones `pink` y `violet` y no agrega componentes de interfaz. Los componentes personalizados permanecen en `src/components/ui`; no deben sobrescribirse sin revisar sus adaptaciones.

Validaciones disponibles:

```bash
npm run typecheck
npm run lint
npm test -- --runInBand
npm run build
```

Las pruebas cubren foco de formularios, navegación por teclado en tabs, apertura/cierre de diálogos y el tooltip de gráficos con React 19. La compilación necesita acceso a Google Fonts para descargar Geist y Geist Mono.

Referencias: [migración de shadcn a Radix unificado](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui), [React 19 y Tailwind 4](https://ui.shadcn.com/docs/tailwind-v4), [Recharts 3](https://github.com/recharts/recharts/wiki/3.0-migration-guide).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
