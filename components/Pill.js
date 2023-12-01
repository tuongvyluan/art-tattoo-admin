import PropTypes from 'prop-types';

const Pill = ({ children, onClick, selected = false }) => {
	return !selected ? (
		<div
			onClick={onClick}
			className="text-gray-800 text-center bg-white border border-gray-700 hover:text-white hover:bg-gray-700 rounded-lg text-sm py-1 px-2 w-full"
		>
			{children}
		</div>
	) : (
		<div
			onClick={onClick}
			className="text-white text-center bg-gray-800 hover:bg-gray-700 rounded-lg text-sm py-1 px-2 w-full"
		>
			{children}
		</div>
	);
};

Pill.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	selected: PropTypes.bool
};

export default Pill;
