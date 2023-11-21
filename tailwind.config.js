/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'synthwave',
			'cyberpunk',
			'coffee',
			'forest',
			'retro',
			'dim',
			'night',
			'dark',
			'light',
			'halloween'
		]
	}
};
