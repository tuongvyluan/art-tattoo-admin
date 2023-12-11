import { ChevronLeft } from 'icons/solid';
import {
	calculateTotal,
	fetcher,
	fetcherDelete,
	fetcherPost,
	fetcherPut,
	formatDateForInput,
	formatPrice,
	hasBookingMeeting,
	isFuture
} from 'lib';
import { BOOKING_DETAIL_STATUS, BOOKING_STATUS, stringBookingStatuses } from 'lib/status';
import PropTypes from 'prop-types';
import { Alert, Card, CardBody, Link } from 'ui';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { BASE_URL } from 'lib/env';
import MyModal from 'components/MyModal';
import cancelReasons from 'lib/cancelReasons';
import CustomerServices from './CustomerServices';
import useSWR from 'swr';
import Heading from 'components/Heading';
import { useSession } from 'next-auth/react';
import AddBookingDetailModal from './AddBookingDetailModal';

function BookingDetailsPage({ data, studioId, setLoading }) {
	const { data: account } = useSession();
	const [renderData, setRenderData] = useState(data);

	const [bookingStatus, setBookingStatus] = useState(renderData.status);

	// Cancel related vars
	const [cancelStatus, setCancelStatus] = useState(BOOKING_STATUS.CUSTOMER_CANCEL);
	const [confirmCancelBookingModal, setConfirmCancelBookingModal] = useState(false);
	const [cancelReason, setCancelReason] = useState(cancelReasons.at(0).reason);
	const [cancelReasonMore, setCancelReasonMore] = useState('');

	const { data: serviceData } = useSWR(
		`${BASE_URL}/studios/${studioId}/services-for-create-booking`,
		fetcher
	);
	const [artists, setArtists] = useState([
		{
			id: null,
			account: {
				fullName: 'Nghệ sĩ bất kỳ'
			}
		}
	]);

	useEffect(() => {
		setArtists([
			{
				id: null,
				account: {
					fullName: 'Nghệ sĩ bất kỳ'
				}
			}
		].concat(serviceData?.artists))
	}, [serviceData])

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

	// Show create booking detail modal
	const [openAddDetailModal, setOpenAddDetailModal] = useState(false);

	// Service related vars
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

	const handleAfterConfirmed = (status) => {
		handleAlert(true, 'Đang cập nhật trạng thái');
		const body = {
			status: status,
			updaterId: account.user.id
		};
		if (status === BOOKING_STATUS.CUSTOMER_CANCEL) {
			body.customerCancelReason = cancelReason.concat(` ${cancelReasonMore}`);
		}
		if (status === BOOKING_STATUS.STUDIO_CANCEL) {
			body.studioCancelReason = cancelReason.concat(` ${cancelReasonMore}`);
		}
		fetcherPut(`${BASE_URL}/bookings/${renderData.id}`, body)
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
				color={alertContent.isWarn}
				className="bottom-2 right-2 fixed max-w-md z-50"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<AddBookingDetailModal
				bookingId={renderData.id}
				serviceList={serviceData?.services?.filter((s) => s.status !== 2)}
				artistList={artists}
				openModal={openAddDetailModal}
				setLoading={setLoading}
				setOpenModal={setOpenAddDetailModal}
			/>
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
									<div className="w-full md:pr-1 md:w-1/2 md:border-r mb-5 md:mb-0 md:border-b-0 border-b border-gray-300">
										<div>
										<Heading>Thông tin khách hàng</Heading>
											<div className="text-lg font-semibold">
												{renderData.customer.fullName}
											</div>
											<div>
												Số điện thoại:{' '}
												<span className="font-semibold">
													{renderData.customer.phoneNumber}
												</span>
											</div>
											<div>
												Email:{' '}
												<span className="font-semibold">
													{renderData.customer.email}
												</span>
											</div>
										</div>
									</div>
									<div className="flex flex-col justify-start flex-grow pt-3 md:pt-0">
										{(renderData.status === BOOKING_STATUS.CUSTOMER_CANCEL ||
											renderData.status === BOOKING_STATUS.STUDIO_CANCEL) && (
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
									<Heading>
										Các dịch vụ đã đặt ({renderData.bookingDetails?.length})
									</Heading>
									{renderData.status === BOOKING_STATUS.IN_PROGRESS && (
										<div className="flex">
											<Button onClick={() => setOpenAddDetailModal(true)}>
												Thêm dịch vụ
											</Button>
										</div>
									)}
								</div>
								<CustomerServices
									artistList={artists}
									setLoading={setLoading}
									showMore={true}
									canEdit={renderData.status === BOOKING_STATUS.IN_PROGRESS}
									bookingDetails={renderData.bookingDetails}
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
									<div>
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
													{formatPrice(calculateTotal(renderData.bookingDetails))}
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
