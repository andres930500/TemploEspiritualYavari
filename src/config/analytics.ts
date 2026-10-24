import { PENDING } from './site';

export interface PublicAnalyticsConfig {
	googleTagManagerId: string;
	consentGranted: boolean;
}

export const publicAnalyticsConfig: PublicAnalyticsConfig = {
	googleTagManagerId: import.meta.env.PUBLIC_GOOGLE_TAG_MANAGER_ID || PENDING,
	consentGranted: import.meta.env.PUBLIC_GTM_CONSENT_GRANTED === 'true',
};
