# HR Job Portal Frontend

Aplicación frontend para gestión de puestos laborales y visualización de vacantes, construida con React, Material UI y Vite.

## Características

- Gestión de puestos: alta, edición, eliminación lógica y consulta.
- Visualización de vacantes con filtros, búsqueda y paginación.
- Detalle completo del puesto.
- Context API para estado global.
- Servicios Axios con capa de consumo REST y fallback a mock de datos.
- Diseño responsive y componentes reutilizables.

## Ejecutar el proyecto

1. Abrir una terminal en `hr-job-portal-frontend`
2. Ejecutar `npm install`
3. Ejecutar `npm run dev`
4. Abrir `http://localhost:5173`

## Estructura

- `src/components/`: componentes reutilizables.
- `src/pages/`: pantallas principales.
- `src/services/`: lógica de consumo de API.
- `src/context/`: estado global con Context API.
- `src/layouts/`: diseño base y navegación.
- `src/routes/`: definiendo rutas de la aplicación.
- `src/data/`: datos mock para pruebas.
- `src/utils/`: utilidades de formato y constantes.
- `src/models/`: modelos y tipos de datos.
