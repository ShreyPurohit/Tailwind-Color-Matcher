<script lang="ts">
	import { Palette } from 'lucide-svelte';
	import type { ColorMatch } from '$types/color';
	import { cn } from '$utils/constants';

	interface Props {
		matches: ColorMatch[];
		onSelectMatch: (match: ColorMatch) => void;
		selectedMatch?: ColorMatch;
	}

	let { matches, onSelectMatch, selectedMatch }: Props = $props();

	// Early return logic converted to reactive condition
	const shouldShow = $derived(matches.length > 1);
</script>

{#if shouldShow}
	<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
		<div class="mb-4 flex items-center gap-3">
			<Palette class="h-5 w-5 text-purple-500" />
			<h3 class="text-lg font-semibold text-gray-900">Alternative Matches</h3>
			<span class="text-sm text-gray-500">
				({matches.length - 1} more options)
			</span>
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each matches.slice(1) as match (match.color.name)}
				<button
					onclick={() => onSelectMatch(match)}
					class={cn(
						'group rounded-lg border-2 p-3 transition-all duration-200 hover:shadow-md',
						selectedMatch?.color.name === match.color.name
							? 'border-blue-500 bg-blue-50'
							: 'border-gray-200 bg-white hover:border-gray-300'
					)}
				>
					<div
						class="mb-2 h-12 w-full rounded-md border border-gray-200"
						style="background-color: {match.color.hex};"
					></div>
					<p class="truncate text-xs font-medium text-gray-900">
						{match.color.name}
					</p>
					<p class="text-xs text-gray-500">
						{match.similarity.toFixed(0)}% match
					</p>
				</button>
			{/each}
		</div>
	</div>
{/if}
