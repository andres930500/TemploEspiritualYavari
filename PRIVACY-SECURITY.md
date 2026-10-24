# Privacidad y seguridad

## Estado actual

- El consentimiento opcional comienza denegado.
- Google Consent Mode v2 recibe un estado predeterminado denegado.
- GTM, GA4 y Google Ads no se cargan sin una integración explícita posterior al consentimiento.
- Las preferencias se guardan localmente en `site_consent_preferences`.
- No se almacena contenido de chats ni números de visitantes.
- Los enlaces externos usan `noopener noreferrer` cuando abren una nueva pestaña.

## Encabezados

[`vercel.json`](./vercel.json) configura `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options` y `Permissions-Policy`.

No se añadió una CSP restrictiva todavía porque la política final debe incluir únicamente los orígenes realmente usados cuando se active GTM. Antes de habilitar etiquetas, se debe definir una CSP probada con los orígenes oficiales necesarios y con Astro.

## Publicación

`src/lib/publication.ts` expone el estado de publicación. Los valores `PENDIENTE_DE_CONFIGURAR` en identidad legal, contacto, configuración comercial o servicios impiden considerar el sitio listo.

La aprobación jurídica de los textos de privacidad y términos sigue siendo obligatoria. Los documentos actuales son plantillas informativas, no asesoría legal ni condiciones definitivas.
