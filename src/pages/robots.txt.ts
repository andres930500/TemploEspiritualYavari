import { siteConfig, siteUrl } from '../config/site';

export function GET() {
	const lines = [
		'User-agent: *',
	];

	if (siteConfig.allowIndexing) {
		lines.push('Allow: /');
		lines.push(`Sitemap: ${new URL('/sitemap-index.xml', siteUrl).href}`);
	} else {
		lines.push('Disallow: /');
	}

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
