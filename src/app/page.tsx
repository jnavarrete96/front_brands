'use client';

import useSWR from 'swr';
import { BrandsService } from '@/services/brands';
import type { Brand } from '@/types/brands';
import { useState } from 'react';

export default function BrandsPage() {
  const [ownerFilter, setOwnerFilter] = useState('');

  const { data, error, isLoading, mutate } = useSWR<Brand[]>(
    ['/brands', ownerFilter],
    () => BrandsService.list(ownerFilter)
  );

  const onDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta marca?')) return;
    await BrandsService.remove(id);
    mutate();
  };

  if (error) {
    const err = error as Error;
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error al cargar</h3>
          <p className="text-red-300">{err.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando marcas...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'activo': 'bg-green-500/20 text-green-300 border-green-500/30',
      'inactivo': 'bg-red-500/20 text-red-300 border-red-500/30',
      'pendiente': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    };
    return colors[status.toLowerCase() as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Catálogo de Marcas
              </h2>
              <p className="text-white/60">Gestiona y explora tu portafolio de marcas</p>
            </div>
            
            {/* Buscador elegante */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                placeholder="Filtrar por titular"
                className="w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              />
              {ownerFilter && (
                <button
                  onClick={() => setOwnerFilter('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/80"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Marcas</p>
              <p className="text-3xl font-bold text-white">{data?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Activas</p>
              <p className="text-3xl font-bold text-green-400">
                {data?.filter(b => b.status?.toLowerCase() === 'activo').length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Titulares únicos</p>
              <p className="text-3xl font-bold text-blue-400">
                {new Set(data?.map(b => b.owner?.name).filter(Boolean)).size || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-white/10 backdrop-blur-sm">
              <tr>
                <th className="text-left px-8 py-6 text-white/80 font-semibold text-sm uppercase tracking-wider">Marca</th>
                <th className="text-left px-8 py-6 text-white/80 font-semibold text-sm uppercase tracking-wider">Estado</th>
                <th className="text-left px-8 py-6 text-white/80 font-semibold text-sm uppercase tracking-wider">Titular</th>
                <th className="text-right px-8 py-6 text-white/80 font-semibold text-sm uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data?.map((brand, index) => (
                <tr 
                  key={brand.id} 
                  className="group hover:bg-white/5 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {brand.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-lg">{brand.name}</div>
                        <div className="text-white/50 text-sm">Marca registrada</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(brand.status || '')}`}>
                      <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                      {brand.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-white font-medium">{brand.owner?.name}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => alert('Editar (próximamente)')}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl px-4 py-2 text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(brand.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl px-4 py-2 text-red-300 hover:text-red-200 text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-xl font-semibold text-white/60 mb-2">No hay marcas</h3>
                      <p className="text-white/40">Comienza creando tu primera marca</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}