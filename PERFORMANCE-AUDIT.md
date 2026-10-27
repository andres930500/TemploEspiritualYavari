# Auditoría de rendimiento

Fecha de revisión: 21 de octubre de 2026

## Alcance y limitaciones

Se revisaron el código fuente Astro, la salida estática de producción, el CSS
generado, los scripts propios, las imágenes y las dependencias declaradas.
El entorno no tiene Chrome ni el comando `lighthouse` disponible, por lo que no
se reportan puntuaciones Lighthouse ni valores de LCP, INP o CLS. Esos valores
requieren una medición de laboratorio con un navegador real y, posteriormente,
datos de usuarios reales (CrUX o RUM).

## Hallazgos y optimizaciones realizadas

### JavaScript

- No hay componentes React, Vue, Angular ni hidratación de frameworks.
- La salida contiene módulos inline propios para:
  - menú móvil;
  - etiqueta global de Google Ads y conversión;
  - eventos internos de WhatsApp y FAQ.
- Se carga el script externo de Google Ads desde `googletagmanager.com` y se
  registra una conversión al pulsar los botones de WhatsApp.
- No se identificaron dependencias de runtime innecesarias en `package.json`.

### CSS

- Tailwind CSS 4 se procesa mediante el plugin oficial de Vite.
- El build genera un único archivo CSS de aproximadamente 21.7 KB sin
  comprimir.
- Se conservaron los estilos de foco, `prefers-reduced-motion`, responsive y
  del banner de consentimiento.
- No se añadió CSS crítico duplicado ni una herramienta de purga adicional:
  Astro/Tailwind ya generan la hoja de producción a partir de las clases
  utilizadas.

### Imágenes

- El hero se carga con `loading="eager"` y `fetchpriority="high"`, con
  dimensiones explícitas de 1200 × 800.
- Las siete imágenes fuera de la primera pantalla usan `loading="lazy"`.
- `ResponsiveImage.astro` ahora admite `sizes`, con valores adaptados para
  hero, servicios y presentación del maestro. Esto deja preparado el
  componente para imágenes rasterizadas responsive futuras.
- Las imágenes provisionales actuales son SVG ligeros de entre 445 B y 1.05
  KB.
- La imagen Open Graph pesa aproximadamente 146 KB y no se descarga como
  recurso de navegación; solo se referencia en metadatos sociales.
- Las imágenes se importan como `ImageMetadata`, permitiendo que
  `astro:assets` las procese correctamente.

### HTML, CLS y experiencia móvil

- Las imágenes tienen `width` y `height`, reduciendo el riesgo de CLS.
- El banner de consentimiento permanece oculto hasta ser necesario y los
  elementos flotantes tienen posicionamiento fijo.
- El menú móvil utiliza HTML existente y JavaScript nativo, sin librerías.
- Se mantienen enlaces de teclado, skip link, estados de foco y tamaños
  responsive.
- No se detectaron scripts de terceros ni iframes activos en el HTML de
  producción.
- La presencia de `100vw` en el HTML corresponde a la declaración responsive
  `sizes`, no a un elemento visual con desbordamiento horizontal.

## Evidencia del build

Comandos ejecutados:

```text
npm.cmd run check
npm.cmd test
npm.cmd run build
```

Resultados:

- `astro check`: 0 errores, 0 advertencias y 0 hints.
- Tests automatizados: 6 pasaron, 0 fallaron.
- Build estático: 4 páginas generadas correctamente.
- Sitemap generado correctamente.
- HTML principal:
  - 8 imágenes;
  - 1 imagen eager;
  - 7 imágenes lazy;
  - 8 atributos `sizes`;
  - 0 scripts externos detectados.
- CSS de producción: aproximadamente 21.7 KB sin comprimir.

## Core Web Vitals

No se puede confirmar que se alcancen las metas de Lighthouse móvil 90+,
LCP inferior a 2.5 s, INP inferior a 200 ms o CLS inferior a 0.1 sin ejecutar
una auditoría de navegador. Las optimizaciones realizadas reducen riesgos
conocidos, pero no sustituyen mediciones.

### Medición recomendada

1. Ejecutar `npm run build`.
2. Servir la salida con `npm run preview`.
3. Abrir la URL local en Chrome.
4. Ejecutar Lighthouse en modo móvil y escritorio, en ventana incógnito.
5. Repetir la prueba al menos tres veces y conservar medianas.
6. Medir posteriormente el dominio de producción con PageSpeed Insights.
7. Revisar CrUX o una solución RUM antes de afirmar resultados de usuarios
   reales.

## Pendientes y recomendaciones

- Ejecutar Lighthouse cuando Chrome esté disponible.
- Repetir la auditoría con las imágenes definitivas: el formato, peso y
  dimensiones finales pueden cambiar el LCP.
- Mantener la imagen hero en formato y tamaño adecuados cuando se reemplace.
- Verificar la etiqueta directa de Google Ads y medir su impacto antes de
  publicar cambios adicionales de etiquetas.
- Considerar una CSP después de conocer los orígenes reales de las etiquetas.
- Verificar Web Vitals en producción desde Colombia y en dispositivos móviles
  de gama media.
- No habilitar indexación ni datos comerciales definitivos como parte de esta
  auditoría.
