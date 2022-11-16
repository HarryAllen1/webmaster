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
	<div class="flex flex-row gap-4">
		<HoverCard name="Pelican" images="3" />
		<HoverCard name="Autumn" images="2" />
		<HoverCard name="Falcon" />
	</div>
	<p>
		We are currently accepting applications for the next class of astronauts. If you are interested in becoming an astronaut, please fill out the form below.
	</p>
	<form>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" />
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
		<label for="phone">Phone</label>
		<input type="tel" name="phone" id="phone" />
		<label for="message">Message</label>
		<textarea name="message" id="message" rows="4"></textarea>
		<button type="submit">Submit</button>
	</form>
	<Gem />
	<Strawberry />
	<Footer />
</div>
