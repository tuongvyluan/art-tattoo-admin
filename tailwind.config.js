/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
	// purge: ['./**/*.js'],
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./pages/**/*.{ts,js}',
		'./public/**/*.html'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				body: '#f9f9fa'
			},
			fontSize: {
				sm: '0.8125rem',
				xxs: '10px'
			},
			opacity: {
				80: '0.80'
			},
			borderRadius: {
				xl: '2rem'
			},
			boxShadow: {
				xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
				outline: '0 0 0 3px rgba(66, 153, 225, 0.5)'
			},
			height: {
				152: '37.5rem',
				body: 'calc(100vh - 136px)',
				noFooter: 'calc(100vh - 60px)'
			},
			minHeight: {
				body: 'calc(100vh - 136px)',
				noFooter: 'calc(100vh - 60px)'
			},
			maxHeight: {
				152: '37.5rem',
				body: 'calc(100vh - 120px)',
				noFooter: 'calc(100vh - 60px)'
			},
			minWidth: {
				0: '0rem',
				xs: '20rem',
				sm: '24rem',
				md: '28rem',
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem',
				full: '100%',
				min: 'min-content',
				max: 'max-content'
			},
			width: {
				152: '37.5rem'
			},
			borderWidth: {
				1.5: '1.5px',
				0.5: '0.5px'
			},
			padding: {
				4.5: '1.125rem'
			},
			zIndex: {
				100: '100'
			}
		}
	},
	experimental: {
		images: {
			allowFutureImage: true
		}
	},
	variants: {
		backgroundColor: ['dark', 'hover'],
		borderColor: ['dark', 'hover'],
		textColor: ['dark', 'hover'],
		boxShadow: ['dark', 'hover']
	},
	plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')]
};
