import Input from "./Input";
import { Repository } from "../__generated__/__types__";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useUserRepositoriesQuery } from "../lib/user.graphql";

const Search = () => {
	const [ownerError, setOwnerError] = useState("");
	const [repositoryError, setRepositoryError] = useState("");
	const [owner, setOwner] = useState("");
	const [repositories, setRepositories] = useState<Repository["nodes"]>([]);

	useUserRepositoriesQuery({
		variables: { login: owner },
		pollInterval: 500,
		skip: owner === "",
		onCompleted: (data) => {
			setOwnerError("");
			//if first symbol in owner input deleted before query completes - here could be error
			try {
				let {
					user: {
						repositories: { nodes },
					},
				} = data;
				let result = nodes;
				setRepositories(result);
			} catch {}
		},
		onError: () => {
			setRepositories([]);
			setOwnerError("Could not find user " + owner);
		},
	});
	const router = useRouter();

	const onOwnerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRepositories([]);
		setOwner(e.target.value);
	};

	const onRepositoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		if (
			repositories.find(
				({ name }) => name.toLowerCase() === input.toLowerCase()
			)
		) {
			setRepositoryError("");
			router.push(`issues?owner=${owner}&repository=${input}`);
		} else if (
			repositories.some(({ name }) =>
				name.toLowerCase().startsWith(input.toLowerCase())
			)
		) {
			setRepositoryError("");
		} else {
			setRepositoryError(
				"There are no repositories, that starts with " + input
			);
		}
	};

	return (
		<article className="p-4 grid content-center">
			<Input
				onInput={onOwnerInput}
				value={owner}
				error={ownerError}
				label={"Repository owner"}
				placeholder={"Enter username..."}
			/>
			<Input
				label="Repository name"
				id="repository-choice"
				list="repository-list"
				placeholder="Start typing repo..."
				onInput={onRepositoryInput}
				disabled={repositories.length === 0}
				title={repositories.length === 0 ? "Enter repository owner first" : ""}
				error={repositoryError}
			/>
			<datalist className="absolute" id="repository-list">
				{repositories.map(({ name, id }) => (
					<option key={id} value={name} />
				))}
			</datalist>
		</article>
	);
};

export default Search;
