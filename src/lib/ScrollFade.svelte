<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Which side the text is on inside of the box
	 */
	export const textSide: 'left' | 'right' = 'left';

	let containerEl: HTMLElement;

	onMount(async () => {});
</script>

<div class="flex flex-row" bind:this={containerEl}>
	{#if textSide === 'left'}
		<slot name="text" />
		<slot name="hero" />
	{:else}
		<slot name="hero" />
		<slot name="text" />
	{/if}
</div>
