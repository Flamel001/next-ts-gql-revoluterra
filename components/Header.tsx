import Image from "next/image";
import { initializeApollo } from "../lib/apollo";
import { ViewerDocument, ViewerQueryResult } from "../lib/viewer.graphql";
import { Viewer } from "../__generated__/__types__";

export type HeaderProps = {
	avatarUrl?: string;
	login?: string;
};

const Header = ({ avatarUrl, login }: HeaderProps) => {
	return (
		<header className="flex bg-green-400 p-4 items-center gap-4 h-header">
			{avatarUrl && <Image width={"40"} height={"40"} src={avatarUrl}></Image>}
			<p>{login}</p>
		</header>
	);
};

export default Header;
