<script lang="ts">
	import ColorInput from '$components/ColorInput.svelte';
	import ColorMatch from '$components/ColorMatch.svelte';
	import MultipleMatches from '$components/MultipleMatches.svelte';
	import { Palette, Sparkles, TriangleAlert } from 'lucide-svelte';

	import type { ColorMatch as ColorMatchType } from '$types/color';
	import { findMultipleMatches } from '$utils/colorMatching';
	import { extractHexColor } from '$utils/colorValidation';
	import { exampleColors } from '$utils/constants';

	// Step 1: Declare reactive state variables
	let inputValue = $state('');
	let selectedMatch = $state<ColorMatchType | null>(null);
	let multipleMatches = $state<ColorMatchType[]>([]);

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

	// Reactive effect: when validatedColor changes, update matches
	$effect(() => {
		if (validatedColor) {
			const matches = findMultipleMatches(validatedColor, 8);

			const isSameMatchList =
				matches.length === multipleMatches.length &&
				matches.every((m, i) => m.color.hex === multipleMatches[i].color.hex);

			const firstMatch = matches[0] || null;
			const isSameSelected = selectedMatch?.color.hex === firstMatch?.color.hex;

			if (!isSameMatchList) {
				multipleMatches = matches;
			}

			if (!isSameSelected) {
				selectedMatch = firstMatch;
			}
		} else {
			if (multipleMatches.length > 0 || selectedMatch !== null) {
				multipleMatches = [];
				selectedMatch = null;
			}
		}
	});

	// Select a color match when user clicks one
	function handleSelectMatch(match: ColorMatchType) {
		selectedMatch = match;
	}

	// Set input value from an example color
	function handleExampleColor(color: string) {
		inputValue = color;
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
	<div class="container mx-auto max-w-4xl px-4 py-8">
		<!-- Header -->
		<div class="mb-8 text-center">
			<div class="mb-4 flex items-center justify-center gap-3">
				<div class="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
					<Palette class="h-8 w-8 text-white" />
				</div>
				<h1 class="text-3xl font-bold text-gray-900">Tailwind Color Matcher</h1>
			</div>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Find the closest Tailwind CSS color to any hex color. Perfect for maintaining design
				consistency with Tailwind's color palette.
			</p>
		</div>

		<!-- Input Section -->
		<div class="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<ColorInput bind:value={inputValue} {isValidInput} {inputError} />

			<!-- Example Colors -->
			<div class="mt-6">
				<p class="mb-3 text-sm font-medium text-gray-700">Try these examples:</p>
				<div class="flex flex-wrap gap-2">
					{#each exampleColors as color (color)}
						<button
							onclick={() => handleExampleColor(color)}
							class="group flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition-colors duration-200 hover:bg-gray-100"
							title={`Try ${color}`}
						>
							<div
								class="h-4 w-4 rounded border border-gray-300"
								style="background-color: {color};"
							></div>
							<span class="font-mono text-sm text-gray-600 group-hover:text-gray-900">
								{color}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Results -->
		{#if validatedColor}
			<div class="space-y-6">
				{#if selectedMatch}
					<ColorMatch originalColor={validatedColor} match={selectedMatch} />
					<MultipleMatches
						matches={multipleMatches}
						onSelectMatch={(match) => handleSelectMatch(match)}
						{selectedMatch}
					/>
				{:else}
					<!-- No Match Found -->
					<div class="rounded-xl border border-orange-200 bg-orange-50 p-6">
						<div class="mb-3 flex items-center gap-3">
							<TriangleAlert class="h-6 w-6 text-orange-500" />
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
						<div class="rounded-lg bg-orange-100 p-4">
							<p class="text-sm text-orange-700">
								<strong>Tip:</strong> Tailwind CSS supports arbitrary values! You can use <br />
								<code class="font-mono">bg-[{validatedColor}]</code> for exact color matching.
							</p>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Empty State -->
		{#if !inputValue.trim()}
			<div class="py-12 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200"
				>
					<Sparkles class="h-8 w-8 text-gray-400" />
				</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-600">Ready to Match Colors</h3>
				<p class="mx-auto max-w-md text-gray-500">
					Enter a hex color code above to find its closest Tailwind CSS equivalent. Great for
					maintaining design consistency!
				</p>
			</div>
		{/if}

		<!-- Footer -->
		<div class="mt-12 border-t border-gray-200 pt-8">
			<div class="text-center text-sm text-gray-500">
				<p>
					Built with SvelteKit, TypeScript, and Tailwind CSS • Uses perceptual color distance in LCH
					color space for accurate matching
				</p>
			</div>
		</div>
	</div>
</div>
