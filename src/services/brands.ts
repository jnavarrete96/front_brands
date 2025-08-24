import { api } from '@/libs/api';
import type { Brand, CreatedBrandData } from '@/types/brands';

export const BrandsService = {
  list: async (owner?: string) => {
    const res = await api.get<Brand[]>('/brands', owner ? { owner } : undefined);
    return res.data;
  },

  searchByOwner: async (owner: string) => {
    const res = await api.get<Brand[]>('/brands/by-owner', { owner });
    return res.data;
  },

  create: async (payload: { brand_name: string; owner_name: string }) => {
    // El backend devuelve (name, status, owner_name); luego refrescamos la lista
    const res = await api.post<CreatedBrandData>('/brand', payload);
    return res.data;
  },

  update: async (id: number, payload: { name?: string; status?: string }) => {
    const res = await api.patch<Brand>(`/brand/${id}/update`, payload);
    return res.data;
  },

  remove: async (id: number) => {
    await api.delete<null>(`/brand/${id}`);
    return true;
  },
};
