<script lang="ts">
	import { onMount } from 'svelte';
	import {
		blur,
		slide,
		type BlurParams,
		type SlideParams,
		type TransitionConfig,
	} from 'svelte/transition';

	export let fadeInFrom: 'top' | 'bottom' | 'left' | 'right' = 'left';
	export let style = '';
	// eslint-ignore-next-line @typescript-eslint/no-explicit-any
	export let inAnimation: (node: Element, params: any) => TransitionConfig = (
		node,
		{ delay = 0, duration = 300 }: SlideParams & BlurParams = {}
	) => {
		const slideTransition = slide(node, { delay, duration });
		const blurTransition = blur(node, { delay, duration });

		return {
			duration,
			delay,
			css: (t: number, u: number) => {
				// css is always defined in the slide transition: https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts#L122
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const slideStyles = slideTransition.css!(t, u);
				//same here
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const blurStyles = blurTransition.css!(t, u);

				return `${slideStyles} ${blurStyles}`;
			},
		};
	};
	// eslint-ignore-next-line @typescript-eslint/no-explicit-any
	export let outAnimation: (node: Element, params: any) => TransitionConfig = () => ({});
	/**
	 * The duration of the animation, in seconds.
	 */
	export let duration = 300;
	export let delay = 0;
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
				} else animate = false;
			});
		});

		observer.observe(containerEl);
	});
</script>

{#if animate}
	<div
		in:inAnimation={{ duration, delay }}
		out:outAnimation={{ duration, delay }}
		{style}
		class="flex flex-row"
		bind:this={containerEl}
	>
		<slot />
	</div>
{/if}
