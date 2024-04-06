import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

import manifest from './src/manifest.json';

console.log(crx);

export default defineConfig({
	plugins: [crx({ manifest })],
	build: {
		outDir: `dist`,
	},
	resolve: {
		alias: {
			src: '/src',
		},
	},
	server: { port: 3000, hmr: { port: 3000 } },
});
