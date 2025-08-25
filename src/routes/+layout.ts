import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
    return {
        title: 'Tailwind Color Matcher - Convert Hex Colors to Tailwind CSS',
        description:
            "Find the closest Tailwind CSS color to any hex color code. Perfect for maintaining design consistency with Tailwind's color palette. Free online tool for developers and designers.",
        url: url.href,
        canonical: url.href
    };
};

// Enable prerendering for better SEO
export const prerender = true;

// Enable server-side rendering
export const ssr = true;

// Enable trailing slash for consistent URLs
export const trailingSlash = 'always';
