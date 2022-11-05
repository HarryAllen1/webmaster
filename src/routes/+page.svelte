<script>
	import Footer from '$lib/Footer.svelte';
	import Gem from '$lib/Gem.svelte';
	import HoverCard from '$lib/HoverCard.svelte';
	import Strawberry from '$lib/Strawberry.svelte';
</script>

<svelte:head>
	<title>Become an Astronaut</title>
</svelte:head>

<div class="flex flex-col items-center max-w-xl">
	<h1>Become an Astronaut</h1>
	<HoverCard name="Pelican" images="3" />
	<HoverCard name="Autumn" images="2" />
	<HoverCard name="Falcon" />
	<Gem />
	<Strawberry />
	<Footer />
</div>
