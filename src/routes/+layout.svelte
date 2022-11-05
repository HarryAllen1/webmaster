<script lang="ts">
	import '../app.scss';
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />
<main class="prose mx-auto">
	<slot />
</main>
<Footer />
