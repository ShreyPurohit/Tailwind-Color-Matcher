import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		title: 'About Tailwind Color Matcher - How It Works & Features',
		description:
			'Learn how Tailwind Color Matcher works, its features, and the technology behind accurate color matching using perceptual color distance algorithms.'
	};
};

export const prerender = true;
export const ssr = true;
