type InputProps = {
	id?: string;
	list?: string;
	placeholder?: string;
	label?: string;
	value?: string;
	disabled?: boolean;
	error?: string;
	title?: string;
	onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	id,
	list,
	onInput,
	placeholder,
	label,
	value,
	disabled,
	error,
	title,
}: InputProps) => {
	const Label = label && (
		<label htmlFor={id} className="pl-4">
			{label}
		</label>
	);
	const Error = <div className="pl-4 pb-4 text-red-500">{error}</div>;
	return (
		<div className="grid" title={title}>
			{Label}
			<input
				className="border rounded p-4 focus:ring-4 disabled:opacity-50"
				id={id}
				list={list}
				onInput={onInput}
				placeholder={placeholder}
				value={value}
				disabled={disabled}
			/>
			{Error}
		</div>
	);
};

export default Input;
