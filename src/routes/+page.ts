import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	// Extract color from URL if present for better SEO and sharing
	const searchParams = url.searchParams;
	const colorParam = searchParams.get('color');

	return {
		title: 'Tailwind Color Matcher - Convert Hex Colors to Tailwind CSS',
		description:
			"Find the closest Tailwind CSS color to any hex color code. Perfect for maintaining design consistency with Tailwind's color palette. Free online tool for developers and designers.",
		initialColor: colorParam || '',
		canonical: url.origin + url.pathname,
		// Add structured data for the page
		structuredData: {
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: 'Tailwind Color Matcher',
			description: 'Find the closest Tailwind CSS color to any hex color code',
			url: url.href,
			applicationCategory: 'DeveloperApplication',
			operatingSystem: 'Web Browser'
		}
	};
};

export const prerender = false;
export const ssr = true;
