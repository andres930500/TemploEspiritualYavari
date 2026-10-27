export const PENDING_WHATSAPP = 'PENDIENTE_DE_CONFIGURAR';
export const WHATSAPP_CONTACT_URL = 'https://wa.link/ryxdud';

export const isValidWhatsAppNumber = (number: string): boolean => {
	const normalized = number.replace(/[\s()-]/g, '');
	return /^\+?57\d{10}$/.test(normalized);
};

export const normalizeWhatsAppNumber = (number: string): string | null => {
	if (!isValidWhatsAppNumber(number)) return null;
	return number.replace(/[\s()+-]/g, '');
};

export const createWhatsAppUrl = (_number: string, _message: string): string => {
	return WHATSAPP_CONTACT_URL;
};
