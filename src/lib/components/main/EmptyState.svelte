<script>
	import {
		Accessibility,
		CircleCheck,
		Code,
		Monitor,
		PaletteIcon,
		Share2,
		Sparkles,
		User,
		Hash
	} from 'lucide-svelte';
</script>

<section class="py-12 text-center" aria-labelledby="ready-to-match">
	<div
		class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm"
	>
		<Sparkles class="h-8 w-8 text-indigo-400" aria-hidden="true" />
	</div>
	<h2 id="ready-to-match" class="mb-2 text-2xl font-bold text-gray-800">
		Ready to Match Colors 🎨
	</h2>
	<p class="mx-auto mb-8 max-w-md leading-relaxed text-gray-500">
		Enter a hex color code above to find its closest Tailwind CSS equivalent — great for maintaining
		design consistency.
	</p>

	<!-- Cards -->
	<div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
		<!-- How It Works -->
		<div
			class="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
		>
			<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
				<CircleCheck class="h-5 w-5 text-green-500" /> How It Works
			</h3>
			<ul class="space-y-3 text-sm text-gray-600">
				<li class="flex items-start gap-2">
					<Hash class="mt-1 h-4 w-4 text-blue-500" />
					<span
						>Enter any hex color code (e.g., <code
							class="rounded bg-gray-100 px-1 font-mono text-gray-800">#FF5733</code
						>)</span
					>
				</li>
				<li class="flex items-start gap-2">
					<PaletteIcon class="mt-1 h-4 w-4 text-purple-500" />
					<span>Get the closest Tailwind CSS color match</span>
				</li>
				<li class="flex items-start gap-2">
					<Share2 class="mt-1 h-4 w-4 text-green-500" />
					<span>Copy the class name or hex value with one click</span>
				</li>
				<li class="flex items-start gap-2">
					<Sparkles class="mt-1 h-4 w-4 text-yellow-400" />
					<span>Explore alternative color options</span>
				</li>
			</ul>
		</div>

		<!-- Perfect For -->
		<div
			class="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
		>
			<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
				<User class="h-5 w-5 text-indigo-500" /> Perfect For
			</h3>
			<ul class="space-y-3 text-sm text-gray-600">
				<li class="flex items-start gap-2">
					<Monitor class="mt-1 h-4 w-4 text-blue-500" />
					<span>Web developers using Tailwind CSS</span>
				</li>
				<li class="flex items-start gap-2">
					<User class="mt-1 h-4 w-4 text-indigo-500" />
					<span>UI/UX designers maintaining consistency</span>
				</li>
				<li class="flex items-start gap-2">
					<Code class="mt-1 h-4 w-4 text-purple-600" />
					<span>Converting design mockups to code</span>
				</li>
				<li class="flex items-start gap-2">
					<Accessibility class="mt-1 h-4 w-4 text-green-600" />
					<span>Finding accessible color alternatives</span>
				</li>
			</ul>
		</div>
	</div>
</section>
