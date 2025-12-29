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
		startX = e.clientX; // Record the anchor point
	}

	function onMouseMove(e: MouseEvent) {
		if (!dragging) return;
		offsetX = e.clientX - startX;
		if (!(Math.abs(e.clientX - startX) > 150)) return;
		dragging = false;
		next();
	}

	function onMouseUp() {
		dragging = false;
		offsetX = 0;
	}
</script>

<main>
	<h1>MergeMaterial</h1>
	<br />
	<div
		role="presentation"
		onmousedown={onMouseDown}
		onmousemove={onMouseMove}
		onmouseup={onMouseUp}
		onmouseleave={onMouseUp}
	>
		<Card current={now} />
	</div>
</main>
