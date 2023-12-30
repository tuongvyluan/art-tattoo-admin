import { Badge } from 'flowbite-react';
import { extractServiceFromBookingDetail, formatTime } from 'lib';
import {
	ROLE,
	stringBookingMeetingColors,
	stringBookingMeetingStatus
} from 'lib/status';
import PropTypes from 'propTypes';

const MeetingTable = ({ meetings = [] }) => {
	const getArtistOrCustomer = (meeting, role) => {
		if (role === ROLE.ARTIST) {
			return meeting.artist?.account?.fullName
				? meeting.artist.account.fullName
				: 'Nghệ sĩ bất kì';
		}
		return meeting.customer.fullName;
	};
	return (
		<div className="relative shadow-md sm:rounded-lg min-w-max overflow-x-auto mb-3">
			<table className="w-full min-w-max text-sm text-left text-gray-500">
				<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
					<tr>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800">
							Thời gian hẹn
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800">
							Nghệ sĩ
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800">
							Khách hàng
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800">
							Nội dung hẹn
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800">
							Trạng thái
						</th>
					</tr>
				</thead>
				<tbody>
					{meetings?.map((meeting, meetingIndex) => (
						<tr key={meeting.id} className="text-base">
							<td
								scope="col"
								className="text-left text-gray-900 px-4 py-3 bg-white dark:bg-gray-800"
							>
								{formatTime(meeting.meetingTime)}
							</td>
							<td
								scope="col"
								className="text-left text-gray-900 px-4 py-3 bg-white dark:bg-gray-800"
							>
								{getArtistOrCustomer(meeting, ROLE.ARTIST)}
							</td>
							<td
								scope="col"
								className="text-left text-gray-900 px-4 py-3 bg-white dark:bg-gray-800"
							>
								{getArtistOrCustomer(meeting, ROLE.CUSTOMER)}
							</td>
							<td
								scope="col"
								className="w-1/3 text-left text-gray-900 px-4 py-3 bg-white dark:bg-gray-800"
							>
								{extractServiceFromBookingDetail(meeting.bookingDetail)}
							</td>
							<td
								scope="col"
								className="text-left text-gray-900 px-4 py-3 bg-white dark:bg-gray-800"
							>
								<div className="flex flex-wrap">
									<Badge color={stringBookingMeetingColors.at(meeting.status)}>
										{stringBookingMeetingStatus.at(meeting.status)}
									</Badge>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

MeetingTable.propTypes = {
	meetings: PropTypes.array
};

export default MeetingTable;
