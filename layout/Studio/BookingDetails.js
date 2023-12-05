import { ChevronLeft } from 'icons/solid';
import {
	extractBookingStatusTimeline,
	fetcherDelete,
	fetcherPost,
	fetcherPut,
	formatDateForInput,
	formatPrice,
	isFuture
} from 'lib';
import { BOOKING_STATUS, stringBookingStatuses } from 'lib/status';
import PropTypes from 'prop-types';
import { Alert, Card, CardBody, Link } from 'ui';
import { WidgetOrderStatus } from 'ui/WidgetOrderStatus';
import { useState } from 'react';
import Button from 'components/Button';
import { BASE_URL } from 'lib/env';
import MyModal from 'components/MyModal';
import cancelReasons from 'lib/cancelReasons';
import { Modal } from 'flowbite-react';
import CustomerServices from './CustomerServices';
import useSWR from 'swr';
import Heading from 'components/Heading';

const hasBookingMeeting = (bookingMeetings) => {
	let result;
	if (
		bookingMeetings?.at(0)?.meetingDate &&
		isFuture(bookingMeetings?.at(0)?.meetingDate)
	) {
		result = new Date(bookingMeetings?.at(0)?.meetingDate);
	}
	return result;
};

const calculateTotal = (tattooArts) => {
	if (!tattooArts) {
		return 0;
	}
	let total = 0;
	return total;
};

