import type { ImageMetadata } from 'astro';
import tarotImage from '../assets/images/services/tarot-provisional.svg';
import loveImage from '../assets/images/services/love-provisional.svg';
import energyImage from '../assets/images/services/energy-provisional.svg';
import heartImage from '../assets/images/services/heart-provisional.svg';
import spiritImage from '../assets/images/services/spirit-provisional.svg';
import ritualImage from '../assets/images/services/ritual-provisional.svg';

export interface Service {
	id: string;
	name: string;
	category: 'amor-relaciones' | 'lecturas-espirituales' | 'limpiezas-rituales';
	shortDescription: string;
	longDescription?: string;
	image: ImageMetadata;
	imageAlt: string;
	whatsappMessage: string;
	active: boolean;
	order: number;
}

const provisionalDescription = 'Descripción provisional pendiente de aprobación.';
type ServiceDefinition = [id: string, name: string, whatsappMessage: string, image: ImageMetadata, imageAlt: string];
type CategorizedServiceDefinition = [...ServiceDefinition, Service['category']];

export const services: Service[] = ([
	['lectura-de-tarot', 'Lectura de tarot', 'Hola, deseo recibir información sobre las lecturas de tarot y consultar con el maestro.', tarotImage, 'Ilustración provisional de cartas de tarot', 'lecturas-espirituales'],
	['amarres-de-amor', 'Amarres de amor', 'Hola, deseo conocer información sobre los servicios de amarres de amor.', loveImage, 'Ilustración provisional de símbolo de conexión', 'amor-relaciones'],
	['limpiezas-energeticas', 'Limpiezas energéticas', 'Hola, quiero información sobre las limpiezas energéticas.', energyImage, 'Ilustración provisional de una vela', 'limpiezas-rituales'],
	['consultas-sentimentales', 'Consultas sentimentales', 'Hola, deseo recibir información sobre las consultas sentimentales.', heartImage, 'Ilustración provisional de corazón y conversación', 'amor-relaciones'],
	['orientacion-espiritual', 'Orientación espiritual', 'Hola, deseo recibir información sobre la orientación espiritual.', spiritImage, 'Ilustración provisional de orientación espiritual', 'lecturas-espirituales'],
	['rituales-espirituales', 'Rituales espirituales', 'Hola, deseo recibir información sobre los rituales espirituales.', ritualImage, 'Ilustración provisional de cristales y luna', 'limpiezas-rituales'],
	['endulzamientos', 'Endulzamientos', 'Hola, encontré su página web y deseo recibir información sobre los rituales de endulzamiento.', loveImage, 'Ilustración provisional de símbolo de conexión', 'amor-relaciones'],
	['rituales-prosperidad', 'Rituales para la prosperidad', 'Hola, deseo conocer los rituales espirituales para la prosperidad y recibir información sobre este servicio.', ritualImage, 'Ilustración provisional de cristales y luna', 'limpiezas-rituales'],
	['lectura-de-tabaco', 'Lectura de tabaco', 'Hola, quiero recibir información sobre las consultas de lectura de tabaco.', spiritImage, 'Ilustración provisional de orientación espiritual', 'lecturas-espirituales'],
] satisfies CategorizedServiceDefinition[]).map(([id, name, whatsappMessage, image, imageAlt, category], index) => ({
	id,
	name,
	category,
	shortDescription: provisionalDescription,
	longDescription: 'Descripción extendida pendiente de aprobación.',
	image,
	imageAlt,
	whatsappMessage,
	active: true,
	order: index + 1,
}));
