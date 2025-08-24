import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        <div className="flex">
          <aside className="w-64 min-h-screen bg-white border-r">
            <div className="p-4 border-b">
              <h1 className="text-xl font-semibold">Marcas</h1>
              <p className="text-xs text-gray-500">CRUD Demo</p>
            </div>
            <nav className="p-3 space-y-2">
              <Link className="block rounded-lg px-3 py-2 hover:bg-gray-100" href="/brands">
                Listado
              </Link>
              <Link className="block rounded-lg px-3 py-2 hover:bg-gray-100" href="/brands/new">
                Nueva marca (wizard)
              </Link>
            </nav>
          </aside>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}