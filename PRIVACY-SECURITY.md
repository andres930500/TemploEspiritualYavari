# Privacidad y seguridad

## Estado actual

- La etiqueta directa de Google Ads se carga en cada página.
- Google Ads registra un evento de conversión al pulsar un botón de WhatsApp.
- No se utiliza contenido de chats ni números de visitantes en el evento.
- No se almacena contenido de chats ni números de visitantes.
- Los enlaces externos usan `noopener noreferrer` cuando abren una nueva pestaña.

## Encabezados

[`vercel.json`](./vercel.json) configura `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options` y `Permissions-Policy`.

No se añadió una CSP restrictiva todavía porque la política final debe incluir únicamente los orígenes realmente usados cuando se active GTM. Antes de habilitar etiquetas, se debe definir una CSP probada con los orígenes oficiales necesarios y con Astro.

## Publicación

`src/lib/publication.ts` expone el estado de publicación. Los valores `PENDIENTE_DE_CONFIGURAR` en identidad legal, contacto, configuración comercial o servicios impiden considerar el sitio listo.

La aprobación jurídica de los textos de privacidad y términos sigue siendo obligatoria. Los documentos actuales son plantillas informativas, no asesoría legal ni condiciones definitivas.
