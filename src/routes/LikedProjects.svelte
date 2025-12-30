<script lang="ts">
	let { likedProjects = [], ...rest } = $props();
</script>

<div class="container" {...rest}>
	<h1>Liked Projects</h1>
	{#if likedProjects.length === 0}
		<p>No liked projects yet.</p>
	{:else}
		<ul>
			{#each likedProjects as pj, i (i)}
				<li>
					<h5>{pj.title}</h5>
					<p>{pj.description}</p>
					{#each pj.stack as tech}
						<span>{tech}</span>
					{/each}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	p {
		font-size: medium;
	}
	h5 {
    padding-top: 10px;
		font-size: large;
	}
	.container {
		max-width: 40vh;
		height: 100vh;
		border-right: 2px solid #ccc;
		border-top: 2px solid #ccc;
		border-bottom: 2px solid #ccc;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}
	span {
		margin-right: 0.5rem;
		font-size: small;
		border: 2px solid #ccc;
		padding: 0.2rem 0.4rem;
		border-radius: 1rem;
	}
	h1 {
		text-align: center;
		margin-bottom: 1rem;
		font-size: x-large;
		border-bottom: 1px solid #ccc;
	}
</style>
