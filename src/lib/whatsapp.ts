export const PENDING_WHATSAPP = 'PENDIENTE_DE_CONFIGURAR';

export const isValidWhatsAppNumber = (number: string): boolean => {
	const normalized = number.replace(/[\s()-]/g, '');
	return /^\+?57\d{10}$/.test(normalized);
};

export const normalizeWhatsAppNumber = (number: string): string | null => {
	if (!isValidWhatsAppNumber(number)) return null;
	return number.replace(/[\s()+-]/g, '');
};

export const createWhatsAppUrl = (number: string, message: string): string | null => {
	if (number === PENDING_WHATSAPP || !isValidWhatsAppNumber(number)) return null;
	const normalizedNumber = normalizeWhatsAppNumber(number);
	if (!normalizedNumber) return null;
	return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
};
