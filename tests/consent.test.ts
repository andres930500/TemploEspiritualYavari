import assert from 'node:assert/strict';
import test from 'node:test';
import { consentToGoogleState, deniedConsent, readConsentPreferences, saveConsentPreferences } from '../src/lib/consent.ts';

test('inicia con consentimiento opcional denegado', () => {
	assert.deepEqual(consentToGoogleState(deniedConsent), {
		analytics_storage: 'denied',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied',
	});
});

test('guarda, lee y actualiza preferencias', () => {
	const values = new Map<string, string>();
	const storage = {
		getItem: (key: string) => values.get(key) ?? null,
		setItem: (key: string, value: string) => values.set(key, value),
	};
	const preferences = { analytics: true, advertising: false };
	saveConsentPreferences(storage, preferences);
	assert.deepEqual(readConsentPreferences(storage), preferences);
	assert.equal(consentToGoogleState(preferences).analytics_storage, 'granted');
	assert.equal(consentToGoogleState(preferences).ad_storage, 'denied');
});
