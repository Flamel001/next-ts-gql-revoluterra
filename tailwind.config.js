module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layouts/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				comfortaa: "'Comfortaa', cursive",
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ["active"],
			boxShadow: ["active"],
			opacity: ["disabled"],
		},
	},
	plugins: [],
};
