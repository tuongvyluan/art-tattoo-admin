import { ChevronLeft } from 'icons/solid';
import {
	extractBookingStatusTimeline,
	fetcherPut,
	formatDateForInput,
	formatPrice
} from 'lib';
import {
	BOOKING_STATUS,
	stringBookingStatuses,
	stringColor,
	stringDifficult,
	stringPlacements,
	stringSize
} from 'lib/status';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Alert, Card, CardBody, Link } from 'ui';
import { WidgetOrderStatus } from 'ui/WidgetOrderStatus';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { BASE_URL } from 'lib/env';
import MyModal from 'components/MyModal';
import cancelReasons from 'lib/cancelReasons';
import Router from 'next/router';

function BookingDetailsPage({ data, studioId }) {
	const timeline = extractBookingStatusTimeline(data);
	const [bookingStatus, setBookingStatus] = useState(data.status);

	// Cancel related vars
	const [cancelStatus, setCancelStatus] = useState(BOOKING_STATUS.CUSTOMER_CANCEL);
	const [confirmCancelBookingModal, setConfirmCancelBookingModal] = useState(false);
	const [cancelReason, setCancelReason] = useState('');

	const handleCancelReason = ({ status, reason }) => {
		setCancelReason(reason);
		setCancelStatus(status);
	};

	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

	const handleAlert = (state, title, content, isWarn = false) => {
		setShowAlert((prev) => state);
		setAlertContent({
			title: title,
			content: content,
			isWarn: isWarn
		});
	};

	const [meetingDate, setMeetingDate] = useState(
		data.date ? formatDateForInput(data.date) : formatDateForInput(Date.now())
	);

	const confirmBooking = () => {
		handleAlert(true, 'Đang xác nhận');
		fetcherPut(`${BASE_URL}/studios/${studioId}/bookings/${data.id}`, {
			meetingDate: new Date(meetingDate).toISOString(),
			status: BOOKING_STATUS.CONFIRMED
		})
			.then((data) => {
				setBookingStatus(BOOKING_STATUS.CONFIRMED);
				handleAlert(true, 'Xác nhận đơn hàng thành công');
			})
			.catch((e) => {
				handleAlert(true, 'Xác nhận đơn hàng thất bại', '', true);
			});
	};

	const handleAfterConfirmed = (status) => {
		handleAlert(true, 'Đang cập nhật trạng thái');
		const body = {
			status: status
		};
		if (status === BOOKING_STATUS.CUSTOMER_CANCEL) {
			body.customerCancelReason = cancelReason;
		}
		if (status === BOOKING_STATUS.STUDIO_CANCEL) {
			body.studioCancelReason = cancelReason;
		}
		fetcherPut(`${BASE_URL}/studios/${studioId}/bookings/${data.id}`, body)
			.then((data) => {
				setBookingStatus(status);
				handleAlert(true, 'Cập nhật trạng thái đơn hàng thành công');
			})
			.catch((e) => {
				handleAlert(true, 'Cập nhật trạng thái đơn hàng thành công');
			});
		setConfirmCancelBookingModal(false);
	};

	const handleChangeMeetingDate = (e) => {
		const today = Date.now();
		console.log(e.target.value < today);
		if (new Date(e.target.value) < today) {
			handleAlert(
				true,
				'Ngày hẹn không hợp lệ',
				'Ngày hẹn phải trong tương lai',
				true
			);
		} else {
			setMeetingDate(e.target.value);
		}
	};

	useEffect(() => {
		Router.replace(window.location.href);
	}, [bookingStatus]);

	return (
		<div className="relative">
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn ? 'red' : 'blue'}
				className="bottom-2 right-2 fixed max-w-md z-50"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<MyModal
				title="Xác nhận huỷ đơn"
				warn={true}
				openModal={confirmCancelBookingModal}
				setOpenModal={setConfirmCancelBookingModal}
				onSubmit={() => handleAfterConfirmed(cancelStatus)}
			>
				<div>
					<ul className="h-72 pb-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2">
						{cancelReasons.map((reason, index) => (
							<li
								className="my-1 full px-3 flex items-center gap-2 cursor-pointer"
								onClick={() => handleCancelReason(reason)}
								key={index}
							>
								<input
									type="radio"
									value={index}
									onChange={() => handleCancelReason(reason)}
									checked={cancelReason === reason.reason}
								/>
								<div>{reason.reason}</div>
							</li>
						))}
					</ul>
				</div>
			</MyModal>
			<div key={bookingStatus} className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
				<Card>
					<CardBody>
						<div>
							{
								// Booking ID & back icon
							}
							<div className="flex justify-between border-b border-gray-300 pb-3">
								<Link href="/booking">
									<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
										<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
									</div>
								</Link>
								<div>
									<span>Mã đơn hàng: {data.id.split('-').reverse().at(0)} | </span>
									<span className="text-red-500">
										{stringBookingStatuses[bookingStatus]}
									</span>
								</div>
							</div>
							{
								// Customer info & booking status
							}
							<div className="pt-3 border-b border-gray-300 pb-3">
								<div className="font-semibold text-xl pb-2">Thông tin đơn hàng</div>
								<div className="flex justify-start flex-wrap">
									<div className="w-full pr-1 md:w-1/4 lg:w-1/3 sm:border-r sm:border-gray-300">
										<div className="text-base">{data.customer.firstName}</div>
										<div>{data.customer.phoneNumber}</div>
										<div>{data.customer.email}</div>
									</div>
									<div className="flex flex-col justify-center flex-grow pt-3 md:pt-0">
										{timeline.length > 0 ? (
											<WidgetOrderStatus timeline={timeline} />
										) : (
											<div className="text-center my-auto text-base text-red-500">
												<div>ĐƠN HÀNG ĐÃ BỊ HUỶ</div>
											</div>
										)}
									</div>
								</div>
							</div>
							{
								// Customer services
							}
							<div className="pt-3 border-b border-gray-300 pb-3">
								<div className="font-semibold text-xl pb-2">Mô tả yêu cầu</div>
								<div className="block">
									{data.services.map((service, serviceIndex) => (
										<div key={service.id}>
											<div
												key={service.id}
												className="pb-1 flex flex-wrap text-base"
											>
												<div>{serviceIndex + 1}</div>
												<div className="pr-1">. {stringSize.at(service.size)},</div>

												{service.placement ? (
													<div className="pr-1">
														Vị trí xăm: {stringPlacements.at(service.placement)},
													</div>
												) : (
													<></>
												)}

												<div className="pr-1">{stringColor(service.hasColor)},</div>

												<div className="pr-1">
													{stringDifficult(service.isDifficult)},
												</div>

												<div>
													{formatPrice(service.minPrice)} -{' '}
													{formatPrice(service.maxPrice)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{
								// Confirm ngày hẹn
							}
							<div className="pt-3">
								<div className="font-semibold text-xl pb-2">Xác nhận ngày hẹn</div>
								<div className="flex justify-between items-center">
									<div className="min-w-max">
										<input
											type="date"
											readOnly={
												data.status === BOOKING_STATUS.COMPLETED ||
												data.status === BOOKING_STATUS.CUSTOMER_CANCEL ||
												data.status === BOOKING_STATUS.STUDIO_CANCEL
											}
											onChange={handleChangeMeetingDate}
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											name="meetingDate"
											value={meetingDate}
										/>
									</div>
									<div
										className={`${
											data.status === BOOKING_STATUS.COMPLETED ||
											data.status === BOOKING_STATUS.CUSTOMER_CANCEL ||
											data.status === BOOKING_STATUS.STUDIO_CANCEL
												? 'hidden'
												: 'w-20'
										}`}
									>
										<Button onClick={confirmBooking}>
											{data.date ? 'Thay đổi' : 'Xác nhận'}
										</Button>
									</div>
								</div>
							</div>

							{
								// Khách hàng tới hẹn và bắt đầu chuyển đơn hàng sang trạng thái thực hiện - IN_PROGRESS
							}
							{data.status === BOOKING_STATUS.CONFIRMED && (
								<div className="mt-5 pt-3 border-t border-gray-300 pb-3">
									<div className="font-semibold text-xl pb-2">
										Khách hàng xác nhận đặt đơn
									</div>
									<div className="flex flex-wrap gap-5 justify-center items-center w-full">
										<div className="w-20">
											<Button
												outline
												onClick={() => setConfirmCancelBookingModal(true)}
											>
												Từ chối
											</Button>
										</div>
										<div className="w-20">
											<Button
												onClick={() =>
													handleAfterConfirmed(BOOKING_STATUS.IN_PROGRESS)
												}
											>
												Xác nhận
											</Button>
										</div>
									</div>
								</div>
							)}

							{
								// Booking detail list
							}
							{
								// Đơn hàng đã huỷ nhưng đã có tattoo art
								(((data.status === BOOKING_STATUS.CUSTOMER_CANCEL ||
									data.status === BOOKING_STATUS.STUDIO_CANCEL) &&
									data.tattooArts.length > 0) ||
									// Đơn hàng còn chưa bắt đầu
									data.status === BOOKING_STATUS.IN_PROGRESS ||
									data.status === BOOKING_STATUS.COMPLETED) && (
									<div className="mt-6 pt-3 border-t border-gray-300 pb-3">
										<div className="flex justify-between items-center font-semibold text-xl pb-2">
											<div>Chi tiết đơn hàng</div>
											{
												// Button thêm hình xăm cho đơn hàng
												data.status === BOOKING_STATUS.IN_PROGRESS ? (
													<Link href={`/tattoo/new?booking=${data.id}`}>
														<span className="text-white cursor-pointer bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-blue-800">
															Thêm hình xăm
														</span>
													</Link>
												) : (
													<></>
												)
											}
										</div>

										{
											// List hình xăm
										}
										{data.tattooArts?.map((tattoo, tattooIndex) => (
											<div key={tattoo.id}>
												<Link href={`/tattoo/${tattoo.id}?booking=${data.id}`}>
													<div className="cursor-pointer py-2 flex justify-start gap-3 flex-wrap">
														<div className="relative w-32 h-32">
															<Image
																layout="fill"
																src={tattoo.thumbnail}
																alt={'a'}
																className="object-contain rounded-2xl"
															/>
														</div>
														<div className="flex-grow">
															<div>
																<span>Nghệ sĩ xăm: </span>
																<span className="font-semibold">
																	{tattoo.artist.firstName} {tattoo.artist.lastName}
																</span>
															</div>
															{tattoo.bookingDetails.map(
																(bookingDetail, bookingDetailIndex) => (
																	<div
																		key={bookingDetail.id}
																		className="flex justify-between items-center"
																	>
																		<div className="text-base">
																			{bookingDetail.operationName}
																		</div>
																		<div className="text-lg">
																			{formatPrice(bookingDetail.price)}
																		</div>
																	</div>
																)
															)}
														</div>
													</div>
												</Link>
											</div>
										))}
									</div>
								)
							}
							{
								// Final sum
							}
							<div className="pt-3">
								<table className="w-full">
									<tbody>
										{data.total && (
											<tr className="border-t border-b border-gray-300">
												<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
													Tổng tiền
												</th>
												<td className="py-3 text-right text-xl text-red-500">
													{formatPrice(data.total)}
												</td>
											</tr>
										)}
										{
											// Button thêm hình xăm cho đơn hàng
											data.status === BOOKING_STATUS.COMPLETED ? (
												<tr className="border-t border-gray-300">
													<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
														Phương thức thanh toán
													</th>
													<td className="py-3 text-right text-base">Tiền mặt</td>
												</tr>
											) : (
												<></>
											)
										}
									</tbody>
								</table>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
BookingDetailsPage.propTypes = {
	data: PropTypes.object,
	studioId: PropTypes.string
};
export default BookingDetailsPage;
