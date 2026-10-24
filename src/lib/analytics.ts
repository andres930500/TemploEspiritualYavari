export type AnalyticsEventName = 'whatsapp_click' | 'service_interest' | 'faq_interaction';

export interface AnalyticsEvent {
	event: AnalyticsEventName;
	service?: string;
	placement?: string;
	technical?: Record<string, string>;
}

export interface GtmConfig {
	containerId: string;
	consentGranted: boolean;
}

export const normalizeAnalyticsEvent = (event: AnalyticsEvent): AnalyticsEvent => ({
	event: event.event,
	...(event.service ? { service: event.service } : {}),
	...(event.placement ? { placement: event.placement } : {}),
	...(event.technical ? { technical: event.technical } : {}),
});

export const emitInternalAnalyticsEvent = (event: AnalyticsEvent): void => {
	if (typeof window === 'undefined') return;
	window.dispatchEvent(new CustomEvent(event.event, {
		detail: normalizeAnalyticsEvent(event),
	}));
};

export const enableDataLayerBridge = (consentGranted: boolean): boolean => {
	if (typeof window === 'undefined' || !consentGranted || window.__analyticsBridgeEnabled) return false;
	window.dataLayer = window.dataLayer || [];
	for (const eventName of ['whatsapp_click', 'service_interest', 'faq_interaction'] as AnalyticsEventName[]) {
		window.addEventListener(eventName, (event) => {
			const detail = (event as CustomEvent<AnalyticsEvent>).detail;
			window.dataLayer?.push({ ...normalizeAnalyticsEvent(detail) });
		});
	}
	window.__analyticsBridgeEnabled = true;
	return true;
};

export const loadGoogleTagManager = (config: GtmConfig): boolean => {
	if (typeof document === 'undefined' || !config.consentGranted || !/^GTM-[A-Z0-9]+$/i.test(config.containerId)) {
		return false;
	}
	if (document.querySelector(`script[data-gtm-id="${config.containerId}"]`)) return true;

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.containerId)}`;
	script.dataset.gtmId = config.containerId;
	document.head.appendChild(script);
	return true;
};
