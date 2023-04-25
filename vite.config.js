import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

// const { VITE_API_ROUTE_LOGIN } = loadEnv("development", process.cwd());
// export default defineConfig({
// 	plugins: [sveltekit()],
// 	server: {
// 		proxy: {
// 			"/api": {
// 				target: VITE_API_ROUTE_LOGIN,
// 				changeOrigin: true,
// 				rewrite: (path) => path.replace(/^\/api/, ""),
// 			},
// 		},
// 	},
// });

export default ({ mode }) => {
	// Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development)'
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		plugins: [sveltekit()],
		server: {
			proxy: {
				'/api': {
					target: process.env.VITE_API_URL
				}
			}
		}
	});
};
