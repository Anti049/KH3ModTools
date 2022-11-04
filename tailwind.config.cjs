/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				command: ['KHCommand', 'sans-serif'],
			},
			animation: {
				'scroll-x': 'scroll-x 10s linear infinite',
				'scroll-y': 'scroll-y 10s linear infinite',
				slide: 'slide 3s linear infinite',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
}
