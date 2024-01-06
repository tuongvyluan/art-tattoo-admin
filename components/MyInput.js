import PropTypes from 'prop-types';

const MyInput = ({
	name,
	value,
	onChange,
	required = false,
	placeholder,
	readonly,
	type = 'text'
}) => {
	return (
		<input
			aria-label={name}
			readOnly={readonly}
			type={type}
			name={name}
			value={value}
			required={required}
			onChange={onChange}
			placeholder={placeholder}
			className="appearance-none relative block w-full px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none"
		/>
	);
};

MyInput.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	readonly: PropTypes.bool
};

export default MyInput;
