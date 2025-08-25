<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import ColorInput from '$components/ColorInput.svelte';
	import ColorMatch from '$components/ColorMatch.svelte';
	import EmptyState from '$components/main/EmptyState.svelte';
	import Footer from '$components/main/Footer.svelte';
	import MultipleMatches from '$components/MultipleMatches.svelte';

	import { BookOpen, GitGraph, Palette, Share2, TriangleAlert } from 'lucide-svelte';

	import type { ColorMatch as ColorMatchType } from '$types/color';
	import type { PageData } from './$types';

	import { findMultipleMatches } from '$utils/colorMatching';
	import { extractHexColor } from '$utils/colorValidation';
	import { exampleColors } from '$utils/constants';

	let { data }: { data: PageData } = $props();

	// Step 1: Declare reactive state variables
	let inputValue = $state(data.initialColor || '');
	let selectedMatch = $state<ColorMatchType | null>(null);
	let multipleMatches = $state<ColorMatchType[]>([]);
	let lastValidatedColor = $state<string | null>(null); // Track the last color we processed
	let shareUrl = $state('');

	// Step 2: Derived reactive values

	// validatedColor updates automatically whenever inputValue changes
	const validatedColor = $derived(inputValue.trim() ? extractHexColor(inputValue) : null);

	// isValidInput flag
	const isValidInput = $derived(validatedColor !== null);

	// inputError message
	const inputError = $derived(
		inputValue.trim() && !isValidInput
			? 'Please enter a valid hex color (e.g., #FF5733 or FF5733)'
			: undefined
	);

	// Dynamic background style based on validated color
	const backgroundStyle = $derived(() => {
		if (validatedColor) {
			return `background: linear-gradient(135deg, ${validatedColor}15, ${validatedColor}25, ${validatedColor}10), linear-gradient(to bottom right, #ffffff, #f8fafc);`;
		}
		return '';
	});

	// Reactive effect: when validatedColor changes, update matches
	$effect(() => {
		if (validatedColor) {
			// Only update matches if we have a new color
			if (validatedColor !== lastValidatedColor) {
				const matches = findMultipleMatches(validatedColor, 8);
				multipleMatches = matches;
				selectedMatch = matches[0] || null;
				lastValidatedColor = validatedColor;
			}
		} else {
			// Clear everything when no valid color
			if (multipleMatches.length > 0 || selectedMatch !== null) {
				multipleMatches = [];
				selectedMatch = null;
				lastValidatedColor = null;
			}
		}
	});

	// Update URL when color changes for better SEO and sharing
	$effect(() => {
		if (browser && validatedColor && validatedColor !== data.initialColor) {
			const url = new URL(data.url);
			url.searchParams.set('color', validatedColor);
			goto(url.toString(), { replaceState: true, noScroll: true });
		}
	});

	// Select a color match when user clicks one
	function handleSelectMatch(match: ColorMatchType) {
		selectedMatch = match;
	}

	// Set input value from an example color
	function handleExampleColor(color: string) {
		inputValue = color;
		// Update URL immediately for better UX
		if (browser) {
			const url = new URL(data.url);
			url.searchParams.set('color', color);
			goto(url.toString(), { replaceState: true, noScroll: true });
		}
	}

	// Share functionality
	async function shareColor() {
		if (!validatedColor) return;

		const url = new URL(data.url);
		url.searchParams.set('color', validatedColor);
		shareUrl = url.toString();

		if (navigator.share) {
			await navigator.share({
				title: `Tailwind Color Match for ${validatedColor}`,
				text: `Check out this Tailwind CSS color match for ${validatedColor}`,
				url: shareUrl
			});
		} else {
			await navigator.clipboard.writeText(shareUrl);
		}
	}
</script>

<svelte:head>
	{#if validatedColor && selectedMatch}
		<title>
			Tailwind Color Matcher | {validatedColor} → {selectedMatch.color.name}
		</title>
		<meta
			name="description"
			content={`Convert ${validatedColor} to Tailwind CSS color ${selectedMatch.color.name} (${selectedMatch.color.hex}). ${selectedMatch.similarity.toFixed(1)}% similarity match with class name ${selectedMatch.color.className}.`}
		/>

		<!-- Open Graph -->
		<meta property="og:type" content="website" />
		<meta
			property="og:title"
			content={`Tailwind Color Matcher | ${validatedColor} → ${selectedMatch.color.name}`}
		/>
		<meta
			property="og:description"
			content={`Convert ${validatedColor} to Tailwind CSS color ${selectedMatch.color.name}. ${selectedMatch.similarity.toFixed(1)}% match.`}
		/>
		<meta
			property="og:image"
			content={`${data.url}/api/og?color=${encodeURIComponent(validatedColor)}&match=${encodeURIComponent(selectedMatch.color.name)}`}
		/>
		<meta property="og:url" content={`${data.url}/${encodeURIComponent(validatedColor)}`} />

		<!-- Twitter -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta
			name="twitter:title"
			content={`Tailwind Color Matcher | ${validatedColor} → ${selectedMatch.color.name}`}
		/>
		<meta
			name="twitter:description"
			content={`Convert ${validatedColor} to Tailwind CSS color ${selectedMatch.color.name}.`}
		/>
		<meta
			name="twitter:image"
			content={`${data.url}/api/og?color=${encodeURIComponent(validatedColor)}&match=${encodeURIComponent(selectedMatch.color.name)}`}
		/>

		<!-- Structured Data (JSON-LD) -->
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				"name": `Tailwind Color Matcher | ${validatedColor} → ${selectedMatch.color.name}`,
				"description": `Convert ${validatedColor} to Tailwind CSS color ${selectedMatch.color.name}.`,
				"url": `${data.url}/${encodeURIComponent(validatedColor)}`
			})}
		</script>
	{:else}
		<title>Tailwind Color Matcher | Convert HEX to Tailwind CSS Colors</title>
		<meta
			name="description"
			content="Easily convert HEX colors to Tailwind CSS colors with similarity percentages and class names."
		/>
	{/if}
