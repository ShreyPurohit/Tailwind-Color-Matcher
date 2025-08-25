<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.css';

	let { data, children } = $props();

	// Inject Vercel Analytics in production only
	if (!dev) {
		inject();
		injectSpeedInsights();
	}
</script>

<svelte:head>
	<!-- Dynamic meta tags based on current page -->
	<title>
		{data?.title || 'Tailwind Color Matcher - Convert Hex Colors to Tailwind CSS'}
	</title>
	<meta
		name="description"
		content={data?.description ||
			"Find the closest Tailwind CSS color to any hex color code. Perfect for maintaining design consistency with Tailwind's color palette. Free online tool for developers and designers."}
	/>

	<!-- DNS prefetch for external resources -->
	<link rel="dns-prefetch" href="//fonts.googleapis.com" />
	<link rel="dns-prefetch" href="//fonts.gstatic.com" />
</svelte:head>

{@render children?.()}
