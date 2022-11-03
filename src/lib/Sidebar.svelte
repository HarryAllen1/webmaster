<script lang="ts">
	import { page } from '$app/stores';
	import { pages } from '$lib/pages';
</script>

<nav title="Pages" class="flex flex-col px-6">
	{#each pages as p (p.link)}
		<a
			href={p.link}
			class:font-bold={$page.url.href.includes(p.link)}
			class="py-2 hover:decoration-stone-400 hover:underline"
		>
			{p.name}
		</a>
	{/each}
	<hr class="w-24 my-4" />
</nav>
