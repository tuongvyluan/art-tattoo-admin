import PropTypes from 'prop-types';

const MyInput = ({ name, value, onChange }) => {
	return (
		<input
			type="text"
			name={name}
			value={value}
			onChange={onChange}
			className="appearance-none relative block w-full px-3 py-1 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
		/>
	);
};

MyInput.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};

export default MyInput;
