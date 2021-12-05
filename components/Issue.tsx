import { IssueNode } from "../__generated__/__types__";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import {
	useAddCommentToIssueMutation,
	AddCommentToIssueMutation,
} from "../__generated__/lib/issues.graphql";

type IssueProps = {
	node: IssueNode;
};

const Issue = ({ node }: IssueProps) => {
	const [issueNode, setissueNode] = useState(node);
	const [comment, setComment] = useState("");
	const [addComment] = useAddCommentToIssueMutation({
		onCompleted: ({
			addComment: {
				commentEdge: {
					node: { issue },
				},
			},
		}: AddCommentToIssueMutation) => {
			setissueNode(issue);
		},
	});
	const {
		bodyText,
		comments: { totalCount },
		title,
		id,
		url,
	} = issueNode;

	const onCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	const onCommentSubmit = () => {
		addComment({ variables: { id, comment } });
	};

	return (
		<article className="p-4 border-2 rounded-2xl shadow-lg bg-green-200 relative">
			<p className="absolute right-4 top-4">Comments amount: {totalCount}</p>
			<h3 className="text-center text-lg text-blue-600">
				<a href={url}>{title}</a>
			</h3>
			<p className="border-2 p-4">{bodyText}</p>
			<Input placeholder="Leave a comment..." onInput={onCommentInput} />
			<Button onClick={onCommentSubmit} disabled={!comment}>
				Submit comment
			</Button>
		</article>
	);
};

export default Issue;
