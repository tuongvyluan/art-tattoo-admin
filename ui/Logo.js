import Image from 'next/image';
import PropTypes from 'prop-types';

export const Logo = (props) => (
	<Image
		src={'/images/ATL.png'}
		width="36px"
		height="36px"
		className="inline-block"
    alt='ATL logo'
		{...props}
	/>
);

Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
};
