<script lang="ts">
	import { pages } from '$lib/pages';
	import { sidebarOpen } from './MobileSidebar.svelte';
	import { page } from '$app/stores';

	$: pageStore = $page;
</script>

<div class="sticky top-0 px-8 text-xl mb-4 text-white z-20">
	<div class="py-4 pr-4 max-w-6xl grid grid-cols-3 items-center mx-auto xl:px-8">
		<div class="flex items-center space-x-4 md:space-x-0">
			<button
				type="button"
				class="pr-4 text-white lg:hidden"
				on:click={() => {
					$sidebarOpen = true;
				}}
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</button>
			<div class="hidden lg:flex">
				{#each pages as page}
					{#if page.visibleInNavAndSidebar !== false}
						<a
							class="mr-6 navbar-link border-b-2 border-white border-opacity-0 hover:border-opacity-100"
							href={page.link}
							class:border-opacity-100={pageStore.url.pathname === page.link}
						>
							{page.name}
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<div class="flex items-center justify-center space-x-4 md:space-x-0 max-h-4">something</div>
	</div>
</div>

<style lang="scss">
	.navbar-link {
		@apply transition-all no-underline;
		&:hover {
			@apply text-white;
		}
	}
</style>
