<script lang="ts">
	// Using the $props rune for Svelte 5
	let { likedProjects = [], ...rest } = $props();
</script>

<div {...rest}>
	{#if likedProjects.length === 0}
		<p>No liked projects yet.</p>
	{:else}
		<ul>
			{#each likedProjects as pj, i (i)}
				<li>
					<h4>{pj.title}</h4>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style></style>