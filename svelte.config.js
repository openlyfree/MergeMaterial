import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Allows SPA-like routing on GH Pages
			precompress: false,
			strict: true
		}),
		paths: {
			// If your repo is named 'MergeMaterial', put that here.
			// This ensures assets load from /MergeMaterial/ instead of /
			base: process.env.NODE_ENV === 'production' ? '/MergeMaterial' : ''
		}
	}
};

export default config;
