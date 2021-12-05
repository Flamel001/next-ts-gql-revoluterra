import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

import "../app.css";
import MainLayout from "../layouts/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	const { avatarUrl, login } = pageProps;
	return (
		// <ApolloProvider client={client}>
		<ApolloProvider client={apolloClient}>
			<MainLayout avatarUrl={avatarUrl} login={login}>
				<Component {...pageProps} />
			</MainLayout>
		</ApolloProvider>
	);
}
