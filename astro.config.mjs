// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const configuredSite = process.env.PUBLIC_SITE_URL;
const isValidSiteUrl = configuredSite &&
	/^https?:\/\/[^/\s]+(?:\/.*)?$/.test(configuredSite) &&
	!/(?:^|:\/\/)(?:www\.)?example\.com(?:\/|$)/i.test(configuredSite);

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: isValidSiteUrl ? configuredSite : 'http://localhost:4321',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
