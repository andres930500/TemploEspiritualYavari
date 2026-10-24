export interface FaqItem {
	id: string;
	question: string;
	answer: string;
	active: boolean;
	order: number;
}

export const faqItems: FaqItem[] = [
	{
		id: 'solicitar-consulta',
		question: '¿Cómo puedo solicitar una consulta?',
		answer: 'La forma de solicitar una consulta se confirmará cuando la información comercial sea aprobada.',
		active: true,
		order: 1,
	},
	{
		id: 'contactar-whatsapp',
		question: '¿Cómo puedo contactar por WhatsApp?',
		answer: 'El canal de contacto y sus instrucciones se configurarán posteriormente.',
		active: true,
		order: 2,
	},
	{
		id: 'servicios-disponibles',
		question: '¿Cómo puedo conocer los servicios disponibles?',
		answer: 'Los servicios disponibles se mostrarán en el catálogo cuando el contenido sea aprobado.',
		active: true,
		order: 3,
	},
	{
		id: 'informacion-precios',
		question: '¿Cómo solicito información sobre precios?',
		answer: 'La información sobre precios se facilitará por el canal de contacto configurado.',
		active: true,
		order: 4,
	},
	{
		id: 'orientacion-proceso',
		question: '¿Puedo recibir orientación sobre el proceso?',
		answer: 'El proceso se explicará con información aprobada antes de la publicación definitiva.',
		active: true,
		order: 5,
	},
];
