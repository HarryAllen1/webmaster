<script lang="ts">
	import { HoverCard, ScrollFade, SEO } from '$lib/components';
	import { Gem, type Strawberry as StrawberryComponent } from '$lib/models';
	import { onMount } from 'svelte';
	import {
		blur,
		slide,
		type BlurParams,
		type SlideParams,
		type TransitionConfig,
	} from 'svelte/transition';

	let strawberryContainer: HTMLElement;
	let Strawberry: typeof StrawberryComponent;

	let animateCards = false;

	onMount(() => {
		animateCards = true;

		const strawberryObserver = new IntersectionObserver((entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					Strawberry = (await import('$lib/models')).Strawberry;
				}
			});
		});

		strawberryObserver.observe(strawberryContainer);
	});

	const slideFade: (node: Element, params?: SlideParams & BlurParams) => TransitionConfig = (
		node,
		{ delay = 0, duration = 300 } = {}
	) => {
		const slideTransition = slide(node, { delay, duration });
		const blurTransition = blur(node, { delay, duration });

		return {
			duration,
			delay,
			css: (t, u) => {
				// css is always defined in the slide transition: https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts#L122
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const slideStyles = slideTransition.css!(t, u);
				//same here
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const blurStyles = blurTransition.css!(t, u);

				return `${slideStyles} ${blurStyles}`;
			},
		};
	};
</script>

<SEO title="Home" />

<div class="flex flex-col items-center max-w-lg md:max-w-xl">
	<h1>Become an Astronaut</h1>
	<div class="flex flex-row gap-4">
		{#if animateCards}
			<div in:slideFade={{ delay: 0 }}>
				<HoverCard name="Pelican" images="3" />
			</div>
			<div in:slideFade={{ delay: 200 }}>
				<HoverCard name="Autumn" images="2" />
			</div>
			<div in:slideFade={{ delay: 400 }}>
				<HoverCard name="Falcon" />
			</div>
		{/if}
	</div>
	<Gem />
	<div bind:this={strawberryContainer}>
		<svelte:component this={Strawberry} />
	</div>
	<ScrollFade fadeInFrom="left">eeeeeeeeeeeeeeee</ScrollFade>
</div>
