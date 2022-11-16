<script lang="ts">
	import { onMount } from 'svelte';

	export let fadeInFrom: 'top' | 'bottom' | 'left' | 'right' = 'left';
	export let style = '';
	/**
	 * Whether to animate every time the element is scrolled into view, or just once.
	 */
	export let once = true;

	let containerEl: HTMLElement;
	let animate = false;
	let animated = false;

	onMount(async () => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (once && animated) return observer.disconnect();

				if (entry.isIntersecting) {
					animate = true;
					animated = true;
				} else {
					animate = false;
				}
			});
		});

		observer.observe(containerEl);
	});
</script>

<div
	{style}
	class:animate
	class="flex flex-row fade-card"
	class:translate-x-5={fadeInFrom === 'right'}
	class:-translate-x-5={fadeInFrom === 'left'}
	class:translate-y-5={fadeInFrom === 'bottom'}
	class:-translate-y-5={fadeInFrom === 'top'}
	bind:this={containerEl}
>
	<slot />
</div>

<style lang="scss">
	.fade-card {
		opacity: 0;
		filter: blur(5px);
		transition: all 0.3s ease-in-out;
		&.animate {
			opacity: 1;
			transform: none !important;
			filter: blur(0);
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
