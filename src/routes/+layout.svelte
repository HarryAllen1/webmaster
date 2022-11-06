<script lang="ts">
	import '../app.scss';
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />
<main class="prose pt-16 min-w-full flex flex-col items-center p-4 mx-auto">
	<slot />
</main>
<Footer />

<style lang="scss">
	main {
		background-color: #21d5fd3a;
		background-image: linear-gradient(19deg, #21d5fd2e 0%, #b921ff51 100%);
	}
</style>
