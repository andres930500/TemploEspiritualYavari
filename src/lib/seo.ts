import { PENDING, siteConfig, siteUrl } from '../config/site';

export interface SeoData {
	title: string;
	description: string;
	canonicalUrl: string;
	robots: string;
	image?: string;
}

export const createSeoData = (
	pathname: string,
	title: string,
	description: string,
	image = siteConfig.shareImage,
): SeoData => ({
	title,
	description,
	canonicalUrl: new URL(pathname, siteUrl).href,
	robots: siteConfig.allowIndexing ? 'index, follow' : 'noindex, nofollow',
	image: image !== PENDING ? new URL(image, siteUrl).href : undefined,
});

export const organizationJsonLd = (): Record<string, string> | null => {
	if (
		!siteConfig.allowIndexing ||
		siteConfig.commercialName === PENDING ||
		siteConfig.commercialEmail === PENDING ||
		siteConfig.domain === PENDING
	) {
		return null;
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: siteConfig.commercialName,
		url: siteUrl,
		email: siteConfig.commercialEmail,
	};
};
