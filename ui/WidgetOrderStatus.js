import PropTypes from 'prop-types';
import { formatTime } from 'lib';

export const WidgetOrderStatus = ({ timeline }) => {
	timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

	return (
		<div className="relative">
			{timeline?.map((item, index) => (
				<div
					key={index}
					className={`relative flow-root pb-5 timeline-item ${
						index === 0 ? 'timeline-item-first' : ''
					}`}
				>
					<span
						className={`sm:w-2/3 hidden sm:inline-block sm:absolute sm:top-0 mt-2 sm:text-left sm:right-0`}
					>
						<span className={`block w-10 h-1 bg-gray-300 sm:float-left`} />
					</span>
					<small
						className={`sm:w-1/3 inline-block sm:absolute sm:top-0 text-gray-800 pl-4 sm:text-right sm:pr-10 sm:left-0`}
					>
						{formatTime(new Date(item.date))}
					</small>
					<div
						className={`sm:w-2/3 block sm:inline-block relative mt-0 sm:-mt-5 sm:float-right`}
					>
						<div className={`sm:float-left sm:ml-4`}>
							<div className={`bg-white py-5 pl-2 mb-0 ${index === 0 ? 'text-green-500' : ''}`}>{item.text}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

WidgetOrderStatus.propTypes = {
	timeline: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string,
			date: PropTypes.string
		})
	)
};
