import Search from "../components/Search";
import Header, { HeaderProps } from "../components/Header";

type MainLayoutProps = {
	children?: React.ReactNode;
} & HeaderProps;

const MainLayout = ({ children, avatarUrl, login }: MainLayoutProps) => {
	return (
		<main className="font-comfortaa text-gray-800 h-screen">
			<Header avatarUrl={avatarUrl} login={login} />
			<section className="grid grid-cols-3 h-content">
				<Search />
				<article className="border-l-2 col-span-2 p-4 overflow-scroll">
					{children}
				</article>
			</section>
		</main>
	);
};

export default MainLayout;
