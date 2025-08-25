'use client';

import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  readonly title: string;
  readonly subtitle: string;
  readonly ownerFilter?: string;
  readonly onOwnerFilterChange?: (value: string) => void;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  ownerFilter = '', 
  onOwnerFilterChange 
}: PageHeaderProps) {
  const pathname = usePathname();
  
  // Mostrar buscador solo en la página principal
  const showSearch = pathname === '/' && onOwnerFilterChange;

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-white/60">{subtitle}</p>
          </div>
          
          {/* Buscador elegante - solo en página principal */}
          {showSearch && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={ownerFilter}
                onChange={(e) => onOwnerFilterChange?.(e.target.value)}
                placeholder="Filtrar por titular"
                className="w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              />
              {ownerFilter && (
                <button
                  onClick={() => onOwnerFilterChange?.('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/80"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}