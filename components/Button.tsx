type ButtonProps = {
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
	children: React.ReactNode;
	disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: ButtonProps) => {
	return (
		<button
			className="text-white bg-blue-500 border border-blue-800 shadow-lg rounded-2xl p-4
      active:bg-blue-300 active:shadow-none"
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
