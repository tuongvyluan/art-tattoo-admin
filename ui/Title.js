import PropTypes from 'prop-types';

export const Title = ({ children }) => {
	return (
		<div className="flex items-center pb-4">
			<span className="flex items-center relative py-px cursor-pointer truncate text-sm uppercase font-bold">
				{children}
			</span>
		</div>
	);
};

Title.propTypes = {
	children: PropTypes.node.isRequired
};
