<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import '../app.scss';

	export let name = '';
	export let images = '1';
	let hover = false;
	let num = 1;
	let ticks = 0;
	let imgUpdateDelay = 5;
	let interval = setInterval(() => (ticks = ticks), 1000);

	onDestroy(() => clearInterval(interval));
	async function updateImageTick() {
		clearInterval(interval);
		interval = setInterval(() => {
			ticks++;
			num = (Math.round(ticks / imgUpdateDelay) % +images) + 1;
		}, 1000);
	}
	async function stopImageTick() {
		clearInterval(interval);
	}

	$: preloadImageUrls = [...Array(num).keys()].map((key) => `/${name}/${key + 1}.png`);
</script>

<svelte:head>
	{#each preloadImageUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<div class="container mx-auto h-96 w-96">
	<div
		class="card"
		on:mouseenter={() => {
			hover = true;
			updateImageTick();
		}}
		on:mouseleave={() => {
			hover = false;
			stopImageTick();
		}}
	>
		<div class="card-content">
			<h3 class="card-title">{name}</h3>
			{#if hover}
				{#key num}
					<img
						transition:fade={{ duration: 300 }}
						class="card-subtitle"
						src="/{name}/{num}.png"
						alt={name + ' img ' + num}
					/>
				{/key}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		@apply bg-slate-900;
		aspect-ratio: 1 / 1;
		cursor: pointer;
		position: relative;
	}

	.card:hover:before {
		background-position: 100% 100%;
		transform: scale(1, 1);
	}

	.card:hover > .card-content {
		background-position: -10% 0%;
	}

	.card:before {
		background: linear-gradient(
			130deg,
			transparent 0% 33%,
			rgb(36, 0, 94) 66%,
			rgb(95, 0, 143) 83.5%,
			rgb(126, 0, 126) 100%
		);
		background-position: 0% 0%;
		background-size: 300% 300%;
		content: '';
		height: 100%;
		left: 0px;
		pointer-events: none;
		position: absolute;
		top: 0px;
		transition: background-position 350ms ease, transform 350ms ease;
		width: 100%;
		z-index: 1;
	}

	.card-content {
		background-image: radial-gradient(rgba(255, 255, 255, 0.2) 8%, transparent 8%);
		background-position: 0% 0%;
		background-size: 5vmin 5vmin;
		height: calc(100%);
		padding: 5vmin;
		position: relative;
		transition: background-position 350ms ease;
		width: calc(100%);
		z-index: 2;
	}

	.card-title {
		position: relative;
		color: white;
		font-family: 'Anek Latin', sans-serif;
		font-weight: 100%;
		margin: 0px;
		font-size: 6vmin;
	}

	.card-subtitle {
		position: absolute;
		left: 5%;
		top: 30%;
		width: 80%;
	}
</style>
