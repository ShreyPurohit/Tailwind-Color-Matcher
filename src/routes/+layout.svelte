<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	let { data, children } = $props();

	// SEO and performance optimizations
	onMount(() => {
		// Add performance monitoring
		if (typeof window !== 'undefined' && 'performance' in window) {
			// Track Core Web Vitals
			import('web-vitals')
				.then(({ onCLS, onTTFB, onFCP, onLCP, onINP }) => {
					onCLS(console.log);
					onINP(console.log);
					onFCP(console.log);
					onLCP(console.log);
					onTTFB(console.log);
				})
				.catch(() => {
					// Silently fail if web-vitals is not available
				});
		}
	});
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
