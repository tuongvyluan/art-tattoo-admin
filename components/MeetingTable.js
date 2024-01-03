import { Badge, Tooltip } from 'flowbite-react';
import { Search } from 'icons/outline';
import { extractServiceFromBookingDetail, formatTime } from 'lib';
import {
	ROLE,
	stringBookingMeetingColors,
	stringBookingMeetingStatus
} from 'lib/status';
import Link from 'next/link';
import PropTypes from 'propTypes';
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";

const MeetingTable = ({ meetings = [], sort, isAsc = true }) => {
	const getArtistOrCustomer = (meeting, role) => {
		if (role === ROLE.ARTIST) {
			return meeting.artist?.account?.fullName
				? meeting.artist.account.fullName
				: 'Nghệ sĩ bất kì';
		}
		return meeting.customer.fullName;
	};

	return (
		<div className="relative shadow-md sm:rounded-lg overflow-x-auto mb-3">
			<table className="w-full min-w-max text-sm text-left text-gray-500">
				<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
					<tr>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50">
							<div className="flex flex-wrap gap-2">
								<div>Thời gian hẹn</div>
								<div role='button' onClick={() => sort(!isAsc)}>
									{
										isAsc ? <BsSortUpAlt size={18} /> : <BsSortDownAlt size={18} />
									}
								</div>
							</div>
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50">
							Nghệ sĩ
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50">
							Khách hàng
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50">
							Nội dung hẹn
						</th>
						<th scope="col" className="max-w-0 px-4 py-3 w-40 bg-gray-50">
							Trạng thái
						</th>
						<th scope="col" className="max-w-0 px-2 py-3 w-40 bg-gray-50"></th>
					</tr>
				</thead>
				<tbody>
					{meetings.map((meeting, meetingIndex) => (
						<tr key={meeting.id} className="text-base hover:bg-gray-50">
							<td scope="col" className="text-left text-gray-900 px-4 py-3">
								{formatTime(meeting.meetingTime)}
							</td>
							<td scope="col" className="text-left text-gray-900 px-4 py-3">
								{getArtistOrCustomer(meeting, ROLE.ARTIST)}
							</td>
							<td scope="col" className="text-left text-gray-900 px-4 py-3">
								{getArtistOrCustomer(meeting, ROLE.CUSTOMER)}
							</td>
							<td scope="col" className="w-1/3 text-left text-gray-900 px-4 py-3">
								{extractServiceFromBookingDetail(meeting.bookingDetail)}
							</td>
							<td scope="col" className="text-left text-gray-900 px-4 py-3">
								<div className="flex flex-wrap min-w-max">
									<Badge color={stringBookingMeetingColors.at(meeting.status)}>
										{stringBookingMeetingStatus.at(meeting.status)}
									</Badge>
								</div>
							</td>
							<td scope="col" className="text-left text-gray-900 px-4 py-3">
								<Tooltip content="Xem chi tiết đơn hàng">
									<Link
										prefetch={false}
										href={`/booking/${meeting?.bookingDetail?.bookingId}`}
									>
										<Search className="cursor-pointer" width={18} height={18} />
									</Link>
								</Tooltip>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

MeetingTable.propTypes = {
	meetings: PropTypes.array,
	sort: PropTypes.func,
	isAsc: PropTypes.bool
};

export default MeetingTable;
