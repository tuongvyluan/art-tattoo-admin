import { ChevronLeft } from 'icons/solid';
import {
	calculateBookingTransactions,
	calculateConfirmedTotal,
	calculateMinBookingTotal,
	calculateTotal,
	fetcher,
	fetcherPut,
	formatPrice
} from 'lib';
import {
	BOOKING_DETAIL_STATUS,
	BOOKING_STATUS,
	SERVICE_STATUS,
	stringBookingStatuses
} from 'lib/status';
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
import { sortServiceByCategory } from 'lib/studioServiceHelper';

function BookingDetailsPage({ data, studioId, setLoading }) {
	const { data: account } = useSession();
	const [renderData, setRenderData] = useState(data);
	const [total, setTotal] = useState(calculateTotal(renderData.bookingDetails));
	const [minTotal, setMinTotal] = useState(
		calculateMinBookingTotal(renderData.bookingDetails)
	);
	const [confirmedTotal, setConfirmedTotal] = useState(
		calculateConfirmedTotal(renderData.bookingDetails)
	);
	const [paidTotal, setPaidTotal] = useState(
		calculateBookingTransactions(renderData.transactions)
	);

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
		const artistList = serviceData?.artists;
		if (artistList) {
			setArtists(
				[
					{
						id: null,
						account: {
							fullName: 'Nghệ sĩ bất kỳ'
						}
					}
				].concat(artistList)
			);
		}
	}, [serviceData]);

	const handleCancelReason = ({ status, reason }) => {
		setCancelReason(reason);
		setCancelStatus(status);
	};

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

	const completeBooking = () => {
		const promises = [];
		const bookingDetails = renderData.bookingDetails;
		bookingDetails.forEach((detail) => {
			if (
				detail.status !== BOOKING_DETAIL_STATUS.CANCELLED &&
				detail.status !== BOOKING_DETAIL_STATUS.COMPLETED &&
				detail.status !== BOOKING_DETAIL_STATUS.NOT_COMPLETED
			) {
				promises.push(
					fetcherPut(`${BASE_URL}/booking-details/${detail.id}`, {
						status: BOOKING_DETAIL_STATUS.COMPLETED
					})
				);
			}
		});

		const hasNotCompleted =
			bookingDetails.filter(
				(bd) => bd.status === BOOKING_DETAIL_STATUS.NOT_COMPLETED
			).length > 0;

		Promise.all(promises).then(() => {
			fetcherPut(`${BASE_URL}/bookings/${renderData.id}`, {
				status: hasNotCompleted
					? BOOKING_STATUS.NOT_COMPLETED
					: BOOKING_STATUS.COMPLETED,
				updaterId: account.user.id
			})
				.then((data) => {
					setBookingStatus(BOOKING_STATUS.COMPLETED);
					handleAlert(true, 'Cập nhật trạng thái đơn hàng thành công');
					setLoading(true);
				})
				.catch((e) => {
					handleAlert(true, 'Cập nhật trạng thái đơn hàng thành công');
				});
		});
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
				serviceList={serviceData?.services
					?.filter((s) => s.status !== SERVICE_STATUS.DELETED)
					?.sort(sortServiceByCategory)}
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
											{renderData.customer.phoneNumber?.length > 0 && (
												<div>
													Số điện thoại:{' '}
													<span className="font-semibold text-base">
														{renderData.customer.phoneNumber}
													</span>
												</div>
											)}
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
									paidTotal={paidTotal}
									completedTotal={minTotal}
									artistList={artists}
									setLoading={setLoading}
									showMore={true}
									canEdit={renderData.status === BOOKING_STATUS.IN_PROGRESS}
									showDetails={renderData.status !== BOOKING_STATUS.PENDING}
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
								renderData.status === BOOKING_STATUS.COMPLETED ||
								renderData.status === BOOKING_STATUS.NOT_COMPLETED) &&
								renderData.bookingDetails?.length > 0 && (
									<div>
										<table className="w-full mb-3">
											<tbody>
												<tr className="border-t border-gray-300">
													<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
														Tổng tiền đã xác nhận
													</th>
													<td className="py-3 text-right text-xl text-red-500">
														{formatPrice(confirmedTotal)}
													</td>
												</tr>
												<tr className="border-t border-gray-300">
													<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
														Tổng tiền
													</th>
													<td className="py-3 text-right text-xl text-red-500">
														{formatPrice(total)}
													</td>
												</tr>
												<tr className="border-t border-gray-300">
													<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
														Đã thanh toán
													</th>
													<td className="py-3 text-right text-xl text-green-500">
														{formatPrice(paidTotal)}
													</td>
												</tr>
												{total !== paidTotal && (
													<tr className="border-t border-gray-300">
														<th className="py-3 text-gray-500 w-fit sm:w-1/2 md:w-2/3 border-r pr-3 border-gray-300 text-right text-sm font-normal">
															{confirmedTotal > paidTotal
																? 'Khách còn thiếu'
																: 'Khách trả thừa'}
														</th>
														<td
															className={`py-3 text-right text-xl ${
																confirmedTotal > paidTotal
																	? 'text-red-500'
																	: 'text-green-500'
															}`}
														>
															<div>
																{confirmedTotal > paidTotal
																	? formatPrice(confirmedTotal - paidTotal)
																	: formatPrice(paidTotal - confirmedTotal)}
															</div>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										{
											// Chuyển qua màn hình payment
										}
										{total > paidTotal ? (
											<div className="flex justify-center">
												<Link href={`/payment/${renderData.id}`}>
													<div className="w-32">
														<Button>Ghi nhận giao dịch</Button>
													</div>
												</Link>
											</div>
										) : (
											<div className="flex justify-center flex-wrap gap-3">
												{renderData.status === BOOKING_STATUS.IN_PROGRESS && (
													<Link href={`/payment/${renderData.id}`}>
														<div className="flex">
															<Button outline={total === paidTotal}>
																{total === paidTotal
																	? 'Chi tiết giao dịch'
																	: 'Ghi nhận giao dịch'}
															</Button>
														</div>
													</Link>
												)}
												{renderData.status === BOOKING_STATUS.IN_PROGRESS &&
													renderData.bookingDetails?.filter(
														(bd) => bd.status === BOOKING_DETAIL_STATUS.PENDING
													)?.length === 0 && (
														<div className="flex">
															<Button onClick={completeBooking}>Hoàn thành</Button>
														</div>
													)}
												{renderData?.bookingDetails?.at(0)?.feedback !== null && (
													<div className="w-max">
														<a
															target="_blank"
															href={`/feedback/${renderData.id}`}
															className="text-gray-800 bg-white ring-1 ring-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
														>
															Xem đánh giá
														</a>
													</div>
												)}
											</div>
										)}
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
