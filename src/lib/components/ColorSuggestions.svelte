<script lang="ts">
	import type { ColorSuggestionsProps } from '$lib/types/color';
	import { getColorFamilySuggestions } from '$lib/utils/colorMatching';
	import { getContrastingTextColor } from '$lib/utils/colorConversion';
	import { Lightbulb } from 'lucide-svelte';

	let { userColor, onSelectColor }: ColorSuggestionsProps = $props();

	// Use the previously unused getColorFamilySuggestions function
	const suggestions = $derived(getColorFamilySuggestions(userColor).slice(0, 8));
</script>

{#if suggestions.length > 0}
	<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
		<div class="mb-4 flex items-center gap-3">
			<Lightbulb class="h-5 w-5 text-yellow-500" />
			<h3 class="text-lg font-semibold text-gray-900">Color Family Suggestions</h3>
			<span class="text-sm text-gray-500">Similar colors you might like</span>
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
			{#each suggestions as suggestion (suggestion.color.name)}
				{@const textColor = getContrastingTextColor(suggestion.color.hex)}
				<button
					onclick={() => onSelectColor(suggestion.color.hex)}
					class="group rounded-lg border-2 border-gray-200 p-3 transition-all duration-200 hover:border-gray-300 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					title="Try {suggestion.color.name} ({suggestion.similarity.toFixed(0)}% similar)"
				>
					<div
						class="mb-2 flex h-12 w-full items-center justify-center rounded-md border border-gray-200"
						style="background-color: {suggestion.color.hex}; color: {textColor};"
					>
						<span class="font-mono text-xs opacity-75">
							{suggestion.color.hex.slice(1, 4)}
						</span>
					</div>
					<p class="truncate text-xs font-medium text-gray-900">
						{suggestion.color.name}
					</p>
					<p class="text-xs text-gray-500">
						{suggestion.similarity.toFixed(0)}% match
					</p>
				</button>
			{/each}
		</div>

		<div class="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
			<p class="text-xs text-yellow-700">
				<strong>Tip:</strong> These suggestions are based on perceptual color similarity in the LAB color
				space, showing colors that would work well together in your design.
			</p>
		</div>
	</div>
{/if}
