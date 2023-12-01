import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Loading } from 'ui';

const StudioInterior = ({ studioId }) => {
	// const [loading, setLoading] = useState(true);
	const [interiors, setInteriors] = useState([]);
	// if (loading) {
	// 	fetcher(`${BASE_URL}/interior`).then((data) => {
	// 		setInteriors(data);
	// 	});
	// 	setLoading(false);
	// 	return (
	// 		<div className="flex items-center justify-center h-full">
	// 			<Loading />
	// 		</div>
	// 	);
	// }
	return <div className="flex items-center justify-center h-full">Interior</div>;
};

StudioInterior.propTypes = {
	studioId: PropTypes.string
};

export default StudioInterior;
