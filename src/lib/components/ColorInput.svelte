<script lang="ts">
	import { CircleAlert } from 'lucide-svelte';
	import { extractHexColor } from '$utils/colorValidation';
	import { cn } from '$utils/constants';

	// Props (bound from parent)
	let {
		value = $bindable(),
		isValidInput,
		inputError
	}: { value: string; isValidInput: boolean; inputError: string | undefined } = $props();

	// Helper to format hex
	function formatHex(color: string) {
		if (!color) return '';
		if (!color.startsWith('#')) color = '#' + color;
		return color.toUpperCase();
	}

	// Derived value for color picker
	const formattedValue = $derived(() => formatHex(value));

	// Paste handler
	const handlePaste = (e: ClipboardEvent) => {
		e.preventDefault();
		const pastedText = e.clipboardData?.getData('text') ?? '';
		const extractedColor = extractHexColor(pastedText);
		value = extractedColor || pastedText; // ✅ allowed because it's a bound prop
	};

	// Color picker change handler
	const handleColorPickerChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = formatHex(target.value); // ✅ still fine for bound prop
	};
</script>

<div class="space-y-2 px-4 sm:px-0">
	<label for="color-input" class="block text-sm font-medium text-gray-700"> Enter Hex Color </label>

	<div class="relative">
		<input
			id="color-input"
			type="text"
			bind:value
			class={cn(
				'w-full rounded-lg border px-4 py-3 pr-14 font-mono text-lg placeholder-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
				isValidInput && value && 'border-green-400 text-green-900',
				inputError && value && 'border-red-300 bg-red-50 text-red-900'
			)}
			onpaste={handlePaste}
			placeholder="#FFFFFF or FFFFFF"
			inputmode="text"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="none"
			spellcheck="false"
			aria-describedby="color-input-help"
		/>

		<!-- Color picker button -->
		<div
			class="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 overflow-hidden rounded-full border border-gray-300 shadow-sm"
		>
			<input
				type="color"
				aria-label="Pick a color"
				value={formattedValue()}
				oninput={handleColorPickerChange}
				class="absolute inset-0 cursor-pointer [appearance:none]
					opacity-0
					[&::-webkit-color-swatch]:rounded-full
					[&::-webkit-color-swatch]:border-0
					[&::-webkit-color-swatch-wrapper]:p-0"
			/>
			<div
				class="pointer-events-none absolute inset-0 rounded-full"
				style={`background-color: ${formattedValue()}`}
			></div>
		</div>
	</div>

	{#if inputError && value}
		<p class="mt-1 flex items-center gap-1 text-sm text-red-600">
			<CircleAlert class="h-4 w-4" aria-hidden="true" />
			{inputError}
		</p>
	{/if}

	<p id="color-input-help" class="mt-1 text-xs text-gray-500">
		Enter a hex color code (e.g., <code class="rounded bg-gray-100 px-1 font-mono">#FF5733</code>,
		<code class="rounded bg-gray-100 px-1 font-mono">FF5733</code>) to find the closest Tailwind
		color.
	</p>
</div>
