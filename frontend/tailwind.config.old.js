/** @type {import('tailwindcss').Config} */
module.exports = {

	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {

		colors: {
			keinBlue: "#0320F8",
			magenta: "#E53368",
			purple: "#5333AB",
			cimen: "#999999",
			silver: "#E6E6E6",
			separatorColor: "#BFBFBF",
			white: "#FFFFFF",
			black: "#000000",
			blackHover: "#252525",
			lightGray: "#f7f8fa",
			popupeffect: "#00000021",
			previewpoppupbg: "#e6e8f6"
		},
		boxShadow: {
			boxShadowBlack: "0em .125em .25em rgba(0, 0, 0, 0.25)",
		},
		width: {
			'31': '31.688rem',
			'16': '16.063rem',
			'34': '34.5rem',
			'60.5': '60.5rem',
			'100-width': '100%',
			'16.563': '16.563rem'
		},
		height: {
			'40.313': '40.313rem',
			'13.313': '13.313rem',
			'100-height': '100%',
			'100vh-height': '100vh',
			'fit-content': 'fit-content',
			'3.125': '3.125rem',
			'15.125': '15.125rem',
			'3.0': '3rem',
		},
		padding: {
			't-5': '5.938rem 0 0 0',
			't-142': '0 0 0 117px',
			'l-117': '0 0 0 142px',
			't-57': '0 0 0 57px',
			'tr-57-142': '57px 142px 0 0',
			'tb-0.844': '0.844rem 0',
			'tb-0.656': '0.656rem 0',
			'lbr-1.25-2.625-1.25': '0px 1.25rem 2.625rem 1.25rem',
			'3.313': '3.313rem 0 0 0',
			'trl-3.313-9-9': '3.313rem 9rem 0',
			'tbl-0.625-1.75-7.625': '0.625rem 0 1.75rem 7.625rem',
			'tbl-0.625-1.75-6': '0.625rem 0 1.75rem 6rem',
			'b-0.813': '0 0 0.813rem 0',
			'lr-5.438': '0 5.438rem',
			'lr-3.438': '0 3.438rem',
			'lr-2.438': '0 2.438rem',
		},

		margin: {
			'l-1.138': '0 1.138rem 0 0',
			't-5.781': '5.781rem 0 0 0',
			't-3.25': '3.25rem 0 0 0',
			'b-1.625': ' 0 0 1.625rem 0',
			't-2.438': '2.438rem 0 0 0',
			'tbl-1.438-2.938-1.313': '1.438rem 0 2.938rem 1.313rem',
			'b-1.5': '0 0 1.5rem 0',
			'b-2.438': '0 0 2.438rem 0',
			't-2.625': '2.625rem 0 0 0',
			'tl-4.375-3': '-4.375rem 0 0 3rem',
		},
		borderRadius: {
			'1.25': '1.25rem',
			'6.25': '6.25rem',
			'1.25-1.25': '1.25rem 1.25rem 0 0',
			'0-1.25-1.25': ' 0 0 1.25rem 1.25rem'
		},
		fontFamily: {
			"helvetica-medium": ["Helvetica Now Display Medium", "sans-serif"],
			"helvetica-regular": ["Helvetica Now Txt Regular", "sans-serif"],
			suisse: ["SuisseIntlMono-Regular", "sans-serif"],
		},
	},
	plugins: [],
};
