<script>
	import { Gem, HoverCard, Strawberry, ScrollFade } from '$lib';
</script>

<svelte:head>
	<title>Become an Astronaut</title>
</svelte:head>

<div class="flex flex-col items-center max-w-lg md:max-w-xl">
	<h1>Become an Astronaut</h1>
	<div class="flex flex-row gap-4">
		<HoverCard name="Pelican" images="3" />
		<HoverCard name="Autumn" images="2" />
		<HoverCard name="Falcon" />
	</div>
	<Gem />
	<Strawberry />
	<ScrollFade textSide="left" fadeInFrom="left">
		<svelte:fragment slot="text">eeeee eeee ee e e eee ee e ee eee e ee e</svelte:fragment>
		<svelte:fragment slot="hero">eeee e e eeeeeeeeee e eeeeeee ee eeeee eeee</svelte:fragment>
	</ScrollFade>
</div>
