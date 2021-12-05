import { ViewerDocument, ViewerQueryResult } from "../lib/viewer.graphql";
import { initializeApollo } from "../lib/apollo";
import { Viewer } from "../__generated__/__types__";
import MainLayout from "../layouts/MainLayout";

const Index = () => {
	// const Index = ({ login, repositories: { nodes } }: Viewer) => {
	return (
		<h2 className="text-lg text-center p-4 whitespace-pre-wrap flex items-center justify-center h-full">
			{`Type reposiory owner 
      and choose the repository name 
      to get the list of associated issies`}
		</h2>
	);
	// return` <MainLayout login={login} />;
	// {ServerPropsForQuery and qProps ? <issueList> : <Explanation>}
};

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const { data } = (await apolloClient.query({
		query: ViewerDocument,
	})) as ViewerQueryResult;

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
			...data.viewer,
		},
	};
}

export default Index;
