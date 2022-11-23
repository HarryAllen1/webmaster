<script lang="ts">
import '@unocss/reset/tailwind.css';
</script>

<template>
	<div class="prose max-w-full">
		<Navbar />
		<slot />
		<Footer />
	</div>
</template>
