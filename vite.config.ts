import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	build: {
		rollupOptions: {
			input: './index.html', // Explicitly specify the input
			output: {
				assetFileNames: 'assets/[name]-[hash].[ext]',
			},
		},
	},
});
