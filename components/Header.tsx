import Image from "next/image";

export type HeaderProps = {
	avatarUrl?: string;
	login?: string;
};

const Header = ({ avatarUrl, login }: HeaderProps) => {
	return (
		<header className="flex bg-green-400 p-4 items-center gap-4 h-header">
			{avatarUrl && (
				<Image alt="avatar" width={"40"} height={"40"} src={avatarUrl}></Image>
			)}
			<p>{login}</p>
		</header>
	);
};

export default Header;
