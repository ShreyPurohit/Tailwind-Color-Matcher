<script lang="ts">
	import type { ColorInputProps } from '$types/color';
	import { extractHexColor } from '$utils/colorValidation';
	import { cn } from '$utils/constants';
	import { CircleAlert } from 'lucide-svelte';

	let { value = $bindable(), isValidInput, inputError }: ColorInputProps = $props();

	const handlePaste = (e: ClipboardEvent) => {
		e.preventDefault();
		const clipboardData = e.clipboardData;
		if (clipboardData) {
			const pastedText = clipboardData.getData('text');
			const extractedColor = extractHexColor(pastedText);
			value = extractedColor || pastedText;
		}
	};

	const inputClass = $derived(() => {
		if (isValidInput && value) return 'border-green-300 bg-green-50 text-green-900';
		if (inputError && value) return 'border-red-300 bg-red-50 text-red-900';
		return 'border-gray-300 bg-white hover:border-gray-400';
	});
</script>

<div class="space-y-2">
	<label for="color-input" class="block text-sm font-medium text-gray-700"> Enter Hex Color </label>

	<div class="relative">
		<input
			id="color-input"
			type="text"
			bind:value
			class={cn(
				'w-full rounded-lg border px-4 py-3 font-mono text-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
				inputClass
			)}
			onpaste={handlePaste}
			placeholder="#FFFFFF or FFFFFF"
		/>

		{#if value}
			<div class="absolute inset-y-0 right-0 flex items-center pr-3">
				{#if isValidInput}
					<div
						class="h-6 w-6 rounded border-2 border-white shadow-sm"
						style="background-color: {value}"
						aria-label="Color preview"
					></div>
				{:else}
					<CircleAlert class="h-5 w-5 text-red-400" />
				{/if}
			</div>
		{/if}
	</div>

	{#if inputError && value}
		<p class="flex items-center gap-1 text-sm text-red-600">
			<CircleAlert class="h-4 w-4" />
			{inputError}
		</p>
	{/if}

	<p class="text-xs text-gray-500">
		Enter a hex color code (e.g., #FF5733, FF5733) to find the closest Tailwind color
	</p>
</div>
