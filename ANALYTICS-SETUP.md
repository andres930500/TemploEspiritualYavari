# Configuración de analítica

La aplicación tiene preparada una capa interna de eventos en [`src/lib/analytics.ts`](./src/lib/analytics.ts) y carga el contenedor de Google Tag Manager `GTM-5ZLT6Z2K` desde [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro). Los clics de WhatsApp se envían a `dataLayer` para que la nueva cuenta configure sus conversiones en GTM.

## Eventos disponibles

| Evento | Cuándo ocurre | Parámetros |
| --- | --- | --- |
| `whatsapp_click` | Se pulsa un enlace válido de WhatsApp | `service`, `placement` |
| `service_interest` | Se pulsa el CTA de un servicio | `service`, `placement` |
| `faq_interaction` | Se abre una pregunta FAQ | `placement` es `faq`; el identificador queda en `technical.faqId` |

`service` contiene identificadores internos, no nombres de personas ni contenido de chats. `placement` identifica la ubicación del componente, por ejemplo `hero-cta`, `service-card`, `contact-cta`, `floating` o `mobile-bar`.

`service_interest` y `whatsapp_click` representan etapas distintas: el primero indica interés en una categoría; el segundo indica un clic de contacto. Ninguno significa conversación iniciada, lead calificado o venta.

## 1. Configurar conversiones en el nuevo contenedor

El sitio envía estos eventos a `dataLayer`:

- `whatsapp_click`: clic en cualquier botón de WhatsApp.
- `service_interest`: clic en el CTA de una tarjeta de servicio.
- `faq_interaction`: apertura de una pregunta frecuente.

En GTM `GTM-5ZLT6Z2K`, crea una etiqueta de conversión de Google Ads con el ID y la etiqueta de conversión que proporcione la nueva cuenta. Usa un activador de evento personalizado para `whatsapp_click`.

El evento representa un clic con intención de contacto. No confirma que la persona haya iniciado una conversación, contratado un servicio o realizado un pago.

## 2. Crear una propiedad GA4

1. En Google Analytics, crea una propiedad para el dominio real.
2. Crea un flujo de datos web.
3. Conserva el Measurement ID que proporcione Google en el contenedor GTM, no en componentes Astro.
4. Verifica la política de privacidad y consentimiento aplicable antes de activar medición.

## 3. Crear el contenedor GTM

1. Crea un contenedor web en Google Tag Manager.
2. Obtén el identificador con formato `GTM-XXXXXXX`.
3. Configúralo como variable pública de entorno:

```env
PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
PUBLIC_GTM_CONSENT_GRANTED=false
```

No incluyas identificadores ficticios en producción. `PENDIENTE_DE_CONFIGURAR` no activa ninguna etiqueta.

## 4. Carga de GTM

La función `loadGoogleTagManager()` está disponible en [`src/lib/analytics.ts`](./src/lib/analytics.ts) para integraciones futuras. El sitio actual carga directamente el contenedor `GTM-5ZLT6Z2K` desde el layout principal.

```ts
loadGoogleTagManager({
	containerId: 'GTM-5ZLT6Z2K',
	consentGranted: true,
});
```

Los eventos internos se envían a `dataLayer` una sola vez mediante `emitInternalAnalyticsEvent()`.

## 5. Configurar eventos en GTM

En GTM, crea activadores de tipo evento personalizado con estos nombres:

- `whatsapp_click`
- `service_interest`
- `faq_interaction`

Mapea las variables de evento `service` y `placement` a parámetros de GA4. No envíes el texto de los mensajes de WhatsApp, números personales ni datos del chat.

## 6. Enviar eventos a GA4

Para cada evento, crea una etiqueta `Google Analytics: GA4 Event` en GTM:

- Usa la etiqueta de configuración del flujo web.
- Usa el mismo nombre del evento personalizado.
- Añade `service` y `placement` como parámetros.
- Publica solo después de validar consentimiento y modo Preview.

No instales simultáneamente gtag.js, una integración directa de GA4 y GTM para el mismo evento: eso produciría duplicados.

## 7. Configurar una conversión adicional en Google Ads

La conversión inicial puede basarse en `whatsapp_click`, pero debe nombrarse como clic o intención de contacto. No debe presentarse como conversación iniciada, lead calificado o venta.

Una conversación iniciada no puede detectarse automáticamente con un enlace `wa.me`. Un lead calificado y una venta requieren un proceso posterior, CRM o importación offline con consentimiento y datos propios del negocio.

## 8. Verificar con Tag Assistant

1. Abre Preview en Google Tag Manager.
2. Visita el sitio con consentimiento habilitado en el entorno de prueba.
3. Comprueba que cada clic emite una sola vez `whatsapp_click`.
4. Confirma `service` y `placement`.
5. Abre una FAQ y verifica un único `faq_interaction`.
6. Comprueba que las etiquetas GA4 se disparan solo después del consentimiento.

## 9. Evitar duplicados

- Mantén GTM como único administrador de etiquetas.
- No añadas una etiqueta directa de Google Ads fuera de GTM.
- Comprueba que existe una sola etiqueta por evento y destino.
- Revisa DebugView y Tag Assistant antes de publicar.
- Verifica que no haya dos contenedores GTM cargados.

La configuración de cuentas, publicación de etiquetas, consentimiento y Search Console requiere acceso a las cuentas reales de Google; no se ha realizado desde este proyecto.
