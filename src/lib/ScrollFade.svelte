<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Which side the text is on inside of the box
	 */
	export const textSide: 'left' | 'right' = 'left';

	let containerEl: HTMLElement;
	let animate = false;

	onMount(async () => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animate = true;
				} else {
					animate = false;
				}
			});
		});

		observer.observe(containerEl);
	});
</script>

<div class:animate class="flex flex-row fade-card" bind:this={containerEl}>
	{#if textSide === 'left'}
		<slot name="text" />
		<slot name="hero" />
	{:else}
		<slot name="hero" />
		<slot name="text" />
	{/if}
</div>

<style lang="scss">
	.fade-card {
		opacity: 0;
		filter: blur(5px);
		transform: translateX(-20px);
		transition: all 0.3s ease-in-out;
		&.animate {
			opacity: 1;
			filter: blur(0);
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion) {
		.fade-card {
			transition: none;
			opacity: 1 !important;
			filter: none !important;
			transform: none !important;
		}
	}
</style>
