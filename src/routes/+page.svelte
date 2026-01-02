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
		position: relative;
		min-height: 100vh;
		width: 100vw;
	}

	.lk {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}

	.card-area {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 3rem;
		background: linear-gradient(135deg, #ffffff 0%, #888888 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.05em;
		text-align: center;
	}

	.card-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
