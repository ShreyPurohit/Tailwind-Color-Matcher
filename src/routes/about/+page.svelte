<script lang="ts">
	import { Palette, Zap, Target, Code, Heart, Github, ExternalLink } from 'lucide-svelte';
</script>

<svelte:head>
	<title>About Tailwind Color Matcher - How It Works & Features</title>
	<meta
		name="description"
		content="Learn how Tailwind Color Matcher works, its features, and the technology behind accurate color matching using perceptual color distance algorithms."
	/>
	<meta
		name="keywords"
		content="tailwind color matcher, color matching algorithm, LCH color space, Delta E, perceptual color distance, web development tools"
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
	<div class="container mx-auto max-w-4xl px-4 py-8">
		<!-- Header -->
		<header class="mb-12 text-center">
			<div class="mb-6 flex items-center justify-center gap-3">
				<div class="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
					<Palette class="h-8 w-8 text-white" />
				</div>
				<h1 class="text-4xl font-bold text-gray-900">About Tailwind Color Matcher</h1>
			</div>
			<p class="mx-auto max-w-2xl text-xl text-gray-600">
				Learn how our advanced color matching algorithm helps you find the perfect Tailwind CSS
				colors
			</p>
		</header>

		<main class="space-y-12">
			<!-- How It Works -->
			<section class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<Zap class="h-6 w-6 text-blue-500" />
					<h2 class="text-2xl font-bold text-gray-900">How It Works</h2>
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<h3 class="mb-3 text-lg font-semibold text-gray-900">Advanced Color Science</h3>
						<p class="mb-4 text-gray-600">
							Our tool uses the <strong>LCH color space</strong> and
							<strong>Delta E algorithms</strong>
							to calculate perceptual color differences. Unlike simple RGB distance calculations, this
							approach matches how humans actually perceive color differences.
						</p>
						<ul class="space-y-2 text-sm text-gray-600">
							<li>• <strong>LCH Color Space:</strong> Perceptually uniform color representation</li>
							<li>
								• <strong>Delta E Calculation:</strong> Industry-standard color difference metric
							</li>
							<li>• <strong>Chroma.js Integration:</strong> Robust color manipulation library</li>
						</ul>
					</div>

					<div>
						<h3 class="mb-3 text-lg font-semibold text-gray-900">Matching Process</h3>
						<ol class="space-y-3 text-sm text-gray-600">
							<li class="flex items-start gap-2">
								<span
									class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600"
									>1</span
								>
								<span>Input color is validated and normalized</span>
							</li>
							<li class="flex items-start gap-2">
								<span
									class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600"
									>2</span
								>
								<span>Color is converted to LCH color space</span>
							</li>
							<li class="flex items-start gap-2">
								<span
									class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600"
									>3</span
								>
								<span>Distance calculated against all Tailwind colors</span>
							</li>
							<li class="flex items-start gap-2">
								<span
									class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600"
									>4</span
								>
								<span>Results sorted by perceptual similarity</span>
							</li>
						</ol>
					</div>
				</div>
			</section>

			<!-- Features -->
			<section class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<Target class="h-6 w-6 text-green-500" />
					<h2 class="text-2xl font-bold text-gray-900">Key Features</h2>
				</div>

				<div class="grid gap-6 md:grid-cols-3">
					<div class="p-4 text-center">
						<div
							class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100"
						>
							<Palette class="h-6 w-6 text-blue-600" />
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Accurate Matching</h3>
						<p class="text-sm text-gray-600">
							Uses perceptual color distance for matches that look right to the human eye
						</p>
					</div>

					<div class="p-4 text-center">
						<div
							class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100"
						>
							<Zap class="h-6 w-6 text-green-600" />
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Instant Results</h3>
						<p class="text-sm text-gray-600">
							Real-time color matching with immediate visual feedback and multiple options
						</p>
					</div>

					<div class="p-4 text-center">
						<div
							class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100"
						>
							<Code class="h-6 w-6 text-purple-600" />
						</div>
						<h3 class="mb-2 font-semibold text-gray-900">Developer Friendly</h3>
						<p class="text-sm text-gray-600">
							Copy class names, hex values, and share specific color matches via URL
						</p>
					</div>
				</div>
			</section>

			<!-- Technology Stack -->
			<section class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<Code class="h-6 w-6 text-purple-500" />
					<h2 class="text-2xl font-bold text-gray-900">Technology Stack</h2>
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<h3 class="mb-4 text-lg font-semibold text-gray-900">Frontend</h3>
						<ul class="space-y-2 text-gray-600">
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-orange-500"></span>
								<strong>SvelteKit 5:</strong> Modern web framework with SSR
							</li>
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-blue-500"></span>
								<strong>TypeScript:</strong> Type-safe development
							</li>
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-cyan-500"></span>
								<strong>Tailwind CSS:</strong> Utility-first styling
							</li>
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-green-500"></span>
								<strong>Vite:</strong> Fast build tooling
							</li>
						</ul>
					</div>

					<div>
						<h3 class="mb-4 text-lg font-semibold text-gray-900">Libraries & Tools</h3>
						<ul class="space-y-2 text-gray-600">
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-red-500"></span>
								<strong>Chroma.js:</strong> Color manipulation and conversion
							</li>
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-yellow-500"></span>
								<strong>Lucide Icons:</strong> Beautiful, consistent icons
							</li>
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-indigo-500"></span>
								<strong>Vitest:</strong> Fast unit testing
							</li>
							<li class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-pink-500"></span>
								<strong>Vercel:</strong> Deployment and hosting
							</li>
						</ul>
					</div>
				</div>
			</section>

			<!-- Open Source -->
			<section class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<Heart class="h-6 w-6 text-red-500" />
					<h2 class="text-2xl font-bold text-gray-900">Open Source</h2>
				</div>

				<div class="text-center">
					<p class="mx-auto mb-6 max-w-2xl text-gray-600">
						Tailwind Color Matcher is open source and available on GitHub. Contributions, bug
						reports, and feature requests are welcome!
					</p>

					<div class="flex items-center justify-center gap-4">
						<a
							href="https://github.com/ShreyPurohit/color-matcher"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
						>
							<Github class="h-5 w-5" />
							View on GitHub
						</a>

						<a
							href="https://github.com/ShreyPurohit/color-matcher/issues"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
						>
							<ExternalLink class="h-5 w-5" />
							Report Issues
						</a>
					</div>
				</div>
			</section>

			<!-- Creator -->
			<section class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
				<div class="text-center">
					<h2 class="mb-4 text-2xl font-bold text-gray-900">Created by Shrey Purohit</h2>
					<p class="mx-auto mb-6 max-w-2xl text-gray-600">
						A passionate web developer focused on creating useful tools for the developer community.
						Interested in color science, web performance, and user experience.
					</p>

					<div class="flex items-center justify-center gap-4">
						<a
							href="https://github.com/ShreyPurohit"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
						>
							<Github class="h-5 w-5" />
							@ShreyPurohit
						</a>
					</div>
				</div>
			</section>
		</main>
	</div>
</div>
