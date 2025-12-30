<script lang="ts">
	import projects from './../lib/projects.json';
	let { current = 0, getNext, ...rest } = $props(),
		project = $derived(projects[current]),
		diffStars = $derived.by(() => {
			if (!project) return '';
			return '⭐'.repeat(project.difficulty || 0);
		}),
		dragging = $state(false),
		startX = $state(0),
		offsetX = $state(0);

	const getX = (e: MouseEvent | TouchEvent) => ('touches' in e ? e.touches[0].clientX : e.clientX);

	function onStart(e: MouseEvent | TouchEvent) {
		dragging = true;
		startX = getX(e);
	}

	function onMove(e: MouseEvent | TouchEvent) {
		if (!dragging) return;
		offsetX = getX(e) - startX;

		if (Math.abs(offsetX) > 100) {
			dragging = false;
			getNext(offsetX > 0);
		}
	}

	function onEnd() {
		dragging = false;
		offsetX = 0;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') getNext(true);
		else if (e.key === 'ArrowLeft') getNext(false);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="mncrd overflow-hidden select-none"
	onmousedown={onStart}
	onmousemove={onMove}
	onmouseup={onEnd}
	ontouchstart={onStart}
	ontouchmove={onMove}
	ontouchend={onEnd}
	{...rest}
>
	{#if project}
		<h4>{project.title}</h4>
		<h4>{project.description}</h4>
		<h4>{diffStars} ({project.difficulty})</h4>
		<h4>{project.stack}</h4>
		<div class="buttons">
			<button class="brdr-right" onclick={() => getNext(false)}>Dislike</button>
			<button onclick={() => getNext(true)}>Like</button>
		</div>
	{:else}
		<h4>Yeah you're never gonna find a project :(</h4>
	{/if}
</div>

<style>
	.mncrd {
		width: 300px;
		height: 400px;
		border-radius: 12px;
		border: 2px solid #ccc;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		user-select: none;
		touch-action: pan-y;
		user-select: none;
		display: flex;
		justify-content: center;
		border: 2px solid #eee;
	}

	h4 {
		margin: 10px;
		margin-top: 20px;
		margin-bottom: 25px;
		font-family: 'Arial', sans-serif;
	}

	.buttons {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		border-top: 1px solid #ccc;
	}

	button {
		flex: 1;
		cursor: pointer;
	}

	.brdr-right {
		border-right: 1px solid #ccc;
	}
</style>
