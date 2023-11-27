import PropTypes from 'prop-types';

const Button = ({
	children,
	onClick,
	outline = false,
	warn = false,
	reset = false
}) => {
	if (warn) {
		return (
			<button
				type={reset ? 'reset' : 'submit'}
				onClick={onClick}
				className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
			>
				{children}
			</button>
		);
	}
	return outline ? (
		<button
			type={reset ? 'reset' : 'submit'}
			onClick={onClick}
			className="text-gray-800 bg-gray-100 ring-1 ring-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
		>
			{children}
		</button>
	) : (
		<button
			type={reset ? 'reset' : 'submit'}
			onClick={onClick}
			className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	reset: PropTypes.bool,
	onClick: PropTypes.func,
	outline: PropTypes.bool,
	warn: PropTypes.bool
};

export default Button;
