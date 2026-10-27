export interface Testimonial {
	authorizedName: string;
	testimonial: string;
	date?: string;
	serviceId?: string;
	publicationAuthorized: boolean;
	published: boolean;
}

export const testimonials: Testimonial[] = [
	{
		authorizedName: 'Cliente anónimo',
		testimonial: '“Maestro, fascinado. Mi pareja está conmigo nuevamente y entiendo que también tuve errores.”',
		serviceId: 'amarre-amor',
		publicationAuthorized: true,
		published: true,
	},
	{
		authorizedName: 'Cliente anónimo',
		testimonial: '“La verdad todo está saliendo muy bien. Mi esposa cambió totalmente y volvió a ser una mujer amorosa.”',
		serviceId: 'amarre-amor',
		publicationAuthorized: true,
		published: true,
	},
	{
		authorizedName: 'Cliente anónimo',
		testimonial: '“Me alegra contar que el proceso avanza muy bien. Estamos viendo cosas positivas.”',
		serviceId: 'orientacion-espiritual',
		publicationAuthorized: true,
		published: true,
	},
	{
		authorizedName: 'Cliente anónimo',
		testimonial: '“La relación con mi pareja va a seguir. Por ahora no vamos a volver a vivir juntos, pero todo marcha muy bien.”',
		serviceId: 'orientacion-amorosa',
		publicationAuthorized: true,
		published: true,
	},
	{
		authorizedName: 'Cliente anónimo',
		testimonial: '“Muchas gracias por lo que ha hecho hasta ahora. Después de mi cita, estaré comentando cómo salió todo.”',
		serviceId: 'orientacion-espiritual',
		publicationAuthorized: true,
		published: true,
	},
];
