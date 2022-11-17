<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let description: string = title;
	export let image = '/favicon.png';
</script>

<svelte:head>
	<title>{title} - Become an Astronaut</title>
	<meta property="og:title" content="{title} - Become an Astronaut" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{$page.url.origin}{image}" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:site_name" content="Become an Astronaut" />
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content="{title} - Become an Astronaut" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{$page.url.origin}{image}" />
	<meta name="twitter:url" content={$page.url.href} />
</svelte:head>
