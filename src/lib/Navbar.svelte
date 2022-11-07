<script lang="ts">
	import type { Readable } from 'svelte/store';
	import type { Page } from '@sveltejs/kit';

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

	// Prevents navbar to show/hide when clicking in docs sidebar
	let hash_changed = false;
	function handle_hashchange() {
		hash_changed = true;
	}

	let last_scroll = 0;
	function handle_scroll() {
		const scroll = window.pageYOffset;
		if (!hash_changed) {
			visible = scroll < 50 || scroll < last_scroll;
		}

		last_scroll = scroll;
		hash_changed = false;
	}

	function handle_focus() {
		if (open && !nav.contains(document.activeElement)) {
			open = false;
		}
	}
</script>

<svelte:window
	on:hashchange={handle_hashchange}
	on:scroll={handle_scroll}
	on:focusin={handle_focus}
/>

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="modal-background hide-if-desktop" on:click={() => (open = false)} />
{/if}

<nav
	class:visible={visible || open}
	class:open
	class="bg-black text-white my-0 mx-auto z-[100] w-full h-16 fixed shadow-md select-none transition-transform duration-200 px-4"
	bind:this={nav}
>
	<a href="/" class="nav-spot home" title={home_title} style="background-image: url({logo})">
		{home}
	</a>

	<ul class="center">
		<slot name="nav-center" />
	</ul>

	<ul class="external">
		<slot name="nav-right" />
	</ul>

	<div class="placeholder" />

	<button
		aria-label="Toggle menu"
		aria-expanded={open.toString() === 'true'}
		class="menu-toggle flex justify-end"
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

<style>
	.modal-background {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;
		backdrop-filter: grayscale(0.5) blur(2px);
	}

	nav::after {
		content: '';
		position: absolute;
		width: 100%;
		height: var(--shadow-height);
		left: 0;
		bottom: calc(-1 * var(--shadow-height));
		background: var(--shadow-gradient);
	}

	nav:not(.visible):not(:focus-within) {
		transform: translate(0, calc(-100% - 1rem));
	}

	ul {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	ul :global(a) {
		color: var(--text);
	}

	.home {
		height: var(--nav-h);
		display: flex;
		text-indent: -9999px;
		background-position: calc(var(--side-nav) - 1rem) 50%;
		background-repeat: no-repeat;
		background-size: auto 100%;
	}

	nav {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-content: space-between;
	}

	.center {
		justify-content: center;
	}

	@media (max-width: 799px) {
		.placeholder {
			display: block;
		}

		ul {
			position: relative;
			display: none;
			width: 100%;
			background: white;
			padding: 1rem var(--side-nav);
		}

		.open ul {
			display: block;
		}

		ul.external {
			padding: 1rem var(--side-nav) 1rem;
		}

		ul.external::before {
			content: '';
			position: absolute;
			top: 0;
			left: var(--side-nav);
			width: calc(100% - 2 * var(--side-nav));
			height: 1px;
			background: radial-gradient(circle at center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
		}

		ul.external::after {
			content: '';
			position: absolute;
			width: 100%;
			height: var(--shadow-height);
			left: 0;
			bottom: calc(-1 * var(--shadow-height));
			background: var(--shadow-gradient);
		}
	}

	@media (min-width: 800px) {
		.modal-background {
			display: none;
		}

		ul {
			display: flex;
			width: auto;
			height: 100%;
		}

		ul :global(li) {
			margin: 0 0.5rem;
			padding: 0;
		}

		ul :global(a) {
			display: flex;
			align-items: center;
			height: 100%;
		}

		ul.external {
			padding: 0 var(--side-nav) 0 0;
			justify-content: end;
		}

		button {
			display: none;
		}

		.placeholder {
			display: none;
		}
	}
</style>
