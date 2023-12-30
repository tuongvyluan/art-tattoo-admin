import PropTypes from 'propTypes';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const MyRating = ({ rating, onChange, readonly = false, allowFraction = false }) => {
	const [ratingValue, setRatingValue] = useState(rating);

	const handleChange = (rate) => {
		setRatingValue(rate);
		onChange(rate);
	};
	return (
		<div
			style={{
				direction: 'ltr',
				fontFamily: 'sans-serif',
				touchAction: 'none'
			}}
		>
			<Rating
				allowFraction={allowFraction}
				className="w-full"
				fillColorArray={['#ef4444', '#f97316', '#facc15', '#84cc16', '#22c55e']}
				transition
				onClick={handleChange}
				initialValue={ratingValue}
				iconsCount={5}
				readonly={readonly}
			/>
		</div>
	);
};

MyRating.propTypes = {
	rating: PropTypes.number,
	onChange: PropTypes.func,
	readonly: PropTypes.bool,
	allowFraction: PropTypes.bool
};

export default MyRating;
