<script>
	import '../app.css';
	let { children } = $props();
</script>

<main>
	<h1 class="title">MergeMaterial</h1>
	{@render children()}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
	}

	.title {
		font-size: 2rem;
		margin-bottom: 2rem;
		margin-top: 0;
		font-family: 'Arial', sans-serif;
	}
</style>
