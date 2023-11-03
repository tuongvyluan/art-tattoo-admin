import '../index.css';

import App from 'next/app';
import AppProvider from 'components/AppProvider';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Page from 'layout/Page';
import { appWithTranslation } from 'i18n';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta charSet="utf-8" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="images/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="images/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="images/favicon-16x16.png"
					/>
					<link
						rel="mask-icon"
						href="images/safari-pinned-tab.svg"
						color="#5bbad5"
					/>
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="preconnect" href="https://fonts.gstatic.com"></link>
					<title>Square - Tailwind Admin Kit</title>
				</Head>

				<SessionProvider session={pageProps.session}>
					<AppProvider>
						<Page>
							<Component {...pageProps} />
						</Page>
					</AppProvider>
				</SessionProvider>
			</>
		);
	}
}

MyApp.getInitialProps = async (appContext) => ({
	...(await App.getInitialProps(appContext))
});

export default appWithTranslation(MyApp);
