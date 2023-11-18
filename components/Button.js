import PropTypes from 'prop-types';

const Button = ({ children, onClick, outline = false, type = 'submit' }) => {
	return outline ? (
		<button
			type={type}
			onClick={onClick}
			className="text-gray-800 bg-white border border-gray-700 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
		>
			{children}
		</button>
	) : (
		<button
			type={type}
			onClick={onClick}
			className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string,
	onClick: PropTypes.func,
	outline: PropTypes.bool
};

export default Button;
