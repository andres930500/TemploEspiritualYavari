export const CONSENT_STORAGE_KEY = 'site_consent_preferences';

export interface ConsentPreferences {
	analytics: boolean;
	advertising: boolean;
}

export const deniedConsent: ConsentPreferences = {
	analytics: false,
	advertising: false,
};

export const consentToGoogleState = (preferences: ConsentPreferences): Record<string, string> => ({
	analytics_storage: preferences.analytics ? 'granted' : 'denied',
	ad_storage: preferences.advertising ? 'granted' : 'denied',
	ad_user_data: preferences.advertising ? 'granted' : 'denied',
	ad_personalization: preferences.advertising ? 'granted' : 'denied',
});

export const readConsentPreferences = (storage: Pick<Storage, 'getItem'>): ConsentPreferences | null => {
	const stored = storage.getItem(CONSENT_STORAGE_KEY);
	if (!stored) return null;
	try {
		const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;
		if (typeof parsed.analytics !== 'boolean' || typeof parsed.advertising !== 'boolean') return null;
		return { analytics: parsed.analytics, advertising: parsed.advertising };
	} catch {
		return null;
	}
};

export const saveConsentPreferences = (
	storage: Pick<Storage, 'setItem'>,
	preferences: ConsentPreferences,
): void => {
	storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
};

export const pushConsentUpdate = (
	dataLayer: Array<Record<string, unknown>>,
	preferences: ConsentPreferences,
): void => {
	dataLayer.push({
		'0': 'consent',
		'1': 'update',
		'2': consentToGoogleState(preferences),
	});
};
