<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Which side the text is on inside of the box
	 */
	export let textSide: 'left' | 'right' = 'left';
	export let fadeInFrom: 'top' | 'bottom' | 'left' | 'right' = 'left';

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

<div
	class:animate
	class="flex flex-row fade-card"
	class:translate-x-5={fadeInFrom === 'right'}
	class:-translate-x-5={fadeInFrom === 'left'}
	class:translate-y-5={fadeInFrom === 'bottom'}
	class:-translate-y-5={fadeInFrom === 'top'}
	bind:this={containerEl}
>
	{#if textSide === 'left'}
		<div>
			<slot name="text" />
		</div>
		{#if $$slots.center}
			<div>
				<slot name="center" />
			</div>
		{/if}
		<div>
			<slot name="hero" />
		</div>
	{:else}
		<div>
			<slot name="hero" />
		</div>
		{#if $$slots.center}
			<div>
				<slot name="center" />
			</div>
		{/if}
		<div>
			<slot name="text" />
		</div>
	{/if}
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
