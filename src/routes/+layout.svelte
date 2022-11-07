<script lang="ts">
	import '../app.scss';
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { page } from '$app/stores';
	import { pages } from '../lib/pages';
</script>

<Navbar {page} logo="/favicon.png">
	<svelte:fragment slot="nav-center">
		{#each pages as page}
			<li>
				<a href={page.link}>{page.name}</a>
			</li>
		{/each}
	</svelte:fragment>
	<svelte:fragment slot="nav-right">
		<li>
			<a href="https://github.com/MajesticString/webmaster" target="_blank" rel="noreferrer">
				<svg aria-hidden="true" viewBox="0 0 16 16" class="w-6 h-6 fill-white">
					<path
						fill-rule="evenodd"
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
			</a>
		</li>
	</svelte:fragment>
</Navbar>
<main class="prose pt-20 min-w-full flex flex-col items-center p-4 mx-auto">
	<slot />
</main>
<Footer />

<style lang="scss">
	main {
		background-color: #21d5fd3a;
		background-image: linear-gradient(19deg, #21d5fd2e 0%, #b921ff51 100%);
	}
</style>
