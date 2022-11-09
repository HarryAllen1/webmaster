<script lang="ts">
	import type { Readable } from 'svelte/store';
	import type { Page } from '@sveltejs/kit';
	import { pages } from './pages';

	export let page: Readable<Page<Record<string, string>, string | null>>;
	export let logo: string;
	export let home = 'Home';
	export let home_title = 'Homepage';

	let open = false;
	let visible = true;
	let nav: HTMLElement;

	// hide nav whenever we navigate
	page.subscribe(() => {
		open = false;
	});

	function handle_focus() {
		if (open && !nav.contains(document.activeElement)) {
			open = false;
		}
	}
</script>

<svelte:window
	on:focusin={handle_focus}
	on:resize={() => {
		if (window.innerWidth > 799) open = false;
	}}
/>

<nav
	class:visible={visible || open}
	class:open
	class="bg-black text-white my-0 mx-auto z-[100] w-full h-16 shadow-md select-none duration-200 px-4 grid grid-cols-3 items-center justify-between"
	bind:this={nav}
>
	<a href="/" class="nav-spot home" title={home_title} style="background-image: url({logo})">
		{home}
	</a>

	<ul
		class="justify-center relative p-0 m-0 w-full list-none hidden md:flex md:h-full md:w-auto md:items-center md:p-0 md:mx-1 md:gap-4"
	>
		<slot name="nav-center" />
	</ul>

	<ul
		class="relative p-0 m-0 w-full list-none hidden md:flex md:h-full md:w-auto md:items-center md:p-0 md:mx-1 md:justify-end"
	>
		<slot name="nav-right" />
	</ul>

	<div class="block md:hidden" />

	<button
		aria-label="Toggle menu"
		class="menu-toggle flex justify-end md:hidden"
		class:open
		on:click={() => (open = !open)}
	>
		{#if open}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		{/if}
	</button>
</nav>

{#if open}
	<div class="flex flex-col bg-black p-4 w-full text-white">
		{#each pages as page}
			<a class="h-8 text-end" href={page.link}>{page.name}</a>
		{/each}
	</div>
{/if}

<style>
	.home {
		height: var(--nav-h);
		display: flex;
		text-indent: -9999px;
		background-position: calc(var(--side-nav) - 1rem) 50%;
		background-repeat: no-repeat;
		background-size: auto 100%;
	}
</style>
