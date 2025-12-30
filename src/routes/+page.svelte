<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import LikedProjects from './LikedProjects.svelte';

	let now = $state(0),
		likedProjects: number[] = $state([]);

	onMount(() => {
		const stored = localStorage.getItem('likedProjects');
		if (stored) likedProjects = JSON.parse(stored);
	});

	const next = (like: boolean) => {
		if (like) {
			likedProjects.push(now);
			localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
		} else
			localStorage.setItem(
				'dislikedProjects',
				JSON.stringify([...JSON.parse(localStorage.getItem('dislikedProjects') || '[]'), now])
			);

		now++;
	};
</script>

<main>
	<div><Card current={now} getNext={next} /></div>
</main>

<style>
</style>
