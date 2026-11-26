# Backend GeoUCI

API REST del proyecto, construida con **NestJS 12 + TypeScript (ESM)**, **Prisma 7** y **PostgreSQL**. La documentación OpenAPI se sirve en `/api`.

## Estado del backend

- Modelos del schema de Prisma: `User`, `Category`, `Map`, `Location`, `LocationRequest`, `Event`, `Comment`, `Reaction` y `Complaint`.
- CRUD REST completo para los 9 modelos: `users`, `categories`, `maps`, `locations`, `locations-request`, `events`, `comments`, `reactions` y `complaints`.
- Cada recurso expone `POST /recurso`, `GET /recurso`, `GET /recurso/:id`, `PATCH /recurso/:id` y `DELETE /recurso/:id`. Los IDs son UUID.
- Cada módulo sigue la misma estructura: controlador, servicio con `PrismaService`, esquemas Zod de creación/actualización con sus tipos inferidos, entidad y pruebas unitarias.
- La validación de las peticiones usa `StandardSchemaValidationPipe` de forma global con `@Body({ schema })` en los controladores; Swagger genera los esquemas a partir de Zod (`src/swagger.ts` documenta los `Date` como `date-time`).
- `PrismaService` está registrado como proveedor global (`src/prisma`) y usa `@prisma/adapter-pg`. Las migraciones están en `prisma/migrations`.
- Pendiente: autenticación/autorización y pruebas e2e de los endpoints.

## Instalación

### Requisitos

- Node.js 20 o superior y npm.
- PostgreSQL 13 o superior (los IDs por defecto usan `gen_random_uuid()`).

### Pasos

1. Instalar dependencias desde la carpeta `server`:

   ```bash
   cd eq-geouci/server
   npm install
   ```

2. Crear el archivo de entorno a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

   Y configurar `DATABASE_URL` con la cadena de conexión de tu base de datos:

   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/geouci?schema=public"
   ```

   Opcionalmente, añade las credenciales de Observe (`OBSERVE_APP_KEY` y `OBSERVE_APP_SECRET`). También puedes generarlas con `npx @nestjs/observe link`.

3. Generar el cliente de Prisma y aplicar las migraciones:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

   En producción usa `npx prisma migrate deploy` en lugar de `migrate dev`. El cliente generado se escribe en `src/generated/prisma` (ignorado por Git), así que hay que generarlo después de cada `npm install` o cuando cambie `schema.prisma`.

4. Arrancar la API:

   ```bash
   npm run start:dev
   ```

   La API queda en `http://localhost:3000` y Swagger en `http://localhost:3000/api`.

### Comandos útiles

```bash
npm run build          # compilar a dist/
npm run start          # arrancar sin watch
npm run start:prod     # arrancar la versión compilada
npm test               # pruebas unitarias (Vitest)
npm run test:e2e       # pruebas e2e (requieren la base de datos configurada)
npm run test:cov       # cobertura
npm run lint           # lint con oxlint
```
