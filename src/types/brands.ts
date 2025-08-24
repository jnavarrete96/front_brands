export type BrandStatus = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

export interface Owner {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
  status: BrandStatus;
  owner: Owner;
}

export interface ApiResponse<T, E = Record<string, string[]>> {
  success: boolean;
  msg: string;
  data: T;
  errors: E | null;
}

// Respuesta específica del POST
export interface CreatedBrandData {
  name: string;
  status: BrandStatus;
  owner_name: string;
}