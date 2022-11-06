<script>
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Suit</title>
</svelte:head>

<div>
	<h1>The Suit</h1>

	<h2>MK V Gen 3</h2>
</div>

<div>
	<video autoplay loop muted playsinline src="/armor.mp4" in:fade={{ duration: 1000 }}>
		<track kind="captions" />
	</video>
</div>
