# Página de servicios esotéricos

Landing page estática desarrollada con Astro, TypeScript estricto y Tailwind CSS 4. El proyecto está preparado para desplegarse en Vercel.

## Requisitos

- Node.js `>=22.23.4` (se recomienda la versión LTS)
- npm
- Git

## Instalación

Clona el repositorio y entra en su directorio:

```bash
git clone <url-del-repositorio>
cd pagina
```

Instala las dependencias:

```bash
npm install
```

## Desarrollo local

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, Astro estará disponible en `http://localhost:4321`.

## Comprobaciones y compilación

Comprueba los tipos y archivos Astro:

```bash
npm run check
```

Genera la versión estática de producción en `dist/`:

```bash
npm run build
```

Previsualiza localmente la compilación de producción:

```bash
npm run preview
```

## Estructura principal

- `src/pages/`: páginas Astro.
- `src/layouts/`: estructuras compartidas de las páginas.
- `src/components/`: componentes reutilizables de layout, secciones y UI.
- `src/config/`: configuración general del sitio.
- `src/data/`: datos comerciales tipados, separados de la presentación.
- `src/styles/global.css`: estilos globales y entrada de Tailwind CSS 4.
- `src/assets/images/`: fotografías e imágenes reales que se incorporarán posteriormente.
- `src/assets/icons/`: iconos propios que se incorporarán posteriormente.
- `src/lib/`: utilidades compartidas sin presentación.
- `src/scripts/`: interactividad nativa que se incorporará posteriormente.
- `public/`: archivos estáticos públicos.
- `astro.config.mjs`: configuración de Astro y plugin oficial de Vite para Tailwind.

El contenido actual es provisional. Los servicios, preguntas frecuentes y testimonios reales deberán añadirse en `src/data/` cuando estén aprobados. No se han inventado datos del maestro, reseñas ni números de contacto.

## Configuración de contenido

- Cambia el nombre del maestro, WhatsApp, dominio, correo, mensaje de contacto y demás información global en [`src/config/site.ts`](./src/config/site.ts).
- Cambia el catálogo, imágenes, mensajes de WhatsApp y orden de los servicios en [`src/data/services.ts`](./src/data/services.ts).
- Cambia las preguntas y respuestas en [`src/data/faq.ts`](./src/data/faq.ts).
- Añade testimonios autorizados y publicados en [`src/data/testimonials.ts`](./src/data/testimonials.ts). El arreglo vacío no muestra la sección.
- Añade fotografías en [`src/assets/images/`](./src/assets/images/) y referencia su ruta en `services.ts` o `site.ts`.
- Añade iconos en [`src/assets/icons/`](./src/assets/icons/).
- Configura el dominio y los identificadores públicos de analítica en `.env.local`, tomando como referencia [`.env.example`](./.env.example). No expongas secretos con variables `PUBLIC_*`.

`src/lib/validation.ts` valida el formato internacional del WhatsApp, URLs, enlaces externos, servicios activos e identificadores duplicados. Los valores `PENDIENTE_DE_CONFIGURAR` permiten desarrollar y generan un estado no listo para publicación; los formatos inválidos generan errores.

## Sistema visual

Los tokens visuales están centralizados al inicio de [`src/styles/global.css`](./src/styles/global.css), dentro de `@theme` de Tailwind CSS 4:

- Colores: `--color-ink`, `--color-charcoal`, `--color-gold`, `--color-cream`, `--color-text`, entre otros.
- Tipografía: `--font-sans`.
- Espaciado: `--spacing-section`, `--spacing-section-lg` y `--spacing-18`.
- Radios y sombras: `--radius-card`, `--radius-pill`, `--shadow-card` y `--shadow-glow`.
- Contenedor: `--container-content`.

Para cambiar la identidad visual, modifica esos tokens en un solo lugar. Los tamaños de títulos se controlan en `.section-heading__title` y los espaciados generales en `.section` y `.site-container`. Los estilos de botones se controlan en `.button`, `.button--primary` y `.button--secondary`.

El diseño usa CSS móvil primero, con adaptaciones en `640px`, `768px` y `1024px`. El menú móvil se implementa con JavaScript nativo en `Header.astro`, sin dependencias externas, y respeta teclado, foco visible y `prefers-reduced-motion`.

## Integración de WhatsApp

El número se configura únicamente en `whatsappBusinessNumber` dentro de [`src/config/site.ts`](./src/config/site.ts), con formato colombiano internacional:

```ts
whatsappBusinessNumber: '+573001234567'
```

El número anterior es solo un ejemplo de formato y no está configurado en el proyecto. Mientras el valor sea `PENDIENTE_DE_CONFIGURAR` o no cumpla el formato `57` + 10 dígitos, los botones permanecen desactivados y no se genera ningún enlace externo.

La función [`src/lib/whatsapp.ts`](./src/lib/whatsapp.ts) valida, normaliza y codifica los enlaces `https://wa.me/`. El componente [`WhatsAppButton.astro`](./src/components/ui/WhatsAppButton.astro) centraliza los botones inline, de servicios, del encabezado, flotante y de la barra móvil.

Los clics válidos emiten el evento interno `whatsapp_click` con `serviceId`, `section` y `location`. No se cargan Google Analytics, Google Tag Manager ni se recopila el contenido de las conversaciones.

## SEO técnico

La configuración SEO reutilizable está en [`src/lib/seo.ts`](./src/lib/seo.ts) y se integra desde [`BaseLayout.astro`](./src/layouts/BaseLayout.astro). El layout genera title, description, canonical, robots, Open Graph y Twitter/X Cards por página.

El sitemap lo genera oficialmente `@astrojs/sitemap`. En desarrollo o staging utiliza `http://localhost:4321` como base temporal y el sitio permanece bloqueado para indexación. [`src/pages/robots.txt.ts`](./src/pages/robots.txt.ts) solo publica la directiva `Sitemap` cuando la indexación está habilitada.

## Imágenes provisionales

Los recursos originales están organizados en [`src/assets/images/`](./src/assets/images/): `hero/`, `services/`, `master/` y `social/`. El hero usa carga prioritaria y las imágenes de tarjetas usan carga diferida mediante [`ResponsiveImage.astro`](./src/components/ui/ResponsiveImage.astro). La imagen social provisional es `1200 × 630` y se referencia desde `src/config/site.ts`.

Para reemplazar una imagen, conserva el nombre o actualiza únicamente la importación/ruta en `site.ts` o `src/data/services.ts`; no es necesario modificar la estructura HTML de las secciones. Mantén dimensiones explícitas, alt descriptivo y formatos optimizados. Los SVG provisionales se mantienen ligeros; para fotografías definitivas, importa WebP/AVIF desde `src/assets/images/` y conserva el componente `ResponsiveImage`.
