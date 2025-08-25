<script>
	import {
		BookHeart,
		BookOpen,
		Bubbles,
		ExternalLink,
		GitGraph,
		Heart,
		Palette,
		Share2,
		Sparkles,
		ToolCase
	} from 'lucide-svelte';
</script>

<footer
	class="mt-8 rounded-2xl border-t border-gray-200/50 bg-white/60 pt-12 pb-12 shadow-lg backdrop-blur-md"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 md:grid-cols-3">
			<!-- About Section -->
			<div>
				<h3
					class="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 md:justify-start"
				>
					<ToolCase class="h-6 w-6 text-blue-600" /> About This Tool
				</h3>
				<p class="text-center text-sm leading-relaxed text-gray-600 md:text-left">
					Tailwind Color Matcher uses perceptual color distance in LCH space to suggest the most
					visually accurate Tailwind color classes. 🎨
				</p>
			</div>

			<!-- Features Section -->
			<div>
				<h3
					class="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 md:justify-start"
				>
					<Bubbles class="h-6 w-6 text-purple-600" /> Features
				</h3>
				<ul class="flex flex-col items-center gap-2 text-sm text-gray-600 md:items-start">
					<li class="flex items-center gap-2">
						<Sparkles class="h-4 w-4 flex-shrink-0 text-blue-500" />
						<span>Accurate Delta E matching</span>
					</li>
					<li class="flex items-center gap-2">
						<Palette class="h-4 w-4 flex-shrink-0 text-purple-500" />
						<span>Multiple color suggestions</span>
					</li>
					<li class="flex items-center gap-2">
						<Share2 class="h-4 w-4 flex-shrink-0 text-green-500" />
						<span>One-click class copying</span>
					</li>
					<li class="flex items-center gap-2">
						<BookOpen class="h-4 w-4 flex-shrink-0 text-orange-500" />
						<span>Side-by-side color previews</span>
					</li>
					<li class="flex items-center gap-2">
						<GitGraph class="h-4 w-4 flex-shrink-0 text-indigo-500" />
						<span>Shareable color URLs</span>
					</li>
				</ul>
			</div>

			<!-- Resources Section -->
			<div>
				<h3
					class="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 md:justify-start"
				>
					<BookHeart class="h-6 w-6 text-red-600" /> Resources
				</h3>
				<ul class="flex flex-col items-center gap-2 text-sm text-gray-600 md:items-start">
					<li>
						<a
							href="https://tailwindcss.com/docs/background-color"
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1 transition-colors hover:text-gray-900"
						>
							Tailwind Color Docs <ExternalLink
								class="h-4 w-4 text-gray-500 group-hover:text-gray-900"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/ShreyPurohit/Tailwind-Color-Matcher"
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1 transition-colors hover:text-gray-900"
						>
							GitHub Repository <ExternalLink
								class="h-4 w-4 text-gray-500 group-hover:text-gray-900"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://tailwindcss.com"
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1 transition-colors hover:text-gray-900"
						>
							Tailwind CSS Website <ExternalLink
								class="h-4 w-4 text-gray-500 group-hover:text-gray-900"
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Divider -->
		<div class="mt-12 border-t border-gray-100 pt-6 text-center">
			<p class="text-sm text-gray-500">
				Built with
				<a href="https://kit.svelte.dev" class="underline hover:text-gray-700">SvelteKit</a>,
				<a href="https://www.typescriptlang.org" class="underline hover:text-gray-700">TypeScript</a
				>, and
				<a href="https://tailwindcss.com" class="underline hover:text-gray-700">Tailwind CSS</a>
				• Using perceptual LCH color space for precision matching.
			</p>
			<p class="mt-2 flex items-center justify-center gap-1 text-sm text-gray-500">
				© 2025
				<a
					href="https://github.com/ShreyPurohit"
					class="inline-flex items-center gap-1 underline hover:text-gray-700"
				>
					Shrey Purohit <Heart class="h-4 w-4 text-red-500" />
				</a>
				. MIT License.
			</p>
		</div>
	</div>
</footer>
