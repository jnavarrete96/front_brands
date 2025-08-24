import type { ApiResponse } from '@/types/brands';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const buildUrl = (path: string, query?: Record<string, string | number | boolean | undefined>) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  const baseUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
  
  const fullUrl = baseUrl + cleanPath;
  const url = new URL(fullUrl);
  
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
};

const request = async <T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> => {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers || {}),
    },
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (json && (json.msg || json.message)) || `HTTP ${res.status}`;
    const errors = json?.errors ?? null;
    throw Object.assign(new Error(message), { status: res.status, errors, raw: json });
  }

  return json as ApiResponse<T>;
};

export const api = {
  get: <T>(path: string, query?: Record<string, string | number | boolean>) =>
    request<T>(buildUrl(path, query)),

  post: <T>(path: string, body: unknown) =>
    request<T>(buildUrl(path), { method: 'POST', body: JSON.stringify(body) }),

  patch: <T>(path: string, body: unknown) =>
    request<T>(buildUrl(path), { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(path: string) =>
    request<T>(buildUrl(path), { method: 'DELETE' }),
};