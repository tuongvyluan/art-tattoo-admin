import Heading from 'components/Heading';
import MyModal from 'components/MyModal';
import { Badge, Tooltip } from 'flowbite-react';
import {
	fetcherPost,
	fetcherPut,
	formatDateTimeForInput,
	formatPrice,
	formatTime
} from 'lib';
import { BASE_URL } from 'lib/env';
import {
	BOOKING_DETAIL_STATUS,
	BOOKING_MEETING_STATUS,
	stringBookingMeetingColors,
	stringBookingMeetingStatus,
	stringPlacements,
	stringSize
} from 'lib/status';
import moment from 'moment';
import PropTypes from 'propTypes';
import { useState } from 'react';
import { BsCheck2, BsTrash } from 'react-icons/bs';
import { Alert } from 'ui';

const ScheduleBookingMeetingModal = ({
	bookingDetail,
	openModal,
	setOpenModal,
	setLoading,
	canEdit = false
}) => {
	const [minDate, setMinDate] = useState(
		formatDateTimeForInput(moment())
	);
	const [newMeeting, setNewMeeting] = useState(
		formatDateTimeForInput(moment())
	);

	// Alert related vars
	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: 'blue'
	});

	const handleAlert = (state, title, content, isWarn = 0) => {
		setShowAlert((prev) => state);
		let color;
		switch (isWarn) {
			case 1:
				color = 'green';
				break;
			case 2:
				color = 'red';
				break;
			default:
				color = 'blue';
				break;
		}
		setAlertContent({
			title: title,
			content: content,
			isWarn: color
		});
	};

	const handleSetMeeting = (e) => {
		setNewMeeting(formatDateTimeForInput(e.target.value));
	};

	const handleCreateMeeting = () => {
		if (canEdit) {
			handleAlert(true, '', 'Đang tạo lịch hẹn', 0);
			fetcherPost(`${BASE_URL}/booking-meetings`, {
				bookingDetailId: bookingDetail?.id,
				meetingTime: newMeeting
			})
				.then(() => {
					setLoading(true);
				})
				.catch(() => {
					handleAlert(true, 'Tạo lịch hẹn thất bại', '', 2);
				});
		} else {
			setOpenModal(false)
		}
	};

	const updateBookingMeeting = (id, status) => {
		handleAlert(true, '', 'Đang cập nhật lịch hẹn', 0);
		const payload = {
			id: id,
			status: status
		};
		if (status === BOOKING_MEETING_STATUS.STUDIO_CANCEL) {
			payload.cancelAt = formatDateTimeForInput(moment().add(12, 'hours'));
		}
		fetcherPut(`${BASE_URL}/booking-meetings`, payload)
			.then(() => {
				setLoading(true);
			})
			.catch(() => {
				handleAlert(true, 'Cập nhật lịch hẹn thất bại', '', 2);
			});
	};

	return (
		<div className="relative">
			<MyModal
				size="xl"
				openModal={openModal}
				setOpenModal={setOpenModal}
				title={'Sắp xếp lịch hẹn'}
				confirmTitle={'Tạo'}
				cancelTitle='Đóng'
				canConfirm={canEdit}
				onSubmit={handleCreateMeeting}
			>
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					color={alertContent.isWarn}
					className="bottom-2 right-2 fixed max-w-md z-50"
				>
					<strong className="font-bold mr-1">{alertContent.title}</strong>
					<span className="block sm:inline">{alertContent.content}</span>
				</Alert>
				<div className="max-h-96 overflow-auto">
					<Heading>
						<div className="flex flex-wrap gap-1">
							<div className="flex gap-1 flex-wrap items-center">
								{stringSize.at(bookingDetail?.serviceSize)},
							</div>

							{bookingDetail?.servicePlacement ? (
								<div className="flex gap-1 flex-wrap items-center">
									Vị trí xăm: {stringPlacements.at(bookingDetail?.servicePlacement)},
								</div>
							) : (
								<></>
							)}

							{bookingDetail?.serviceCategory ? (
								<div className="flex gap-1 flex-wrap items-center">
									{bookingDetail?.serviceCategory.name},
								</div>
							) : (
								<></>
							)}

							<div className="flex gap-1 flex-wrap items-center">
								{bookingDetail?.serviceMaxPrice === 0 ? (
									<div>Miễn phí</div>
								) : (
									<div>
										{formatPrice(bookingDetail?.serviceMinPrice)} -{' '}
										{formatPrice(bookingDetail?.serviceMaxPrice)}
									</div>
								)}
							</div>
						</div>
					</Heading>
					{
						// Booking meeting list
					}
					{bookingDetail?.bookingMeetings?.length > 0 ? (
						<table className="w-full text-sm text-left text-gray-500 pb-20">
							<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
								<tr>
									<th scope="col" className="w-1/3 px-3 py-3 bg-gray-50 text-center">
										Ngày hẹn
									</th>
									<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
										Trạng thái
									</th>
									<th scope="col" className="px-3 py-3 bg-gray-50 text-center"></th>
								</tr>
							</thead>
							<tbody>
								{bookingDetail?.bookingMeetings.map((time) => (
									<tr className="text-base" key={time.id}>
										<td scope="col" className="w-1/3 px-3 py-3 text-center">
											{formatTime(time.meetingTime)}
										</td>
										<td scope="col" className="px-3 py-3 text-center">
											<div className="flex justify-center w-full">
												<Badge color={stringBookingMeetingColors.at(time.status)}>
													{stringBookingMeetingStatus.at(time.status)}
												</Badge>
											</div>
										</td>
										<td scope="col" className="px-3 py-3 text-center">
											{time.status === BOOKING_MEETING_STATUS.PENDING && canEdit && (
												<div className="flex gap-3 flex-wrap">
													<Tooltip content="Huỷ hẹn">
														<div
															className="cursor-pointer"
															onClick={() =>
																updateBookingMeeting(
																	time.id,
																	BOOKING_MEETING_STATUS.STUDIO_CANCEL
																)
															}
														>
															<BsTrash size={25} />
														</div>
													</Tooltip>
													<Tooltip content="Hoàn thành buổi hẹn">
														<div
															className="cursor-pointer"
															onClick={() =>
																updateBookingMeeting(
																	time.id,
																	BOOKING_MEETING_STATUS.COMPLETED
																)
															}
														>
															<BsCheck2 size={25} />
														</div>
													</Tooltip>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div>Chưa có lịch hẹn nào cho dịch vụ này</div>
					)}
					{(bookingDetail?.status === BOOKING_DETAIL_STATUS.PENDING ||
						bookingDetail?.status === BOOKING_DETAIL_STATUS.IN_PROGRESS) && canEdit && (
						<div>
							<div className="py-2 font-semibold text-lg">Tạo lịch hẹn mới</div>
							<div className="max-w-max">
								<input
									min={minDate}
									type="datetime-local"
									step={1}
									value={newMeeting}
									onChange={handleSetMeeting}
									className="appearance-none relative block w-full px-3 py-2 ring-1 ring-gray-300 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none"
								/>
							</div>
						</div>
					)}
				</div>
			</MyModal>
		</div>
	);
};

ScheduleBookingMeetingModal.propTypes = {
	bookingDetail: PropTypes.object,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
	setLoading: PropTypes.func,
	canEdit: PropTypes.bool
};

export default ScheduleBookingMeetingModal;
