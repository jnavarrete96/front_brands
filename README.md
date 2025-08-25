# 🧩 Front Brands

Frontend moderno para la API de gestión de marcas, construido con [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) y [SWR](https://swr.vercel.app/).

Este proyecto consume una API REST construida en Django, disponible en `http://127.0.0.1:8000/api`.

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/front-brands.git
cd front-brands
```
2. Instala las dependencias:
```bash
npm install
# o
yarn install
```
3. Crea el archivo .env.local en la raíz del proyecto:
```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
```
4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```
Accede a (http://localhost:3000) para ver la aplicación en acción.

---

## 🧠 Tecnologías utilizadas

- **Next.js 15.5.0** — con `app/` routing y soporte para Turbopack  
- **React 19.1.0**  
- **TypeScript 5**  
- **Tailwind CSS 4**  
- **SWR 2.3.6** — para manejo de datos reactivo y caché inteligente  
- **Prettier + ESLint** — para formato automático y calidad de código

---

## 📁 Estructura del proyecto
```código
src/
├── app/              # Rutas y páginas
├── components/       # Componentes reutilizables
├── hooks/            # Custom hooks (ej. useDebounce)
├── services/         # Lógica de consumo de API
├── types/            # Tipos TypeScript

```
---

## 🧪 Scripts disponibles

- `npm run dev` → Inicia el servidor de desarrollo  
- `npm run build` → Compila la app para producción  
- `npm run start` → Inicia el servidor en producción  
- `npm run lint` → Ejecuta ESLint  
- `npm run format` → Formatea el código con Prettier  

---

## 🛠 Funcionalidades

- Listado de marcas con filtros por titular  
- Edición inline con validación y notificaciones  
- Eliminación con confirmación  
- Registro guiado de nuevas marcas por pasos  
- Estadísticas visuales en tiempo real