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

		if (Math.abs(offsetX) > 200) {
			dragging = false;
			const isLike = offsetX > 0;
			offsetX = isLike ? 1000 : -1000;
			setTimeout(() => {
				getNext(isLike);
				offsetX = 0;
			}, 300);
		}
	}

	function onEnd() {
		if (!dragging) return;
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
	style="transform: translateX({offsetX}px) rotate({offsetX * 0.05}deg); opacity: {1 -
		Math.abs(offsetX) * 0.0008};"
	onmousedown={onStart}
	onmousemove={onMove}
	onmouseup={onEnd}
	ontouchstart={onStart}
	ontouchmove={onMove}
	ontouchend={onEnd}
	{...rest}
>
	{#if project}
		<div class="content">
			<h4 class="title">{project.title}</h4>
			<h4 class="description">{project.description}</h4>
			<h4 class="difficulty">{diffStars} ({project.difficulty})</h4>
			<div class="stack-container">
				{#each project.stack as tech}
					<span class="chip">{tech}</span>
				{/each}
			</div>
		</div>
		<div class="buttons">
			<button class="brdr-right" onclick={() => getNext(false)}>Dislike</button>
			<button onclick={() => getNext(true)}>Like</button>
		</div>
	{:else}
		<div class="content">
			<h4 class="title">No More Projects</h4>
			<h4 class="description">You've reviewed all available projects!</h4>
		</div>
	{/if}
</div>

<style>
	.mncrd {
		width: 100%;
		max-width: 420px;
		height: 520px;
		border-radius: 24px;
		background: rgba(30, 30, 30, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		display: flex;
		flex-direction: column;
		user-select: none;
		touch-action: pan-y;
		box-shadow: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
		cursor: grab;
	}

	.mncrd:active {
		cursor: grabbing0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.mncrd:hover {
		transform: translateY(-4px);
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
	}

	h4 {
		margin: 0;
		font-weight: 400;
		color: #d0d0d0;
		line-height: 1.6;
	}

	.title {
		font-size: 1.75rem;
		font-weight: 600;
		color: #ffffff;
		margin-bottom: 0.75rem;
	}

	.description {
		font-size: 1rem;
		color: #a0a0a0;
		margin-bottom: 1.5rem;
		max-width: 320px;
	}

	.difficulty {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.stack-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		max-width: 100%;
		padding: 0 1rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 20px;
		color: #e0e0e0;
		font-size: 0.85rem;
		font-weight: 500;
		letter-spacing: 0.01em;
		transition: all 0.2s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.chip:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.25);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.buttons {
		display: flex;
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	button {
		flex: 1;
		padding: 1.25rem;
		background: transparent;
		border: none;
		color: #b0b0b0;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		letter-spacing: 0.025em;
	}

	button:hover {
		background: rgba(255, 255, 255, 0.05);
		color: #ffffff;
	}

	button:active {
		background: rgba(255, 255, 255, 0.08);
	}

	.brdr-right {
		border-right: 1px solid rgba(255, 255, 255, 0.08);
	}
</style>
