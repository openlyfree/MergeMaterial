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

<div class="container">
	<div class="lk">
		<LikedProjects {likedProjects} />
	</div>

	<div class="card-area">
		<h1 class="title">MergeMaterial</h1>
		<div class="card-wrapper"><Card current={now} getNext={next} /></div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}
	.card-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
  .card-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
    justify-content: center;
  }
</style>
