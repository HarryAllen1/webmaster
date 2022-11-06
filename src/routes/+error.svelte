<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center w-full">
	{#if $page.status === 404}
		<h1>Oh no! You floated off into space</h1>
	{/if}
	<h2>You hit a {$page.status}: {$page.error?.message}</h2>
</div>
