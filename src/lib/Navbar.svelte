<script lang="ts">
	import { pages } from '$lib/pages';
	import { page } from '$app/stores';

	$: pageStore = $page;
</script>

<div class="sticky top-0 px-8 text-xl mb-4 text-white z-20">
	<div class="py-4 pr-4 max-w-6xl grid grid-cols-3 items-center mx-auto xl:px-8">
		<div class="flex items-center space-x-4 md:space-x-0">
			<div class="flex">
				{#each pages as page}
					{#if page.visibleInNavAndSidebar !== false}
						<a
							class="mr-6 navbar-link"
							href={page.link}
							class:border-opacity-100={pageStore.url.pathname === page.link}
						>
							{page.name}
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<div class="flex items-center justify-center space-x-4 md:space-x-0 max-h-4">
			Become an Astronaut
		</div>
	</div>
</div>

<style lang="scss">
	.navbar-link {
		@apply transition-opacity duration-700 mr-6 no-underline relative leading-6 block;
		&:hover {
			@apply text-white;
		}
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			background: #fff;
			transform: scaleX(0);
			transform-origin: right center;
			transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
				-webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
		}
		&::after:hover {
			transition-duration: 0.4s;
			transform: scaleX(1);
			transform-origin: left center;
		}
	}
</style>
