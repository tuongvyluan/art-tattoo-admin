import PropTypes from 'prop-types';
import {
	BOOKING_DETAIL_STATUS,
	SERVICE_CATEGORY,
	getTattooArtIsCompleted,
	stringBookingDetailStatus,
	stringBookingDetailStatusColor,
	stringPlacements,
	stringSize
} from 'lib/status';
import {
	fetcherPut,
	formatPrice,
	formatTime,
	hasBookingMeeting,
	showTextMaxLength
} from 'lib';
import { Alert, Avatar, Card } from 'ui';
import {
	MdCalendarMonth,
	MdEdit,
	MdOutlineCalendarMonth,
	MdOutlineClose
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import UpdateBookingDetailModal from './UpdateBookingDetailModal';
import MyModal from 'components/MyModal';
import { BASE_URL } from 'lib/env';
import ScheduleBookingMeetingModal from './ScheduleBookingMeetingModal';
import { noImageAvailable } from 'lib/tattooPhoto';
import { Badge } from 'flowbite-react';

const CustomerServices = ({
	bookingDetails,
	canEdit = false,
	showDetails = false,
	showMore = false,
	setLoading,
	artistList,
	paidTotal = 0
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

	// Check whether the booking detail will be removed is the last available booking detail of the booking
	const checkIsLast = () => {
		return (
			bookingDetails?.filter((b) => b.status === BOOKING_DETAIL_STATUS.CANCELLED)
				.length ===
				bookingDetails?.length - 1 &&
			removedBookingDetail?.status === BOOKING_DETAIL_STATUS.PENDING
		);
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
			status:
				removedBookingDetail.status === BOOKING_DETAIL_STATUS.PENDING
					? BOOKING_DETAIL_STATUS.CANCELLED
					: BOOKING_DETAIL_STATUS.NOT_COMPLETED
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
		setRemovedBookingDetail;
	}, [scheduleModal]);

	// Open confirm remove modal when removedBookingDetail is not null
	useEffect(() => {
		if (removedBookingDetail) {
			setConfirmRemoveBookingDetailModal(true);
		}
	}, [removedBookingDetail]);

	// Reset removedBookingDetail when confirm remove modal is close
	useEffect(() => {
		if (confirmRemoveBookingDetailModal === false) {
			setRemovedBookingDetail(undefined);
		}
	}, [confirmRemoveBookingDetailModal]);

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
			{canEdit && showDetails && (
				<UpdateBookingDetailModal
					paidTotal={paidTotal}
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
			{canEdit && showDetails && (
				<MyModal
					openModal={confirmRemoveBookingDetailModal}
					setOpenModal={setConfirmRemoveBookingDetailModal}
					onSubmit={handleRemoveBookingDetail}
					warn={true}
					confirmTitle="Xác nhận"
					title="Xác nhận huỷ dịch vụ"
				>
					{checkIsLast() && (
						<div className="text-red-500 font-semibold pb-3">
							Đây là dịch vụ cuối cùng trong đơn hàng, nếu huỷ dịch vụ này, đơn hàng
							sẽ tự động huỷ.
						</div>
					)}
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
								{removedBookingDetail?.serviceMaxPrice === 0 ? (
									<div>Miễn phí</div>
								) : (
									<div>
										{formatPrice(removedBookingDetail?.serviceMinPrice)} -{' '}
										{formatPrice(removedBookingDetail?.serviceMaxPrice)}
									</div>
								)}
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
			{showDetails && (
				<ScheduleBookingMeetingModal
					canEdit={
						canEdit &&
						(scheduledBookingDetail?.status === BOOKING_DETAIL_STATUS.IN_PROGRESS ||
							scheduledBookingDetail?.status === BOOKING_DETAIL_STATUS.PENDING)
					}
					setLoading={setLoading}
					bookingDetail={scheduledBookingDetail}
					openModal={scheduleModal}
					setOpenModal={setScheduleModal}
				/>
			)}
			<div className="relative">
				{!showMore && bookingDetails.length > 3 && (
					<div className="absolute z-100 left-0 right-0 -bottom-10 text-center text-base underline">
						Xem thêm
					</div>
				)}
				{bookingDetails.map((bookingDetail, bookingServiceIndex) => (
					<Card
						className={`shadow-lg ${
							!showMore && bookingServiceIndex > 2 ? 'hidden' : ''
						}`}
						key={bookingDetail.id}
					>
						<div className="w-full flex flex-wrap sm:flex-nowrap justify-start gap-2 items-start bg-gray-50 py-5 relative">
							{showDetails && (
								<div className="absolute top-4 right-4 cursor-pointer flex flex-wrap gap-2">
									<div
										onClick={() =>
											onSelectScheduledBookingDetail(bookingServiceIndex)
										}
										className="relative"
									>
										<MdCalendarMonth size={20} />
									</div>
									{canEdit &&
										(bookingDetail?.status === BOOKING_DETAIL_STATUS.IN_PROGRESS ||
											bookingDetail?.status === BOOKING_DETAIL_STATUS.PENDING) && (
											<div
												onClick={() =>
													onSelectUpdatedBookingDetail(bookingServiceIndex)
												}
												className="relative"
											>
												<MdEdit size={20} />
											</div>
										)}
									{canEdit &&
										(bookingDetail?.status === BOOKING_DETAIL_STATUS.IN_PROGRESS ||
											bookingDetail?.status === BOOKING_DETAIL_STATUS.PENDING) && (
											<div className="relative">
												<MdOutlineClose
													onClick={() => setRemovedBookingDetail(bookingDetail)}
													size={20}
												/>
											</div>
										)}
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
											<div className="cursor-pointer">
												<div className="relative w-28">
													<Image
														width={0}
														height={0}
														sizes="100vw"
														priority
														src={
															bookingDetail.tattooArt.thumbnail
																? bookingDetail.tattooArt.thumbnail
																: noImageAvailable
														}
														alt={'a'}
														className="relative w-full h-auto rounded-2xl"
													/>
													<div className="pt-3 max-w-max mx-auto">
														<Badge
															color={
																bookingDetail.tattooArt.isCompleted
																	? 'success'
																	: 'warning'
															}
														>
															{getTattooArtIsCompleted(
																bookingDetail.tattooArt.isCompleted
															)}
														</Badge>
													</div>
												</div>
											</div>
										</Link>
									) : (
										<div className="border border-gray-300 rounded-xl w-28 h-28 cursor-default">
											<div className="px-2 py-10 text-center text-gray-600">
												{bookingDetail.serviceCategoryId !==
													SERVICE_CATEGORY.NEW_TATTOO &&
												bookingDetail.serviceCategoryId !== SERVICE_CATEGORY.COVER_UP
													? 'Không có hình xăm'
													: 'Chưa tạo hình xăm'}
											</div>
										</div>
									)}
								</div>
							</div>
							{
								// Phần bên phải của khung booking service
							}
							<div className="pl-3 w-full pr-3 sm:pr-24">
								<div
									key={bookingDetail.id}
									className="pb-1 flex flex-wrap gap-1 text-base"
								>
									<div>{bookingServiceIndex + 1}.</div>
									<div className="flex gap-1 flex-wrap items-center">
										{bookingDetail.serviceTitle},
									</div>
									<div className="flex gap-1 flex-wrap items-center">
										{stringSize.at(bookingDetail.serviceSize)},
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
										{bookingDetail.serviceMaxPrice === 0 ? (
											<div>Miễn phí</div>
										) : (
											<div>
												{formatPrice(bookingDetail.serviceMinPrice)} -{' '}
												{formatPrice(bookingDetail.serviceMaxPrice)}
											</div>
										)}
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
									{bookingDetail.price > 0 &&
										bookingDetail.status !== BOOKING_DETAIL_STATUS.CANCELLED && (
											<div className="flex flex-wrap items-center text-base font-semibold bg-teal-300 px-2 rounded-full">
												<div>{formatPrice(bookingDetail.price)}</div>
											</div>
										)}
									{
										// Ngày hẹn
									}
									{hasBookingMeeting(bookingDetail.bookingMeetings) && (
										<div className="flex flex-wrap gap-1 items-center text-base font-semibold bg-indigo-100 px-2 rounded-full">
											<MdOutlineCalendarMonth size={20} />
											<div>
												{formatTime(
													hasBookingMeeting(bookingDetail.bookingMeetings)
												)}
											</div>
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
									<div className='flex'>
										<Link
											prefetch={false}
											href={`/artist/${bookingDetail.artist?.id}`}
										>
											<a className="flex flex-wrap gap-1 items-center text-base font-semibold pt-3 text-black cursor-pointer">
												<Avatar
													size={25}
													src={
														bookingDetail.artist?.account?.avatar
															? bookingDetail.artist.account.avatar
															: '/public/images/ATL.png'
													}
												/>
												<div>{bookingDetail.artist?.account?.fullName}</div>
											</a>
										</Link>
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
	setLoading: PropTypes.func,
	showDetails: PropTypes.bool,
	paidTotal: PropTypes.number,
	minTotal: PropTypes.number
};

export default CustomerServices;
