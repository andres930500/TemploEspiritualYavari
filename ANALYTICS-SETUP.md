# Configuración de analítica

La aplicación tiene preparada una capa interna de eventos en [`src/lib/analytics.ts`](./src/lib/analytics.ts) y una integración directa de Google Ads en [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro). La etiqueta de Google Ads `AW-18523439123` se carga en cada página y la conversión se registra cuando se pulsa cualquier botón de WhatsApp.

## Eventos disponibles

| Evento | Cuándo ocurre | Parámetros |
| --- | --- | --- |
| `whatsapp_click` | Se pulsa un enlace válido de WhatsApp | `service`, `placement` |
| `service_interest` | Se pulsa el CTA de un servicio | `service`, `placement` |
| `faq_interaction` | Se abre una pregunta FAQ | `placement` es `faq`; el identificador queda en `technical.faqId` |

`service` contiene identificadores internos, no nombres de personas ni contenido de chats. `placement` identifica la ubicación del componente, por ejemplo `hero-cta`, `service-card`, `contact-cta`, `floating` o `mobile-bar`.

`service_interest` y `whatsapp_click` representan etapas distintas: el primero indica interés en una categoría; el segundo indica un clic de contacto. Ninguno significa conversación iniciada, lead calificado o venta.

## 1. Configuración directa de Google Ads

La etiqueta global utiliza:

- ID de Google Ads: `AW-18523439123`
- Acción de conversión: `AW-18523439123/K3Q6CKTs9qkdEJOA1YBF`
- Valor enviado: `1.0 COP`

La conversión representa un clic con intención de contacto en WhatsApp. No confirma que la persona haya iniciado una conversación, contratado un servicio o realizado un pago.

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

## 4. Consentimiento y carga de GTM

La función `loadGoogleTagManager()` está preparada en [`src/lib/analytics.ts`](./src/lib/analytics.ts), pero actualmente no se invoca. La futura integración del administrador de consentimiento deberá llamarla solo después de una decisión válida del visitante:

```ts
loadGoogleTagManager({
	containerId: publicAnalyticsConfig.googleTagManagerId,
	consentGranted: true,
});
```

El mismo flujo deberá activar `enableDataLayerBridge(true)` antes de permitir el envío de eventos internos hacia `dataLayer`. No cambies `PUBLIC_GTM_CONSENT_GRANTED` a `true` como sustituto de un consentimiento real. Esa variable solo documenta el estado de preparación.

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
- No añadas otra etiqueta directa de Google Ads a `BaseLayout.astro`.
- Comprueba que existe una sola etiqueta por evento y destino.
- Revisa DebugView y Tag Assistant antes de publicar.
- Verifica que no haya dos contenedores GTM cargados.

La configuración de cuentas, publicación de etiquetas, consentimiento y Search Console requiere acceso a las cuentas reales de Google; no se ha realizado desde este proyecto.
