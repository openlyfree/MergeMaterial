<script lang="ts">
	import Card from './Card.svelte';

	let now = $state(0),
		dragging = $state(false),
		startX = $state(0),
		offsetX = $state(0);

	const next = () => {
		now += 1;
		offsetX = 0;
	};

	// Helper to get X position from either Mouse or Touch
	const getX = (e: MouseEvent | TouchEvent) => {
		return 'touches' in e ? e.touches[0].clientX : e.clientX;
	};

	function onStart(e: MouseEvent | TouchEvent) {
		dragging = true;
		startX = getX(e);
	}

	function onMove(e: MouseEvent | TouchEvent) {
		if (!dragging) return;
		offsetX = getX(e) - startX;

		if (Math.abs(offsetX) > 150) {
			dragging = false;
			next();
		}
	}

	function onEnd() {
		dragging = false;
		offsetX = 0;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="overflow-hidden select-none">
	<h1>MergeMaterial</h1>

	<div
		role="presentation"
		class="card-container"
		onmousedown={onStart}
		onmousemove={onMove}
		onmouseup={onEnd}
		ontouchstart={onStart}
		ontouchmove={onMove}
		ontouchend={onEnd}
	>
		<Card current={now} {offsetX} />
	</div>
</main>

<style>
	.card-container {
		touch-action: pan-y;
		user-select: none;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
