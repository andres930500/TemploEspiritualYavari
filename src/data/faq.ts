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
		answer: 'Selecciona el servicio que te interesa y solicita información mediante el botón de contacto. Te orientaremos sobre el proceso de atención.',
		active: true,
		order: 1,
	},
	{
		id: 'contactar-whatsapp',
		question: '¿Cómo puedo contactar por WhatsApp?',
		answer: 'Puedes utilizar los botones de WhatsApp disponibles en el sitio para solicitar información y coordinar la atención.',
		active: true,
		order: 2,
	},
	{
		id: 'servicios-disponibles',
		question: '¿Cómo puedo conocer los servicios disponibles?',
		answer: 'Consulta la sección de servicios para conocer las opciones disponibles y sus características generales.',
		active: true,
		order: 3,
	},
	{
		id: 'informacion-precios',
		question: '¿Cómo solicito información sobre precios?',
		answer: 'El valor depende de las características, complejidad, tiempo de ejecución y tipología del servicio. Se informa con claridad durante la consulta para tu aprobación.',
		active: true,
		order: 4,
	},
	{
		id: 'orientacion-proceso',
		question: '¿Puedo recibir orientación sobre el proceso?',
		answer: 'Sí. Puedes solicitar orientación sobre el servicio, la consulta inicial y los pasos necesarios antes de decidir si deseas continuar.',
		active: true,
		order: 5,
	},
];
