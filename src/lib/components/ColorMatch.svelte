<script lang="ts">
	import type { ColorMatchProps } from '$lib/types/color';
	import { cn } from '$lib/utils/constants';
	import { getColorInfo, getContrastingTextColor } from '$lib/utils/colorConversion';
	import { Check, Copy, ExternalLink, Zap } from 'lucide-svelte';

	let { originalColor, match }: ColorMatchProps = $props();
	let copiedField = $state<string | null>(null);

	async function copyToClipboard(text: string, field: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedField = field;
			setTimeout(() => (copiedField = null), 2000);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
		}
	}

	function getSimilarityColor(similarity: number): string {
		if (similarity === 100) return 'text-green-700 bg-green-100 border-green-200';
		if (similarity >= 90) return 'text-green-600 bg-green-100 border-green-200';
		if (similarity >= 75) return 'text-blue-600 bg-blue-100 border-blue-200';
		if (similarity >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
		return 'text-orange-600 bg-orange-100 border-orange-200';
	}

	function getSimilarityLabel(similarity: number): string {
		if (similarity === 100) return 'Perfect Match';
		if (similarity >= 90) return 'Excellent Match';
		if (similarity >= 75) return 'Good Match';
		if (similarity >= 60) return 'Fair Match';
		return 'Approximate Match';
	}

	const isExactMatch = $derived(match.distance === 0);

	// Get detailed color information using the previously unused getColorInfo function
	const originalColorInfo = $derived(getColorInfo(originalColor));
	const matchColorInfo = $derived(getColorInfo(match.color.hex));

	// Get contrasting text colors for better readability using previously unused function
	const originalTextColor = $derived(getContrastingTextColor(originalColor));
	const matchTextColor = $derived(getContrastingTextColor(match.color.hex));
</script>

<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
	<div class="mb-6 flex flex-wrap items-center gap-3">
		<Zap class={cn('h-5 w-5', isExactMatch ? 'text-green-500' : 'text-blue-500')} />
		<h3 class="text-lg font-semibold text-gray-900">
			{isExactMatch ? 'Perfect Color Match Found' : 'Color Match Found'}
		</h3>
		<div
			class={cn(
				'rounded-full border px-3 py-1 text-xs font-medium',
				getSimilarityColor(match.similarity)
			)}
		>
			{getSimilarityLabel(match.similarity)} ({match.similarity.toFixed(1)}%)
		</div>
		{#if isExactMatch}
			<div
				class="flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs text-green-600"
			>
				<Check class="h-3 w-3" />
				Exact Match
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Original Color -->
		<div class="space-y-3">
			<h4 class="font-medium text-gray-700">Your Color</h4>
			<div class="relative">
				<div
					class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-gray-200 shadow-inner"
					style="background-color: {originalColor}; color: {originalTextColor};"
				>
					<span class="font-mono text-sm font-semibold drop-shadow-sm">
						{originalColor}
					</span>
				</div>
				{#if originalColorInfo}
					<div
						class="bg-opacity-70 absolute bottom-2 left-2 rounded bg-black px-2 py-1 text-xs text-white"
					>
						L: {originalColorInfo.luminance.toFixed(2)}
					</div>
				{/if}
				<button
					onclick={() => copyToClipboard(originalColor, 'original')}
					class="bg-opacity-90 hover:bg-opacity-100 absolute top-2 right-2 rounded-lg bg-white p-2 shadow-sm transition-all duration-200 hover:scale-105"
					title="Copy hex code"
				>
					{#if copiedField === 'original'}
						<Check class="h-4 w-4 text-green-600" />
					{:else}
						<Copy class="h-4 w-4 text-gray-600" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Matched Color -->
		<div class="space-y-3">
			<h4 class="font-medium text-gray-700">Tailwind Match</h4>
			<div class="relative">
				<div
					class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-gray-200 shadow-inner"
					style="background-color: {match.color.hex}; color: {matchTextColor};"
				>
					<span class="font-mono text-sm font-semibold drop-shadow-sm">
						{match.color.hex}
					</span>
				</div>
				{#if matchColorInfo}
					<div
						class="bg-opacity-70 absolute bottom-2 left-2 rounded bg-black px-2 py-1 text-xs text-white"
					>
						L: {matchColorInfo.luminance.toFixed(2)}
					</div>
				{/if}
				<button
					onclick={() => copyToClipboard(match.color.hex, 'match')}
					class="bg-opacity-90 hover:bg-opacity-100 absolute top-2 right-2 rounded-lg bg-white p-2 shadow-sm transition-all duration-200 hover:scale-105"
					title="Copy hex code"
				>
					{#if copiedField === 'match'}
						<Check class="h-4 w-4 text-green-600" />
					{:else}
						<Copy class="h-4 w-4 text-gray-600" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Enhanced Color Information with detailed color space data -->
	{#if originalColorInfo && matchColorInfo}
		<div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg bg-gray-50 p-4">
				<h5 class="mb-2 text-sm font-medium text-gray-700">Your Color Details</h5>
				<div class="space-y-1 text-xs text-gray-600">
					<p>
						<span class="font-medium">RGB:</span>
						{originalColorInfo.rgb.map((v) => Math.round(v)).join(', ')}
					</p>
					<p>
						<span class="font-medium">HSL:</span>
						{originalColorInfo.hsl
							.map((v, i) => (i === 0 ? Math.round(v || 0) : Math.round((v || 0) * 100) + '%'))
							.join(', ')}
					</p>
					<p>
						<span class="font-medium">LAB:</span>
						{originalColorInfo.lab.map((v) => Math.round(v || 0)).join(', ')}
					</p>
					<p>
						<span class="font-medium">Luminance:</span>
						{originalColorInfo.luminance.toFixed(3)}
					</p>
					{#if originalColorInfo.temperature}
						<p>
							<span class="font-medium">Temperature:</span>
							{Math.round(originalColorInfo.temperature)}K
						</p>
					{/if}
				</div>
			</div>
			<div class="rounded-lg bg-gray-50 p-4">
				<h5 class="mb-2 text-sm font-medium text-gray-700">Tailwind Match Details</h5>
				<div class="space-y-1 text-xs text-gray-600">
					<p>
						<span class="font-medium">RGB:</span>
						{matchColorInfo.rgb.map((v) => Math.round(v)).join(', ')}
					</p>
					<p>
						<span class="font-medium">HSL:</span>
						{matchColorInfo.hsl
							.map((v, i) => (i === 0 ? Math.round(v || 0) : Math.round((v || 0) * 100) + '%'))
							.join(', ')}
					</p>
					<p>
						<span class="font-medium">LAB:</span>
						{matchColorInfo.lab.map((v) => Math.round(v || 0)).join(', ')}
					</p>
					<p><span class="font-medium">Luminance:</span> {matchColorInfo.luminance.toFixed(3)}</p>
					{#if matchColorInfo.temperature}
						<p>
							<span class="font-medium">Temperature:</span>
							{Math.round(matchColorInfo.temperature)}K
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- Color Information -->
	<div class="mt-6 space-y-4">
		<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
			<div>
				<p class="text-sm text-gray-600">Tailwind Color Name</p>
				<div class="flex items-center gap-2">
					<p class="font-semibold text-gray-900">{match.color.name}</p>
					{#if isExactMatch}
						<span class="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
							Official
						</span>
					{/if}
				</div>
			</div>
			<button
				onclick={() => copyToClipboard(match.color.name, 'name')}
				class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition-colors duration-200 hover:bg-gray-50"
			>
				{#if copiedField === 'name'}
					<Check class="h-4 w-4 text-green-600" />
				{:else}
					<Copy class="h-4 w-4 text-gray-500" />
				{/if}
				<span class="text-sm text-gray-600">Copy</span>
			</button>
		</div>

		<div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
			<div>
				<p class="text-sm text-gray-600">CSS Class Name</p>
				<p class="font-mono text-sm font-semibold text-gray-900">
					{match.color.className}
				</p>
			</div>
			<button
				onclick={() => copyToClipboard(match.color.className, 'className')}
				class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition-colors duration-200 hover:bg-gray-50"
			>
				{#if copiedField === 'className'}
					<Check class="h-4 w-4 text-green-600" />
				{:else}
					<Copy class="h-4 w-4 text-gray-500" />
				{/if}
				<span class="text-sm text-gray-600">Copy</span>
			</button>
		</div>
	</div>

	<div class="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
		<div class="flex items-center justify-between text-xs text-blue-700">
			<div>
				<strong>Color distance:</strong>
				{match.distance.toFixed(2)} •
				<strong> Similarity:</strong>
				{match.similarity.toFixed(1)}%
				{#if isExactMatch}
					• Perfect match!{/if}
			</div>
			{#if !isExactMatch}
				<a
					href="https://tailwindcss.com/docs/background-color#{match.color.name}"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1 transition-colors hover:text-blue-800"
					title="View in Tailwind docs"
				>
					<ExternalLink class="h-3 w-3" />
					Docs
				</a>
			{/if}
		</div>
	</div>
</div>
