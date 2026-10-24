import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeAnalyticsEvent } from '../src/lib/analytics.ts';
import { createWhatsAppUrl, isValidWhatsAppNumber, normalizeWhatsAppNumber } from '../src/lib/whatsapp.ts';

test('valida y normaliza números internacionales', () => {
	assert.equal(isValidWhatsAppNumber('+57 300 123 4567'), true);
	assert.equal(normalizeWhatsAppNumber('+57 300 123 4567'), '573001234567');
	assert.equal(isValidWhatsAppNumber('3001234567'), false);
	assert.equal(isValidWhatsAppNumber('PENDIENTE_DE_CONFIGURAR'), false);
});

test('genera una URL codificada de WhatsApp', () => {
	const url = createWhatsAppUrl('+573001234567', 'Hola, deseo información sobre tarot y atención móvil.');
	assert.equal(
		url,
		'https://wa.me/573001234567?text=Hola%2C%20deseo%20informaci%C3%B3n%20sobre%20tarot%20y%20atenci%C3%B3n%20m%C3%B3vil.',
	);
});

test('no genera enlaces para números pendientes o inválidos', () => {
	assert.equal(createWhatsAppUrl('PENDIENTE_DE_CONFIGURAR', 'Hola'), null);
	assert.equal(createWhatsAppUrl('+570', 'Hola'), null);
});

test('normaliza eventos con service y placement consistentes', () => {
	assert.deepEqual(
		normalizeAnalyticsEvent({
			event: 'whatsapp_click',
			service: 'lectura-de-tarot',
			placement: 'service-card',
		}),
		{
			event: 'whatsapp_click',
			service: 'lectura-de-tarot',
			placement: 'service-card',
		},
	);
});
