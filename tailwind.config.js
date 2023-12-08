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
				body: 'calc(100vh - 124px)',
				noFooter: 'calc(100vh - 60px)'
			},
			minHeight: {
				body: 'calc(100vh - 124px)',
				noFooter: 'calc(100vh - 60px)'
			},
			maxHeight: {
				152: '37.5rem',
				body: 'calc(100vh - 120px)',
				noFooter: 'calc(100vh - 60px)'
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
