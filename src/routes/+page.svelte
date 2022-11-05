<script>
	import Footer from '$lib/Footer.svelte';
	import Gem from '$lib/Gem.svelte';
	import HoverCard from '$lib/HoverCard.svelte';
	import Strawberry from '$lib/Strawberry.svelte';
</script>

<h1 class="text-blue">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div class="ships">
	<HoverCard name={'Pelican'} images="3" />
	<HoverCard name={'Autumn'} images="2" />
	<HoverCard name={'Falcon'} />
</div>
<Gem />
<Strawberry />
<Footer />

<style lang="scss">
	.ships {
		display: flex;
		min-width: 100%;
	}
	.ship {
		padding: 2%;
	}
</style>