</svelte:head>

<div
	class="min-h-screen transition-all duration-500 ease-in-out"
	class:bg-gradient-to-br={!validatedColor}
	class:from-blue-50={!validatedColor}
	class:via-white={!validatedColor}
	class:to-purple-50={!validatedColor}
	style={backgroundStyle()}
>
	<!-- Skip to main content for accessibility -->
	<a
		href="#main-content"
		class="sr-only rounded-lg bg-blue-600 px-4 py-2 text-white
           shadow-lg transition focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
           focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
	>
		Skip to main content
	</a>

	<div class="container mx-auto max-w-4xl px-4 py-8">
		<!-- Header with enhanced SEO -->
		<header class="mb-8 px-4 text-center sm:px-0">
			<div class="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<div class="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
					<Palette class="h-6 w-6 text-white sm:h-8 sm:w-8" aria-hidden="true" />
				</div>
				<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Tailwind Color Matcher</h1>
			</div>
			<p class="mx-auto mb-6 max-w-2xl text-base text-gray-600 sm:text-lg">
				Find the closest <strong>Tailwind CSS color</strong> to any hex color code. Perfect for maintaining
				design consistency with Tailwind's comprehensive color palette.
			</p>

			<!-- Action buttons for better engagement -->
			<div class="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
				<a
					href="https://github.com/ShreyPurohit/Tailwind-Color-Matcher"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 rounded px-3 py-1.5 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					<GitGraph class="h-4 w-4" aria-hidden="true" />
					View on GitHub
				</a>
				<a
					href="https://tailwindcss.com/docs/background-color"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 rounded px-3 py-1.5 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					<BookOpen class="h-4 w-4" aria-hidden="true" />
					Tailwind Docs
				</a>
				{#if validatedColor}
					<button
						onclick={shareColor}
						class="flex items-center gap-2 rounded px-3 py-1.5 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						<Share2 class="h-4 w-4" aria-hidden="true" />
						Share Color
					</button>
				{/if}
			</div>
		</header>

		<!-- Main content with semantic HTML -->
		<main id="main-content">
			<!-- Input Section -->
			<section
				class="mb-6 rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
				aria-labelledby="input-section"
			>
				<h2 id="input-section" class="sr-only">Color Input Section</h2>
				<ColorInput bind:value={inputValue} {isValidInput} {inputError} />

				<!-- Example Colors -->
				<div class="mt-6">
					<h3 class="mb-3 text-sm font-medium text-gray-700">Popular Color Examples:</h3>
					<div class="flex flex-wrap gap-2" role="group" aria-label="Example colors">
						{#each exampleColors as color (color)}
							<button
								onclick={() => handleExampleColor(color)}
								class="group flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/90 px-3 py-2 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-100/90"
								title={`Try ${color} - Click to test this color`}
								aria-label={`Try example color ${color}`}
							>
								<div
									class="h-4 w-4 rounded border border-gray-300"
									style="background-color: {color};"
									aria-hidden="true"
								></div>
								<span class="font-mono text-sm text-gray-600 group-hover:text-gray-900">
									{color}
								</span>
							</button>
						{/each}
					</div>
				</div>
			</section>

			<!-- Results Section -->
			{#if validatedColor}
				<section class="space-y-6" aria-labelledby="results-section">
					<h2 id="results-section" class="sr-only">Color Match Results</h2>
					{#if selectedMatch}
						<ColorMatch originalColor={validatedColor} match={selectedMatch} />
						<MultipleMatches
							matches={multipleMatches}
							onSelectMatch={(match) => handleSelectMatch(match)}
							{selectedMatch}
						/>
					{:else}
						<!-- No Match Found -->
						<div
							class="rounded-xl border border-orange-200 bg-orange-50/90 p-6 backdrop-blur-sm"
							role="alert"
						>
							<div class="mb-3 flex items-center gap-3">
								<TriangleAlert class="h-6 w-6 text-orange-500" aria-hidden="true" />
								<h3 class="text-lg font-semibold text-orange-900">No Close Match Found</h3>
							</div>
							<p class="mb-4 text-orange-800">
								The color
								<code class="rounded bg-orange-100 px-2 py-1 font-mono text-sm">
									{validatedColor}
								</code>
								doesn't have a close match in the Tailwind color palette. Consider using a custom color
								or choosing a different shade.
							</p>
							<div class="rounded-lg bg-orange-100/90 p-4 backdrop-blur-sm">
								<p class="text-sm text-orange-700">
									<strong>Tip:</strong> Tailwind CSS supports arbitrary values! You can use <br />
									<code class="font-mono">bg-[{validatedColor}]</code> for exact color matching.
								</p>
							</div>
						</div>
					{/if}
				</section>
			{/if}

			<!-- Empty State -->
			{#if !inputValue.trim()}
				<EmptyState />
			{/if}
		</main>

		<!-- Enhanced Footer with more SEO content -->
		<Footer />
	</div>
</div>
