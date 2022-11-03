<script lang="ts">
	import '../app.scss';
	import Navbar from '../lib/Navbar.svelte';
</script>

<Navbar />
<main class="prose">
	<slot />
</main>
