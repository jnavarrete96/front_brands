import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex">
          {/* Sidebar con efecto glassmorphism */}
          <aside className="w-72 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/20">
            {/* Header del sidebar con gradiente */}
            <div className="p-6 border-b border-white/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">BrandHub</h1>
                  <p className="text-sm text-purple-200">Gestión inteligente</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              <Link 
                className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20" 
                href="/"
              >
                <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="font-medium">Explorar marcas</span>
              </Link>
              
              <Link 
                className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20" 
                href="/brands/new"
              >
                <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Nueva marca</span>
              </Link>
            </nav>

            {/* Decorative element */}
            <div className="absolute bottom-6 left-4 right-4">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/60">Sistema operativo</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-screen overflow-y-auto bg-gradient-to-b from-transparent to-black/20">
              <div className="p-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}