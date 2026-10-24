# Configuración SEO

## Dominio y entorno

Configura las variables en `.env.local` o en el proveedor de despliegue:

```env
PUBLIC_SITE_URL=https://tu-dominio-real.co
PUBLIC_SITE_ENV=production
PUBLIC_ALLOW_INDEXING=true
```

`PUBLIC_SITE_URL` debe ser una URL HTTP o HTTPS real. No uses `example.com` ni otro dominio ficticio. Mientras el dominio no esté configurado, Astro usa `http://localhost:4321` como base temporal, genera canonical y sitemap de desarrollo y mantiene el sitio con `noindex, nofollow`.

La indexación de producción requiere simultáneamente:

- Un `PUBLIC_SITE_URL` válido.
- `PUBLIC_SITE_ENV=production`.
- `PUBLIC_ALLOW_INDEXING=true`.

Los despliegues locales y de prueba deben conservar `PUBLIC_ALLOW_INDEXING=false`.

## Title y description

La página principal configura su título desde [`src/pages/index.astro`](./src/pages/index.astro), usando `siteConfig.heroTitle` y `siteConfig.commercialName`.

Las páginas independientes pueden pasar `title`, `description`, `canonicalPath`, `robots` y `shareImage` a [`BaseLayout.astro`](./src/layouts/BaseLayout.astro):

```astro
<BaseLayout
	title="Título descriptivo"
	description="Descripción única y útil para esta página."
	canonicalPath="/servicios/lectura-de-tarot"
>
	<!-- contenido -->
</BaseLayout>
```

La lógica común está en [`src/lib/seo.ts`](./src/lib/seo.ts). Evita repetir etiquetas SEO dentro de las páginas.

## Canonical, Open Graph y Twitter/X

El canonical se construye con `PUBLIC_SITE_URL` y la ruta actual. Open Graph y Twitter/X usan el mismo title, description, URL canónica e imagen configurada en `siteConfig.shareImage`.

La imagen para compartir debe ser una ruta local existente o una URL real HTTPS. Configúrala en [`src/config/site.ts`](./src/config/site.ts) cuando esté disponible.

## Sitemap y robots.txt

`@astrojs/sitemap` genera automáticamente el sitemap durante `npm run build`. La integración está en [`astro.config.mjs`](./astro.config.mjs).

El endpoint [`src/pages/robots.txt.ts`](./src/pages/robots.txt.ts) permite el rastreo únicamente cuando la publicación está habilitada y añade la URL del sitemap. En desarrollo y staging usa `Disallow: /` para evitar indexación accidental.

Antes de publicar:

1. Ejecuta `npm run build`.
2. Comprueba `dist/sitemap-index.xml`.
3. Comprueba `dist/robots.txt`.
4. Comprueba que canonical y Open Graph usan el dominio real.

## Google Search Console

No se ha configurado Search Console porque requiere acceso a la cuenta del propietario del dominio.

Cuando el dominio esté publicado:

1. Accede a Google Search Console con la cuenta propietaria.
2. Añade una propiedad de dominio o prefijo de URL.
3. Completa la verificación solicitada por Google.
4. Registra `https://tu-dominio-real.co/sitemap-index.xml`.
5. Usa la inspección de URL para solicitar rastreo de las páginas públicas.

## Revisión de indexación

Revisa periódicamente:

- Errores de cobertura e indexación.
- URLs excluidas por `noindex`.
- Canonical seleccionada por Google.
- Errores de rastreo.
- Estado del sitemap.
- Enlaces internos y páginas 404.

No se deben habilitar datos estructurados de Organization hasta disponer de nombre comercial, dominio y correo reales. No se incluyen valoraciones, direcciones, horarios, premios ni certificaciones no verificadas.
