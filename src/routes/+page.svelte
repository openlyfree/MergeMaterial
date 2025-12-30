<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import LikedProjects from './LikedProjects.svelte';
	import projects from '../lib/projects.json';

	let now = $state(0),
		likedIndices: number[] = $state([]);

	const likedProjects = $derived(likedIndices.map((i) => projects[i]).filter(Boolean));

	onMount(() => {
		const stored = localStorage.getItem('likedProjects');
		if (stored) likedIndices = [...new Set(JSON.parse(stored) as number[])];
		const lastIdx = localStorage.getItem('lastIdx');
		if (lastIdx) now = parseInt(lastIdx);
	});

	const next = (like: boolean) => {
		if (now >= projects.length) return;

		if (like) {
			if (!likedIndices.includes(now)) {
				likedIndices.push(now);
				localStorage.setItem('likedProjects', JSON.stringify(likedIndices));
			}
		} else {
			const disliked = JSON.parse(localStorage.getItem('dislikedProjects') || '[]');
			if (!disliked.includes(now)) {
				disliked.push(now);
				localStorage.setItem('dislikedProjects', JSON.stringify(disliked));
			}
		}
		now++;
		localStorage.setItem('lastIdx', now.toString());
	};
</script>

<main>
	<div class="lk">
		<LikedProjects {likedProjects} />
	</div>
	<div class="card">
		<Card current={now} getNext={next} />
	</div>
</main>

<style>
</style>
