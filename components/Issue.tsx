import { IssueNode } from "../__generated__/__types__";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import {
	useAddCommentToIssueMutation,
	AddCommentToIssueMutation,
} from "../lib/issues.graphql";

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
		setComment("");
	};

	return (
		<article className="p-4 border-2 rounded-2xl shadow-lg bg-green-100">
			<h3 className="text-center text-xl text-blue-600 capitalize">
				<a href={url}>{title}</a>
			</h3>
			<p className="p-4">{bodyText}</p>
			<p className="text-right">Comments amount: {totalCount}</p>
			<Input
				placeholder="Leave a comment..."
				onInput={onCommentInput}
				value={comment}
			/>
			<Button onClick={onCommentSubmit} disabled={!comment}>
				Submit comment
			</Button>
		</article>
	);
};

export default Issue;