function BookingDetailsPage({ data, studioId, setLoading }) {
	const [renderData, setRenderData] = useState(data);

	const timeline = extractBookingStatusTimeline(renderData);
	const [bookingStatus, setBookingStatus] = useState(renderData.status);

	// Cancel related vars
	const [cancelStatus, setCancelStatus] = useState(BOOKING_STATUS.CUSTOMER_CANCEL);
	const [confirmCancelBookingModal, setConfirmCancelBookingModal] = useState(false);
	const [cancelReason, setCancelReason] = useState(cancelReasons.at(0).reason);
	const [cancelReasonMore, setCancelReasonMore] = useState('');

	const { data: artistList, error } = useSWR(
		`${BASE_URL}/artists/${studioId}/artist-studio-list`
	);

	const handleCancelReason = ({ status, reason }) => {
		setCancelReason(reason);
		setCancelStatus(status);
	};

	// Booking meeting related vars
	const [showBookingMeetingModal, setShowBookingMeetingModal] = useState(false);

	const [currentMeetingDate, setCurrentMeetingDate] = useState(
		hasBookingMeeting(renderData.bookingMeetings)
			? formatDateForInput(hasBookingMeeting(renderData.bookingMeetings))
			: formatDateForInput(Date.now())
	);

	// Service related vars
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

	const createBookingMeeting = (date) => {
		fetcherPost(`${BASE_URL}/booking-meetings`, {
			bookingId: renderData.id,
			meetingDate: date
		}).then((data) => {
			setLoading(true);
		});
	};

	const updateBookingMeeting = (id, date) => {
		fetcherPut(`${BASE_URL}/booking-meetings`, {
			id: id,
			meetingDate: date
		});
	};

	const deleteBookingMeeting = (id) => {
		fetcherDelete(`${BASE_URL}/booking-meetings/${id}`).then(() => {
			setLoading(true);
		});
	};

	const confirmBooking = (meetingDate) => {
		handleAlert(true, 'Đang xác nhận');
		createBookingMeeting(meetingDate);
		fetcherPut(`${BASE_URL}/studios/${studioId}/bookings/${renderData.id}`, {
			status: BOOKING_STATUS.CONFIRMED
		})
			.then((data) => {
				setBookingStatus(BOOKING_STATUS.CONFIRMED);
				handleAlert(true, 'Xác nhận đơn hàng thành công');
				setLoading(true);
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
			body.customerCancelReason = cancelReason.concat(` ${cancelReasonMore}`);
		}
		if (status === BOOKING_STATUS.STUDIO_CANCEL) {
			body.studioCancelReason = cancelReason.concat(` ${cancelReasonMore}`);
		}
		fetcherPut(`${BASE_URL}/studios/${studioId}/bookings/${renderData.id}`, body)
			.then((data) => {
				setBookingStatus(status);
				handleAlert(true, 'Cập nhật trạng thái đơn hàng thành công');
				setLoading(true);
			})
			.catch((e) => {
				handleAlert(true, 'Cập nhật trạng thái đơn hàng thành công');
			});
		setConfirmCancelBookingModal(false);
	};

	const handleChangeMeetingDate = (newDate) => {
		if (!isFuture(newDate)) {
			handleAlert(
				true,
				'Ngày hẹn không hợp lệ',
				'Ngày hẹn phải trong tương lai',
				true
			);
		} else {
			if (hasBookingMeeting(renderData.bookingMeetings)) {
				updateBookingMeeting(renderData.bookingMeetings.at(0).id, newDate);
			} else {
				createBookingMeeting(newDate);
			}
		}
	};

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
				size="md"
				title={
					hasBookingMeeting(renderData.bookingMeetings)
						? 'Cập nhật lịch hẹn'
						: 'Tạo lịch hẹn'
				}
				openModal={showBookingMeetingModal}
				setOpenModal={setShowBookingMeetingModal}
				onSubmit={() => {
					if (bookingStatus === BOOKING_STATUS.PENDING) {
						confirmBooking(currentMeetingDate);
					} else {
						handleChangeMeetingDate(currentMeetingDate);
					}
				}}
				cancelTitle="Huỷ thay đổi"
				confirmTitle="Xác nhận"
				noFooter={hasBookingMeeting(renderData.bookingMeetings)}
			>
				<div className="">
					<div className="pb-2 text-center">Lịch hẹn mới sẽ vào ngày:</div>
					<div className="w-max mx-auto">
						<input
							type="date"
							className="appearance-none relative block w-full text-base mb-2 px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
							value={currentMeetingDate}
							onChange={(e) => setCurrentMeetingDate(e.target.value)}
						/>
					</div>
					{hasBookingMeeting(renderData.bookingMeetings) && (
						<Modal.Footer>
							<div className="flex justify-center gap-2 w-full">
								<div className="w-24">
									<Button onClick={() => setShowBookingMeetingModal(false)} outline>
										Huỷ thay đổi
									</Button>
								</div>
								<div className="w-24">
									<Button
										onClick={() =>
											deleteBookingMeeting(renderData.bookingMeetings.at(0).id)
										}
										warn
									>
										Xoá lịch hẹn
									</Button>
								</div>
								<div className="w-24">
									<Button
										onClick={() => handleChangeMeetingDate(currentMeetingDate)}
									>
										Xác nhận
									</Button>
								</div>
							</div>
						</Modal.Footer>
					)}
				</div>
			</MyModal>
			<MyModal
				title="Xác nhận huỷ đơn"
				warn={true}
				openModal={confirmCancelBookingModal}
				setOpenModal={setConfirmCancelBookingModal}
				onSubmit={() => handleAfterConfirmed(cancelStatus)}
			>
				<div>
					<ul className="h-36 pb-6 overflow-y-auto">
						{cancelReasons.map((reason, index) => (
							<li
								className="my-1 full px-3 py-1 gap-2 flex items-center cursor-pointer"
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
					<label className="text-sm font-semibold">Mô tả lý do</label>
					<textarea
						rows={4}
						type="text"
						value={cancelReasonMore}
						onChange={(e) => setCancelReasonMore(e.target.value)}
						className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
					/>
				</div>
			</MyModal>
			<div key={bookingStatus} className="sm:px-12 md:px-3 lg:px-10 xl:px-28">
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
									<span>Mã đơn hàng: {renderData.id.split('-').at(0)} | </span>
									<span className="text-red-500">
										{stringBookingStatuses[bookingStatus]}
									</span>
								</div>
							</div>
							{
								// Customer info & booking status
							}
							<div className="pt-5 border-b border-gray-300 pb-3">
								<div className="flex justify-start flex-wrap">
									<div className="w-full md:pr-1 md:w-1/3 md:border-r mb-5 md:mb-0 md:border-b-0 border-b border-gray-300">
										<div>
											<Heading>Thông tin khách hàng</Heading>
											<div className="text-base">
												{renderData.customer.firstName}{' '}
												{renderData.customer.lastName}
											</div>
											<div>{renderData.customer.phoneNumber}</div>
											<div>{renderData.customer.email}</div>
										</div>
									</div>
									<div className="flex flex-col justify-start flex-grow pt-3 md:pt-0">
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
								// Customer description
							}
							{renderData.description && (
								<div className="pt-3 pb-3 border-b border-gray-300">
									<Heading>Mô tả của khách hàng</Heading>
									<div className="block">{renderData.description}</div>
								</div>
							)}

							{
								// Customer services
							}
							<div className="pt-3">
								<div className="flex justify-between w-full pb-1">
									<Heading>Các dịch vụ đã đặt ({renderData.services?.length})</Heading>
								</div>
								<CustomerServices
									artistList={artistList}
									showMore={true}
									canEdit={true}
									services={renderData.services}
								/>
							</div>

							<div
								className={`${
									renderData.status === BOOKING_STATUS.COMPLETED ||
									renderData.status === BOOKING_STATUS.CUSTOMER_CANCEL ||
									renderData.status === BOOKING_STATUS.STUDIO_CANCEL
										? 'hidden'
										: 'mx-auto pt-3 flex flex-wrap justify-center gap-3'
								}`}
							>
								{(renderData.status === BOOKING_STATUS.PENDING ||
									renderData.status === BOOKING_STATUS.CONFIRMED) && (
									<div className="w-20 ">
										<Button
											warn={true}
											outline
											onClick={() => {
												setCancelReasonMore('');
												setConfirmCancelBookingModal(true);
											}}
										>
											Huỷ
										</Button>
									</div>
								)}

								{renderData.status === BOOKING_STATUS.PENDING && (
									<div className="w-20">
										<Button onClick={() => setShowBookingMeetingModal(true)}>
											Đồng ý
										</Button>
									</div>
								)}

								{renderData.status === BOOKING_STATUS.CONFIRMED && (
									<div className="w-max">
										<Button
											onClick={() =>
												handleAfterConfirmed(BOOKING_STATUS.IN_PROGRESS)
											}
										>
											Bắt đầu thực hiện
										</Button>
									</div>
								)}
							</div>
							{
								// Final sum
							}
							{(renderData.status === BOOKING_STATUS.IN_PROGRESS ||
								renderData.status === BOOKING_STATUS.COMPLETED) && (
								<div>
									<table className="w-full mb-3">
										<tbody>
											<tr className="border-t border-gray-300">
												<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
													Tổng tiền
												</th>
												<td className="py-3 text-right text-xl text-red-500">
													{/* {formatPrice(renderData.total)} */}
													{formatPrice(calculateTotal(renderData.tattooArts))}
												</td>
											</tr>
											{/* <tr className="border-t border-gray-300">
												<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
													Thanh toán
												</th>
												<td className="py-3 text-right text-sm">
													<div>
														<span className="text-gray-600">
															{formatTime(new Date())} - Tiền mặt -{' '}
														</span>
														<span className="text-base">{formatPrice(1000000)}</span>
													</div>
													<div>
														<span className="text-gray-600">
															{formatTime(new Date())} - Ví điện tử -{' '}
														</span>
														<span className="text-base">{formatPrice(500000)}</span>
													</div>
												</td>
											</tr>
											<tr className="border-t border-gray-300">
												<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
													Còn lại
												</th>
												<td className="py-3 text-right text-xl text-red-500">
													<div>{formatPrice(500000)}</div>
												</td>
											</tr> */}
										</tbody>
									</table>
									{
										// Chuyển qua màn hình payment
									}
									<div className="flex justify-center">
										<Link href={`/payment/${renderData.id}`}>
											<div className="w-32">
												<Button>Thanh toán</Button>
											</div>
										</Link>
									</div>
								</div>
							)}
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
BookingDetailsPage.propTypes = {
	data: PropTypes.object,
	studioId: PropTypes.string,
	setLoading: PropTypes.func
};
export default BookingDetailsPage;
