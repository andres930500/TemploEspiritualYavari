import type { ImageMetadata } from 'astro';
import ogImage from '../assets/images/social/og-provisional.png';
import heroImage from '../assets/images/hero/hero-provisional.svg';
import heroBackgroundImage from '../assets/images/hero/hero-background.jpeg';
import heroMaestraImage from '../assets/images/hero/maestra-tarot-yavari.png';
import masterImage from '../assets/images/master/master-placeholder.svg';

export const PENDING = 'PENDIENTE_DE_CONFIGURAR' as const;

export interface SocialLinks {
	instagram: string;
	facebook: string;
	tiktok: string;
	youtube: string;
}

export interface BusinessHours {
	enabled: boolean;
	description: string;
}

export interface CommercialLegalInfo {
	businessName: string;
	legalRepresentative: string;
	identification: string;
	address: string;
}

export interface SiteConfig {
	commercialName: string;
	heroTitle: string;
	heroTrustLine: string;
	masterName: string;
	masterDescription: string;
	masterExperience: string;
	description: string;
	domain: string;
	whatsappBusinessNumber: string;
	contactMessage: string;
	country: string;
	locale: string;
	commercialEmail: string;
	commercialLegal: CommercialLegalInfo;
	businessHours: BusinessHours;
	socials: SocialLinks;
	shareImage: string;
	heroImage: ImageMetadata;
	heroBackgroundImage: ImageMetadata | null;
	heroMaestraImage: ImageMetadata;
	masterImage: ImageMetadata;
	environment: 'development' | 'staging' | 'production';
	allowIndexing: boolean;
}

const environment = import.meta.env.PUBLIC_SITE_ENV;
const configuredEnvironment: SiteConfig['environment'] =
	environment === 'production' || environment === 'staging' ? environment : 'development';
const configuredDomain = import.meta.env.PUBLIC_SITE_URL ?? '';
const hasConfiguredDomain =
	/^https?:\/\/[^/\s]+(?:\/.*)?$/.test(configuredDomain) &&
	!/(?:^|:\/\/)(?:www\.)?example\.com(?:\/|$)/i.test(configuredDomain);

export const siteConfig: SiteConfig = {
	commercialName: 'TEMPLO ESPIRITUAL YAVARÍ',
	heroTitle: 'Amarres de Amor y Limpiezas Espirituales',
	heroTrustLine: 'SERIEDAD · TRANSPARENCIA · RESPONSABILIDAD',
	masterName: PENDING,
	masterDescription: 'Descripción profesional pendiente de aprobación.',
	masterExperience: PENDING,
	description: 'Conoce nuestros rituales de amor, lecturas de tarot y limpiezas energéticas. Consulta directamente con nuestro maestro.',
	domain: import.meta.env.PUBLIC_SITE_URL || PENDING,
	whatsappBusinessNumber: PENDING,
	contactMessage: 'Mensaje general de contacto pendiente de configurar.',
	country: 'Colombia',
	locale: 'es-CO',
	commercialEmail: PENDING,
	commercialLegal: {
		businessName: PENDING,
		legalRepresentative: PENDING,
		identification: PENDING,
		address: PENDING,
	},
	businessHours: {
		enabled: false,
		description: PENDING,
	},
	socials: {
		instagram: PENDING,
		facebook: PENDING,
		tiktok: PENDING,
		youtube: PENDING,
	},
	shareImage: ogImage.src,
	heroImage,
	heroBackgroundImage,
	heroMaestraImage,
	masterImage,
	environment: configuredEnvironment,
	allowIndexing:
		configuredEnvironment === 'production' &&
		import.meta.env.PUBLIC_ALLOW_INDEXING === 'true' &&
		hasConfiguredDomain,
};

export const siteUrl = hasConfiguredDomain ? configuredDomain : 'http://localhost:4321';
