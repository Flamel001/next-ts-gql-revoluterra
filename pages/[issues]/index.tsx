import { initializeApollo } from "../../lib/apollo";
import { RepositoryIssuesDocument } from "../../lib/issues.graphql";
import { RepositoryIssues } from "../../__generated__/__types__";
import Issue from "../../components/Issue";
import { ViewerDocument, ViewerQueryResult } from "../../lib/viewer.graphql";

const Issues = ({ issues: { nodes } }: RepositoryIssues) => {
	return (
		<>
			<h2 className="text-center pt-4">List of issues:</h2>
			<ul>
				{nodes.length > 0 ? (
					nodes.map((node) => (
						<li key={node.id}>
							<Issue node={node} />
						</li>
					))
				) : (
					<p className="text-center">There are no open issues!</p>
				)}
			</ul>
		</>
		// </MainLayout>
	);
};

export async function getServerSideProps({ query }) {
	const apolloClient = initializeApollo();
	try {
		const { repository, owner } = query;
		const { data: repositoryData } = await apolloClient.query({
			query: RepositoryIssuesDocument,
			variables: { owner, repository },
		});
		const { data: viewerData } = (await apolloClient.query({
			query: ViewerDocument,
		})) as ViewerQueryResult;

		return { props: { ...repositoryData.repository, ...viewerData.viewer } };
	} catch {
		return { notFound: true };
	}
}

export default Issues;
