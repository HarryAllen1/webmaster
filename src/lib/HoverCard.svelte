<script lang="ts">
	const cardSubtitle = 'Really long subtitle so that the text wraps';
</script>

<div class="card">
	<div class="card-content">
		<h3 class="card-title">Card Title</h3>
		<h4 class="card-subtitle">
			{#each cardSubtitle.split(' ') as word, i}
				<span class="card-subtitle-word z-30" style="transition-delay: {i}ms">{word}</span>
			{/each}
		</h4>
	</div>
</div>

<style lang="scss">
	.card {
		@apply bg-slate-900;
		aspect-ratio: 1 / 1.6;
		cursor: pointer;
		position: relative;
		width: 56vmin;
	}

	.card:hover:before {
		background-position: 100% 100%;
		transform: scale(1.08, 1.03);
	}

	.card:hover > .card-content {
		background-position: -10% 0%;
	}

	.card:hover > .card-content > .card-subtitle > .card-subtitle-word {
		opacity: 1;
		transform: translateY(0%);
		transition: opacity 0ms, transform 200ms cubic-bezier(0.9, 0.06, 0.15, 0.9);
	}

	.card:before {
		background: linear-gradient(
			130deg,
			transparent 0% 33%,
			rgb(50, 0, 130) 66%,
			rgb(180, 64, 240) 83.5%,
			rgb(255, 200, 255) 100%
		);
		background-position: 0% 0%;
		background-size: 300% 300%;
		content: '';
		height: 100%;
		left: 0px;
		pointer-events: none;
		position: absolute;
		top: 0px;
		transition: background-position 350ms ease, transform 350ms ease;
		width: 100%;
		z-index: 1;
	}

	.card-content {
		background-image: radial-gradient(rgba(255, 255, 255, 0.2) 8%, transparent 8%);
		background-position: 0% 0%;
		background-size: 5vmin 5vmin;
		height: calc(100% - 10vmin);
		padding: 5vmin;
		position: relative;
		transition: background-position 350ms ease;
		width: calc(100% - 10vmin);
		z-index: 2;
	}

	.card-title,
	.card-subtitle {
		color: white;
		font-family: 'Anek Latin', sans-serif;
		font-weight: 400;
		margin: 0px;
	}

	.card-title {
		font-size: 6vmin;
	}

	.card-subtitle {
		font-size: 3vmin;
		margin-top: 2vmin;
	}

	.card-subtitle-word {
		display: inline-block;
		margin: 0vmin 0.3vmin;
		opacity: 0;
		position: relative;
		transform: translateY(40%);
		transition: none;
	}
</style>
