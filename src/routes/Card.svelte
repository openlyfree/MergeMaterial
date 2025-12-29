<script lang="ts">
	import projects from './../lib/projects.json';
	export let current: number;
	$: now = projects[current];
</script>

<div class="mncrd" {...$$restProps}>
	<h4>{now.title}</h4>
	<h4>{now.description}</h4>
	<h4>{now.difficulty}</h4>
	<h4>{now.stack}</h4>
</div>

<style>
</style>
