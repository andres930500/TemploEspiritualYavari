import { PENDING, siteConfig, type SiteConfig } from '../config/site';
import { services, type Service } from '../data/services';

export interface ValidationIssue {
	field: string;
	message: string;
	severity: 'error' | 'warning';
}

export interface PublicationStatus {
	ready: boolean;
	issues: ValidationIssue[];
}

const isPending = (value: string): boolean => value === PENDING;

const isValidUrl = (value: string): boolean => {
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
};

const isValidImageReference = (value: string): boolean =>
	value.startsWith('/') || isValidUrl(value);

export const validateWhatsappNumber = (number: string): boolean =>
	isPending(number) || /^\+[1-9]\d{7,14}$/.test(number);

export const validateSiteConfig = (config: SiteConfig): ValidationIssue[] => {
	const issues: ValidationIssue[] = [];

	if (!validateWhatsappNumber(config.whatsappBusinessNumber)) {
		issues.push({
			field: 'whatsappBusinessNumber',
			message: 'Debe usar formato internacional, por ejemplo +573001234567.',
			severity: 'error',
		});
	}

	if (!isPending(config.domain) && !isValidUrl(config.domain)) {
		issues.push({ field: 'domain', message: 'El dominio debe ser una URL HTTP o HTTPS válida.', severity: 'error' });
	}

	if (!isPending(config.shareImage) && !isValidImageReference(config.shareImage)) {
		issues.push({ field: 'shareImage', message: 'La imagen debe ser una ruta local o una URL HTTP/HTTPS válida.', severity: 'error' });
	}

	for (const [network, link] of Object.entries(config.socials)) {
		if (!isPending(link) && !isValidUrl(link)) {
			issues.push({ field: `socials.${network}`, message: 'El enlace debe ser una URL HTTP o HTTPS válida.', severity: 'error' });
		}
	}

	const requiredFields = [
		'commercialName',
		'masterName',
		'domain',
		'whatsappBusinessNumber',
		'commercialEmail',
		'shareImage',
	] as const;
	for (const field of requiredFields) {
		if (isPending(config[field])) {
			issues.push({ field, message: 'Es obligatorio configurarlo antes de publicar.', severity: 'warning' });
		}
	}

	for (const [field, value] of Object.entries(config.commercialLegal)) {
		if (isPending(value)) {
			issues.push({
				field: `commercialLegal.${field}`,
				message: 'El dato legal debe completarse antes de publicar.',
				severity: 'warning',
			});
		}
	}

	return issues;
};

export const validateServices = (items: Service[]): ValidationIssue[] => {
	const issues: ValidationIssue[] = [];
	const ids = new Set<string>();

	for (const service of items) {
		if (ids.has(service.id)) {
			issues.push({ field: `services.${service.id}`, message: 'El identificador está duplicado.', severity: 'error' });
		}
		ids.add(service.id);
		if (service.active && (!service.name.trim() || !service.shortDescription.trim())) {
			issues.push({ field: `services.${service.id}`, message: 'Un servicio activo requiere nombre y descripción.', severity: 'error' });
		}
		if (!Number.isInteger(service.order) || service.order < 1) {
			issues.push({ field: `services.${service.id}.order`, message: 'El orden debe ser un entero positivo.', severity: 'error' });
		}
	}

	return issues;
};

export const validateConfiguration = (config: SiteConfig, items: Service[]): ValidationIssue[] => [
	...validateSiteConfig(config),
	...validateServices(items),
];

export const getPublicationStatus = (config: SiteConfig, items: Service[]): PublicationStatus => {
	const issues = validateConfiguration(config, items);
	return {
		ready: issues.length === 0,
		issues,
	};
};

export const configurationIssues = validateConfiguration(
	siteConfig,
	services,
);

export const publicationStatus = getPublicationStatus(siteConfig, services);
