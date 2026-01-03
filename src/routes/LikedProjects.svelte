<script lang="ts">
	let { likedProjects = [], ...rest } = $props();
	let isOpen = $state(true);

	function togglePanel() {
		isOpen = !isOpen;
	}
</script>

<div class="container" class:closed={!isOpen} {...rest}>
	<button
		class="toggle-btn"
		onclick={togglePanel}
		aria-label={isOpen ? 'Close panel' : 'Open panel'}
	>
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			{#if isOpen}
				<path
					d="M12 5L7 10L12 15"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{:else}
				<path
					d="M8 5L13 10L8 15"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/if}
		</svg>
	</button>

	<div class="content">
		<h1>Liked Projects</h1>
		{#if likedProjects.length === 0}
			<p>No liked projects yet.</p>
		{:else}
			<ul>
				{#each likedProjects as project}
					<li>
						<h5>{project.title}</h5>
						<p>{project.description}</p>
						{#each project.tags as tag}
							<span>{tag}</span>
						{/each}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 360px;
		height: 100vh;
		background: rgba(20, 20, 20, 0.6);
		border-right: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.container.closed {
		transform: translateX(-360px);
	}

	.toggle-btn {
		position: absolute;
		right: -40px;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 80px;
		background: rgba(20, 20, 20, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-left: none;
		border-top-right-radius: 12px;
		border-bottom-right-radius: 12px;
		backdrop-filter: blur(20px);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #b0b0b0;
		transition: all 0.2s ease;
		z-index: 11;
	}

	.toggle-btn:hover {
		background: rgba(30, 30, 30, 0.9);
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.15);
	}

	.content {
		height: 100%;
		overflow-y: auto;
		padding: 2rem 1.5rem;
	}

	.content::-webkit-scrollbar {
		width: 6px;
	}

	.content::-webkit-scrollbar-track {
		background: transparent;
	}

	.content::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.container::-webkit-scrollbar {
		width: 6px;
	}

	.container::-webkit-scrollbar-track {
		background: transparent;
	}

	.container::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.container::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: #ffffff;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		letter-spacing: -0.025em;
	}

	p {
		font-size: 0.9rem;
		color: #888;
		text-align: center;
		margin-top: 3rem;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	li {
		background: rgba(40, 40, 40, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		padding: 1.25rem;
		transition: all 0.2s ease;
	}

	li:hover {
		background: rgba(50, 50, 50, 0.5);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateX(4px);
	}

	h5 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #ffffff;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	li p {
		font-size: 0.85rem;
		color: #a0a0a0;
		line-height: 1.5;
		margin: 0.5rem 0 1rem 0;
		text-align: left;
	}

	span {
		display: inline-block;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		color: #c0c0c0;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0.25rem 0.75rem;
		border-radius: 6px;
		font-weight: 400;
		transition: all 0.2s ease;
	}

	span:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
	}
</style>
