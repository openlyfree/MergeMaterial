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

	function onMouseDown(e: MouseEvent) {
		dragging = true;
		startX = e.clientX;
	}

	function onMouseMove(e: MouseEvent) {
		if (!dragging) return;
		offsetX = e.clientX - startX;

		// Swipe Threshold
		if (Math.abs(offsetX) > 150) {
			dragging = false;
			next();
		}
	}

	function onMouseUp() {
		dragging = false;
		offsetX = 0;
	}
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="select-none">
	<h1>MergeMaterial</h1>

	<div
		role="presentation"
		onmousedown={onMouseDown}
		onmousemove={onMouseMove}
		onmouseup={onMouseUp}
		onmouseleave={onMouseUp}
		style="transform: translateX({offsetX}px) rotate({offsetX * 0.05}deg); cursor: {dragging
			? 'grabbing'
			: 'grab'}"
	>
		<Card current={now} />
	</div>
</main>
