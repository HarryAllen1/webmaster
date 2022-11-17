<script lang="ts">
	import { HoverCard, ScrollFade, SEO } from '$lib/components';
	import { Gem, type Strawberry as StrawberryComponent } from '$lib/models';
	import { onMount } from 'svelte';

	let strawberryContainer: HTMLElement;

	let Strawberry: typeof StrawberryComponent;

	onMount(() => {
		const strawberryObserver = new IntersectionObserver((entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					Strawberry = (await import('$lib/models')).Strawberry;
				}
			});
		});

		strawberryObserver.observe(strawberryContainer);
	});
</script>

<SEO title="Home" />

<div class="flex flex-col items-center max-w-lg md:max-w-xl">
	<h1>Become an Astronaut</h1>
	<div class="flex flex-row gap-4">
		<ScrollFade style="transition-delay: 0;">
			<HoverCard name="Pelican" images="3" />
		</ScrollFade>
		<ScrollFade style="transition-delay: 200ms">
			<HoverCard name="Autumn" images="2" />
		</ScrollFade>
		<ScrollFade style="transition-delay: 400ms;">
			<HoverCard name="Falcon" />
		</ScrollFade>
	</div>
	<Gem />
	<div bind:this={strawberryContainer}>
		<svelte:component this={Strawberry} />
	</div>
	<ScrollFade fadeInFrom="left">eeeeeeeeeeeeeeee</ScrollFade>
</div>
