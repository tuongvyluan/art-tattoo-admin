import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import { useState } from 'react';
import classNames from 'classnames';

const CalendarComponents = () => {
	const textClasses = ['text-green-500', 'text-red-500', 'text-gray-100'];
	return {
		month: {
			event: (props) => {
				const startTime = props.event.startTime
				const endTime = props.event.endTime
				return <>{moment(startTime).format('hh:mm')} - {moment(endTime).format('hh:mm')}</>
			}
		},
		week: {
			event: (props) => {
				return props.event.titles ? (
					<div>
						{props.event.titles.map((title, i) => (
							<div
								className={classNames(
									textClasses.at(props.event.statuses[i]),
									'font-semibold'
								)}
								key={title}
							>
								{title}
							</div>
						))}
					</div>
				) : (
					<>{props.event.title}</>
				);
			}
		}
	}
}

const CalendarApp = ({ data, dayViewData }) => {
	const [date, setDate] = useState(moment().toDate());
	const [view, setView] = useState(Views.WEEK);

	const localizer = momentLocalizer(moment);

	let renderedData = data;

	if (view === Views.DAY) {
		renderedData = dayViewData
	}

	const views = {
		month: true,
		week: true,
		day: true
	};

	const backgrounds = ['#E3FEF7', '#E3EBFE', '#FFEEE4', '#E2FAFE', '#FFF7E4', '#E8E1FF', '#FFFFB5', '#CCE2CB']
	const randomBackground = () => {
		return backgrounds[Math.round(Math.random() * 7)]
	}

	return (
		<div className="-mx-4 overflow-y-auto h-full block">
			<Calendar
				views={views}
				selectable
				view={view}
				localizer={localizer}
				events={renderedData}
				components={CalendarComponents()}
				eventPropGetter={(event) => {
					return {
						style: {
							backgroundColor: randomBackground(),
							fontWeight: 600
						}
					};
				}}
				startAccessor="startTime"
				endAccessor="endTime"
				date={date}
				onNavigate={(date) => {
					setDate(date);
				}}
				onView={(view) => {
					setView(view)
				}}
				step={60}
				min={new Date(2017, 10, 0, 8, 0, 0)}
				max={new Date(2017, 10, 0, 20, 0, 0)}
				// components={{
				//   toolbar: CustomToolbar,
				// }}
			/>
		</div>
	);
};

export default CalendarApp;
