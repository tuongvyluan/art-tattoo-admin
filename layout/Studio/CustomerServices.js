import PropTypes from 'prop-types';
import {
	BOOKING_DETAIL_STATUS,
	stringBookingDetailStatus,
	stringBookingDetailStatusColor,
	stringPlacements,
	stringSize
} from 'lib/status';
import { fetcherPut, formatPrice, formatTime, showTextMaxLength } from 'lib';
import { Alert, Avatar, Card } from 'ui';
import {
	MdCalendarMonth,
	MdEdit,
	MdOutlineCalendarMonth,
	MdOutlineClose
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UpdateBookingDetailModal from './UpdateBookingDetailModal';
import MyModal from 'components/MyModal';
import { BASE_URL } from 'lib/env';
import ScheduleBookingMeetingModal from './ScheduleBookingMeetingModal';

const CustomerServices = ({
	bookingDetails,
	canEdit = false,
	showMore = false,
	setLoading,
	artistList
}) => {
	const [bookingDetailModal, setBookingDetailModal] = useState(false);
	const [confirmRemoveBookingDetailModal, setConfirmRemoveBookingDetailModal] =
		useState(false);
	const [scheduleModal, setScheduleModal] = useState(false);
	const [selectedBookingDetail, setSelectedBookingDetail] = useState(undefined);
	const [removedBookingDetail, setRemovedBookingDetail] = useState(undefined);
	const [scheduledBookingDetail, setScheduledBookingDetail] = useState(undefined);

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

	const onSelectUpdatedBookingDetail = (detailIndex) => {
		setSelectedBookingDetail(bookingDetails.at(detailIndex));
	};

	const onSelectScheduledBookingDetail = (detailIndex) => {
		setScheduledBookingDetail(bookingDetails.at(detailIndex));
	};

	const handleRemoveBookingDetail = () => {
		fetcherPut(`${BASE_URL}/booking-details/${removedBookingDetail.id}`, {
			id: removedBookingDetail.id,
			status: BOOKING_DETAIL_STATUS.CANCELLED
		})
			.then(() => {
				setConfirmRemoveBookingDetailModal(false);
				setLoading(true);
			})
			.catch(() => {
				setConfirmRemoveBookingDetailModal(false);
				handleAlert(true, 'Huỷ dịch vụ thất bại.', '', 2);
			});
	};

	// Open update booking detail modal when selectedBookingDetail not null
	useEffect(() => {
		if (selectedBookingDetail) {
			setBookingDetailModal(true);
		}
	}, [selectedBookingDetail]);

	// Reset selectedBookingDetail when bookingDetailModal is close
	useEffect(() => {
		if (bookingDetailModal === false) {
			setSelectedBookingDetail(undefined);
		}
	}, [bookingDetailModal]);

	// Oprn schedule modal when scheduledBookingDetail is not null
	useEffect(() => {
		if (scheduledBookingDetail) {
			setScheduleModal(true);
		}
	}, [scheduledBookingDetail]);

	// Reset scheduledBookingDetail when scheduleModal is closed
	useEffect(() => {
		if (scheduleModal === false) {
			setScheduledBookingDetail(undefined);
		}
	}, [scheduleModal]);

	// Open confirm remove modal when removedBookingDetail is not null
	useEffect(() => {
		if (removedBookingDetail) {
			setConfirmRemoveBookingDetailModal(true);
		}
	}, [removedBookingDetail]);

	// Reset removedBookingDetail when confirm remove modal is close
	useEffect(() => {
		if (removedBookingDetail === false) {
			setRemovedBookingDetail(undefined);
		}
	}, [removedBookingDetail]);

	return (
		<div className="relative">
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn}
				className="bottom-2 right-2 fixed max-w-md z-50"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			{
				// Update booking detail modal
			}
			{canEdit && (
				<UpdateBookingDetailModal
					openModal={bookingDetailModal}
					setLoading={setLoading}
					artistList={artistList}
					bookingDetail={selectedBookingDetail}
					setOpenModal={setBookingDetailModal}
				/>
			)}
			{
				// Confirm remove modal
			}
			{canEdit && (
				<MyModal
					openModal={confirmRemoveBookingDetailModal}
					setOpenModal={setConfirmRemoveBookingDetailModal}
					onSubmit={handleRemoveBookingDetail}
					warn={true}
					confirmTitle="Xác nhận"
					title="Xác nhận huỷ dịch vụ"
				>
					<div className="font-semibold text-lg pb-3">
						Bạn có chắc sẽ huỷ dịch vụ sau chứ?
					</div>
					<div>
						<div className="pb-3 flex gap-1 flex-wrap items-center">
							<div className="w-28">Tên dịch vụ:</div>
							<span className="font-semibold">
								{removedBookingDetail?.serviceTitle}
							</span>
						</div>
						<div className="pb-3 flex gap-1 flex-wrap items-center">
							<div className="w-28">Kích thước:</div>
							<span className="font-semibold">
								{stringSize.at(removedBookingDetail?.serviceSize)}
							</span>
						</div>

						{removedBookingDetail?.servicePlacement ? (
							<div className="pb-3 flex gap-1 flex-wrap items-center">
								<div className="w-28">Vị trí xăm:</div>
								<span className="font-semibold">
									{stringPlacements.at(removedBookingDetail?.servicePlacement)}
								</span>
							</div>
						) : (
							<></>
						)}

						{removedBookingDetail?.serviceCategory ? (
							<div className="pb-3 flex gap-1 flex-wrap items-center">
								<div className="w-28">Loại dịch vụ:</div>
								<span className="font-semibold">
									{removedBookingDetail?.serviceCategory.name}
								</span>
							</div>
						) : (
							<></>
						)}

						<div className="pb-3 flex gap-1 flex-wrap items-center">
							<div className="w-28">Khoảng giá:</div>
							<span className="font-semibold">
								{formatPrice(removedBookingDetail?.serviceMinPrice)} -{' '}
								{formatPrice(removedBookingDetail?.serviceMaxPrice)}
							</span>
						</div>
					</div>
					{removedBookingDetail?.artistId && (
						<div className="pb-3 flex gap-1 flex-wrap items-center">
							<div className="w-28">Nghệ sĩ xăm:</div>
							<span className="font-semibold">
								{
									artistList
										?.filter((a) => a?.id === removedBookingDetail.artistId)
										?.at(0).account.fullName
								}
							</span>
						</div>
					)}
					<div className="pb-3 flex gap-1 flex-wrap items-center">
						<div className="w-28">Giá tiền:</div>{' '}
						<span className="font-semibold">
							{removedBookingDetail?.price
								? formatPrice(removedBookingDetail?.price)
								: 'Chưa xác định'}
						</span>
					</div>
					<div className="pb-3 flex gap-1 flex-wrap items-center">
						<div className="w-28">Trạng thái:</div>{' '}
						<span className="font-semibold">
							{stringBookingDetailStatus.at(removedBookingDetail?.status)}
						</span>
					</div>
				</MyModal>
			)}
			{
				// Schedule bookingMeeting modal
			}
			{canEdit && (
				<ScheduleBookingMeetingModal
					bookingDetail={scheduledBookingDetail}
					openModal={scheduleModal}
					setOpenModal={setScheduleModal}
				/>
			)}
			<div className="block">
				{bookingDetails.map((bookingDetail, bookingServiceIndex) => (
					<Card
						className={`shadow-lg ${
							!showMore && bookingServiceIndex > 2 ? 'hidden' : ''
						}`}
						key={bookingDetail.id}
					>
						<div className="w-full flex justify-start gap-2 items-start bg-gray-50 py-5 relative">
							{canEdit &&
								bookingDetail.status !== BOOKING_DETAIL_STATUS.COMPLETED &&
								bookingDetail.status !== BOOKING_DETAIL_STATUS.CANCELLED && (
									<div className="absolute top-4 right-4 cursor-pointer flex flex-wrap gap-2">
										<div
											onClick={() =>
												onSelectScheduledBookingDetail(bookingServiceIndex)
											}
											className="relative"
										>
											<MdCalendarMonth size={20} />
										</div>
										<div
											onClick={() =>
												onSelectUpdatedBookingDetail(bookingServiceIndex)
											}
											className="relative"
										>
											<MdEdit size={20} />
										</div>
										<div className="relative">
											<MdOutlineClose
												onClick={() => setRemovedBookingDetail(bookingDetail)}
												size={20}
											/>
										</div>
									</div>
								)}
							{
								// Phần hình xăm của booking service
							}
							<div className="flex justify-start gap-2 items-center bg-gray-50 pl-5">
								<div>
									{bookingDetail.tattooArt ? (
										<Link
											href={`/tattoo/${bookingDetail.tattooArt.id}?booking=${bookingDetail.tattooArt.bookingId}`}
										>
											<div className="cursor-pointer flex justify-start gap-3 flex-wrap">
												<div className="relative w-24 h-24">
													<Image
														layout="fill"
														src={
															bookingDetail.tattooArt.thumbnail
																? bookingDetail.tattooArt.thumbnail
																: '/images/ATL.png'
														}
														alt={'a'}
														className="object-contain rounded-2xl"
													/>
												</div>
											</div>
										</Link>
									) : (
										<div className="border border-black rounded-xl w-24 h-24 cursor-default">
											<div className="px-2 py-7 text-center">Không có hình xăm</div>
										</div>
									)}
								</div>
							</div>
							{
								// Phần bên phải của khung booking service
							}
							<div className="pl-3 w-full">
								<div
									key={bookingDetail.id}
									className="pb-1 flex flex-wrap gap-1 text-base"
								>
									<div>{bookingServiceIndex + 1}</div>
									<div className="flex gap-1 flex-wrap items-center">
										. {stringSize.at(bookingDetail.serviceSize)},
									</div>

									{bookingDetail.servicePlacement ? (
										<div className="flex gap-1 flex-wrap items-center">
											Vị trí xăm:{' '}
											{stringPlacements.at(bookingDetail.servicePlacement)},
										</div>
									) : (
										<></>
									)}

									{bookingDetail.serviceCategory ? (
										<div className="flex gap-1 flex-wrap items-center">
											{bookingDetail.serviceCategory.name},
										</div>
									) : (
										<></>
									)}

									<div className="flex gap-1 flex-wrap items-center">
										{formatPrice(bookingDetail.serviceMinPrice)} -{' '}
										{formatPrice(bookingDetail.serviceMaxPrice)}
									</div>
								</div>
								{
									//Description
								}
								<div className="pb-1">
									{showTextMaxLength(bookingDetail.description, 50)}
								</div>
								<div className="flex flex-wrap gap-3 items-center ">
									{
										// Giá tiền
									}
									{bookingDetail.price > 0 && (
										<div className="flex flex-wrap items-center text-base font-semibold bg-teal-300 px-2 rounded-full">
											<div>{formatPrice(bookingDetail.price)}</div>
										</div>
									)}
									{
										// Ngày hẹn
									}
									{bookingDetail.bookingMeetings?.length > 0 && (
										<div className="flex flex-wrap gap-1 items-center text-base font-semibold bg-indigo-100 px-2 rounded-full">
											<MdOutlineCalendarMonth size={20} />
											<div>{formatTime(new Date())}</div>
										</div>
									)}
									{
										// Trạng thái
									}
									<div
										className={`flex flex-wrap gap-1 items-center text-base font-semibold bg-${stringBookingDetailStatusColor.at(
											bookingDetail.status
										)} px-2 rounded-full`}
									>
										<div>{stringBookingDetailStatus.at(bookingDetail.status)}</div>
									</div>
								</div>
								{
									// Assign artist
								}
								{bookingDetail.artist && (
									<div className="flex flex-wrap gap-1 items-center text-base font-semibold pt-3">
										<Avatar
											size={25}
											src={
												bookingDetail.artist?.account?.avatar
													? bookingDetail.artist.account.avatar
													: '/public/images/ATL.png'
											}
										/>
										<div>{bookingDetail.artist?.account?.fullName}</div>
									</div>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

CustomerServices.propTypes = {
	bookingDetails: PropTypes.array,
	canEdit: PropTypes.bool,
	showMore: PropTypes.bool,
	artistList: PropTypes.array,
	setLoading: PropTypes.func
};

export default CustomerServices;
