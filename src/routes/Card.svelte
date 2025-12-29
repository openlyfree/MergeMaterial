<script lang="ts">
	import projects from './../lib/projects.json';
	let { current = 0, ...rest } = $props();
	let project = $derived(projects[current]);

	let diffStars = $derived.by(() => {
		if (!project) return '';
		return '⭐'.repeat(project.difficulty || 0);
	});
</script>

<div class="mncrd" {...rest}>
	{#if project}
		<h4>{project.title}</h4>
		<h4>{project.description}</h4>
		<h4>{diffStars} ({project.difficulty})</h4>
		<h4>{project.stack}</h4>
	{:else}
		<h4>Yeah you're never gonna find a project :(</h4>
	{/if}
</div>
