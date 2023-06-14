import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../state_management/store";
import localFont from "next/font/local";

const helveticaDisplay = localFont({
	src: "../../public/fonts/HelveticaNowDisplayMedium.otf",
	variable: "--helvetica-font-family",
});

const helveticaText = localFont({
	src: "../../public/fonts/HelveticaNowText.otf",
	variable: "---helvetica-regular-font-family",
});

const suisseIntl = localFont({
	src: "../../public/fonts/SuisseIntlMono-Regular.otf",
	variable: "--suisse-font-family",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<main
				className={`${helveticaDisplay.variable} ${helveticaText.variable} ${suisseIntl.variable}`}
			>
				<Component {...pageProps} />
			</main>
		</Provider>
	);
}
