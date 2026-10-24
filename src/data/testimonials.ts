export interface Testimonial {
	authorizedName: string;
	testimonial: string;
	date?: string;
	serviceId?: string;
	publicationAuthorized: boolean;
	published: boolean;
}

export const testimonials: Testimonial[] = [];
