import Timetable from 'components/Calendar';
import { fetcher } from 'lib';
import { Loading } from 'ui';
import useSWR from 'swr';
import { workingTimeStatus } from 'lib/state';

function StudioTimetablePage() {
	const studioId = '595a0830-359a-4088-a6df-338584acccc6';
	const baseUrl = `${process.env.NEXT_PUBLIC_API_BASEURL}/Studio/api/Studios/${studioId}/Schedules`;
	let { data, error } = useSWR(baseUrl, fetcher);
	let loading = true;
	let renderedData, renderedDayViewData;

	if (data) {
		renderedData = [];
		renderedDayViewData = [];
		let newSlot, newDayViewSlot, slotStatus, titles, statuses;
		data.forEach((slot) => {
			titles = [];
			statuses = [];
			slot.assignedWorkingTimes.forEach((shift) => {
				switch (shift.workingTimeStatus) {
					case workingTimeStatus.AVAILABLE.valueOf():
						slotStatus = 'Available';
						break;

					case workingTimeStatus.BOOKED.valueOf():
						slotStatus = 'Booked';
						break;

					default:
						slotStatus = 'Busy';
						break;
				}
				titles.push(`${shift.artist.fullName} - ${slotStatus}`);
				statuses.push(shift.workingTimeStatus);
				newDayViewSlot = {
					id: slot.id,
					status: shift.workingTimeStatus,
					title: `${shift.artist.fullName} - ${slotStatus}`,
					startTime: new Date(slot.workStartTime),
					endTime: new Date(slot.workEndTime)
				};
        renderedDayViewData.push(newDayViewSlot)
			});
			newSlot = {
				id: slot.id,
				statuses: statuses,
				titles: titles,
				startTime: new Date(slot.workStartTime),
				endTime: new Date(slot.workEndTime)
			};
			renderedData.push(newSlot);
		});
		console.log(renderedData);
		loading = false;
	}

	if (error)
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load calendar data
			</div>
		);

	if (!data && loading)
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);

	return (
		<>
			<Timetable data={renderedData} dayViewData={renderedDayViewData} />
		</>
	);
}

export default StudioTimetablePage;
