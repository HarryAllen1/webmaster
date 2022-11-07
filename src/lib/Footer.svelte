<script>
	import { pages } from './pages';
</script>

<footer class="py-8 flex flex-row px-16">
	<div class="flex flex-col">
		{#each pages as page}
			<a href={page.link} class="text-white hover:underline">{page.name}</a>
		{/each}
	</div>
</footer>
