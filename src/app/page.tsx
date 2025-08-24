'use client';

import useSWR from 'swr';
import { BrandsService } from '@/services/brands';
import type { Brand } from '@/types/brands';
import { useState } from 'react';

export default function BrandsPage() {
  const [ownerFilter, setOwnerFilter] = useState('');

  const { data, error, isLoading, mutate } = useSWR<Brand[]>(
    ['/brands', ownerFilter], // el key depende del filtro
    () => BrandsService.list(ownerFilter)
  );

  const onDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta marca?')) return;
    await BrandsService.remove(id);
    mutate(); // refrescar
  };

  if (error) {
    const err = error as Error;
    return <div className="text-red-600">Error: {err.message}</div>;
  }
  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Listado de marcas</h2>
        <div className="flex items-center gap-2">
          <input
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            placeholder="Filtrar por titular (owner)"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          {/* El botón es opcional, porque ahora al escribir ya se refresca solo */}
          {/* <button
            onClick={() => mutate()}
            className="rounded-lg px-3 py-2 text-sm bg-black text-white"
          >
            Buscar
          </button> */}
        </div>
      </header>

      <div className="overflow-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Estatus</th>
              <th className="px-4 py-3">Titular</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-3">{b.id}</td>
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full border px-2 py-1 text-xs">
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">{b.owner?.name}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => alert('Editar (usaremos el wizard en Paso 3)')}
                    className="rounded-lg border px-3 py-1 text-xs"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(b.id)}
                    className="rounded-lg bg-red-600 text-white px-3 py-1 text-xs"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No hay marcas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
