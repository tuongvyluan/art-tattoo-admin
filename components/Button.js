import PropTypes from 'prop-types';

const Button = ({ children }) => {
	return (
		<button
			type="submit"
			className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-blue-800"
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired
};

export default Button;
