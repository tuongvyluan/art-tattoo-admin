import { ChevronLeft } from 'icons/solid';
import { BsCashCoin, BsCreditCard, BsWallet2 } from 'react-icons/bs';
import {
	calculateBookingTransactions,
	calculateMinBookingTotal,
	calculateTotal,
	extractServiceFromBookingDetail,
	fetcherPost,
	fetcherPut,
	formatPrice,
	formatTime
} from 'lib';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Alert, Card, CardBody } from 'ui';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import Heading from 'components/Heading';
import {
	BOOKING_DETAIL_STATUS,
	BOOKING_STATUS,
	TRANSACTION_METHOD,
	TRANSACTION_STATUS,
	stringBookingDetailStatus,
	stringBookingDetailStatusColor,
	stringTransactionMethod
} from 'lib/status';
import MoneyInput from 'components/MoneyInput';
import { BASE_URL } from 'lib/env';

const PaymentBooking = ({ booking }) => {
	const [method, setMethod] = useState(0);
	const [bookingDetails, setBookingDetails] = useState(
		booking.bookingDetails.map((detail) => {
			return {
				...detail,
				selected: false
			};
		})
	);
	const [transactions, setTransactions] = useState(booking.transactions);
	const [total, setTotal] = useState(calculateTotal(bookingDetails));
	const [minTotal, setMinTotal] = useState(calculateMinBookingTotal(bookingDetails));
	const [paidTotal, setPaidTotal] = useState(
		calculateBookingTransactions(transactions)
	);
	const [isRefund, setIsRefund] = useState(false);
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState('');

	// Watching booking details or transactions change
	useEffect(() => {
		setMinTotal(calculateMinBookingTotal(bookingDetails));
		setTotal(calculateTotal(bookingDetails));
		setPaidTotal(calculateBookingTransactions(transactions));
		setDescription('');
		setIsRefund(false);
		setAmount(0);
	}, [transactions]);

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

	const handleSelectDetail = (detailIndex) => {
		const details = [...bookingDetails];
		const detail = details.at(detailIndex);
		detail.selected = !detail.selected;
		details[detailIndex] = detail;
		setBookingDetails(details);
	};

	useEffect(() => {
		let paid = 0;
		let note = '';
		bookingDetails.forEach((detail) => {
			if (detail.selected) {
				paid += detail.price;
				note = note.concat(
					`Thanh toán ${extractServiceFromBookingDetail(detail)}. `
				);
			}
		});
		setAmount(paid);
		setDescription(note);
	}, [bookingDetails]);

	const handleCreateSuccess = (newTransactionId) => {
		handleAlert(true, 'Thanh toán thành công.', '', 1);
		const details = [...bookingDetails].map((detail) => {
			if (detail.selected) {
				return {
					...detail,
					selected: false,
					status: BOOKING_DETAIL_STATUS.COMPLETED
				};
			}
			return detail;
		});
		setBookingDetails(details);
		const newTransactions = [...transactions];
		newTransactions.push({
			id: newTransactionId,
			method: method,
			description: description,
			price: amount,
			isRefund: isRefund,
			createdAt: new Date(),
			status: TRANSACTION_STATUS.AVAILABLE
		});
		newTransactions.sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
		setTransactions(newTransactions);
	};

	const checkValidAmount = () => {
		if (isRefund) {
			const newAmount = paidTotal - amount;
			if (newAmount < minTotal) {
				handleAlert(
					true,
					'Thanh toán thất bại.',
					`Tổng tiền sau khi thanh toán không được thấp hơn chi phí cho các dịch vụ đã hoàn thành ${formatPrice(
						minTotal
					)}.`,
					2
				);
				return false;
			}
		} else {
			const newAmount = paidTotal + amount;
			if (newAmount > total) {
				handleAlert(
					true,
					'Thanh toán thất bại.',
					`Tổng tiền sau khi thanh toán không được vượt quá giá trị đơn hàng ${formatPrice(
						total
					)}.`,
					2
				);
				return false;
			}
		}
		return true;
	};

	const handleSubmit = () => {
		if (!checkValidAmount) {
			return;
		}
		handleAlert(true, 'Đang thực hiện thanh toán.');
		fetcherPost(`${BASE_URL}/transactions`, {
			bookingId: booking.id,
			amount: amount,
			description: description,
			isRefund: isRefund,
			method: method
		}).then((response) => {
			const promises = [];
			bookingDetails.forEach((detail) => {
				if (detail.selected) {
					promises.push(
						fetcherPut(`${BASE_URL}/booking-details/${detail.id}`, {
							status: BOOKING_DETAIL_STATUS.COMPLETED
						})
					);
				}
			});
			Promise.all(promises).then(() => {
				handleCreateSuccess(response.id);
			});
		});
	};

	return (
		<div className="relative sm:px-12 md:px-3 lg:px-10 xl:px-20">
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn}
				className="bottom-2 right-2 fixed max-w-md z-50"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<Card>
				<CardBody>
					{
						// Booking ID & back icon
					}
					<div className="flex justify-between border-b border-gray-300 pb-3 mb-3">
						<Link href={`/booking/${booking.id}`}>
							<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
						<div>
							<span>Mã đơn hàng: {booking?.id?.split('-').at(0)}</span>
						</div>
					</div>
					{
						// Customer info & booking status
					}
					<div className="border-b border-gray-300 pb-3 mb-3">
						<div className="flex justify-start flex-wrap">
							<div className="w-full">
								<div>
									<Heading>Thông tin khách hàng</Heading>
									<div className="text-lg font-semibold">
										{booking.customer.fullName}
									</div>
									<div>
										Số điện thoại:{' '}
										<span className="font-semibold">
											{booking.customer.phoneNumber}
										</span>
									</div>
									<div>
										Email:{' '}
										<span className="font-semibold">{booking.customer.email}</span>
									</div>
								</div>
							</div>
							<div className="flex flex-col justify-start flex-grow pt-3 md:pt-0">
								{(booking.status === BOOKING_STATUS.CUSTOMER_CANCEL ||
									booking.status === BOOKING_STATUS.STUDIO_CANCEL) && (
									<div className="text-center my-auto text-base text-red-500">
										<div>ĐƠN HÀNG ĐÃ BỊ HUỶ</div>
									</div>
								)}
							</div>
						</div>
					</div>
					{
						// Transaction list
					}
					{transactions?.length > 0 && (
						<div className="border-b border-gray-300 pb-6 mb-3">
							<Heading>Lịch sử thanh toán</Heading>
							<div className="min-w-min overflow-auto">
								<table className="w-full min-w-min text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
									<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
										<tr>
											<th
												scope="col"
												className="w-28 px-4 py-3 bg-gray-50 dark:bg-gray-800"
											>
												Thời gian
											</th>
											<th
												scope="col"
												className="w-36 px-2 py-3 bg-gray-50 dark:bg-gray-800"
											>
												Phương thức thanh toán
											</th>
											<th
												scope="col"
												className="w-1/3 px-4 py-3 bg-gray-50 dark:bg-gray-800"
											>
												Ghi chú
											</th>
											<th
												scope="col"
												className="w-28 px-4 py-3 bg-gray-50 dark:bg-gray-800"
											>
												Số tiền
											</th>
										</tr>
									</thead>
									<tbody>
										{transactions.map((transaction, transactionIndex) => (
											<tr key={transaction.id} className="text-base">
												<td
													scope="col"
													className="text-left text-gray-900 px-4 py-3 bg-white dark:bg-gray-800"
												>
													{formatTime(transaction.createdAt)}
												</td>
												<td className="text-left text-gray-900 sm:w-28 px-4 py-3 bg-white dark:bg-gray-800 text-base">
													{stringTransactionMethod.at(transaction.method)}
												</td>
												<td className="text-left text-gray-900 w-1/3 px-4 py-3 bg-white dark:bg-gray-800 text-base">
													{transaction.description}
												</td>
												<td
													scope="col"
													className={`text-left ${
														transaction.isRefund ? 'text-red-500' : 'text-gray-900'
													} w-16 lg:w-24 px-4 py-3 bg-white dark:bg-gray-800`}
												>
													{transaction.isRefund && '-'}
													{formatPrice(transaction.price)}
												</td>
											</tr>
										))}
										<tr>
											<td
												colSpan={3}
												className="text-right bg-blue-50 text-gray-900 w-24 lg:w-40 px-4 py-3 dark:bg-gray-800 text-base"
											>
												Tổng cộng
											</td>
											<td className="font-semibold text-left text-gray-900 w-24 lg:w-40 px-4 py-3 bg-yellow-50 dark:bg-gray-800 text-base">
												{formatPrice(paidTotal)}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}
					{
						// Booking details
					}
					<div className="border-b border-gray-300 pb-6 mb-3">
						<Heading>Chi tiết đơn hàng</Heading>
						{
							// Tổng tiền
						}
						<div className="relative shadow-md sm:rounded-lg min-w-max overflow-x-auto">
							<table className="w-full min-w-max text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="w-8 px-4 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Chọn
										</th>
										<th
											scope="col"
											className="w-1/2 px-4 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Dịch vụ
										</th>
										<th
											scope="col"
											className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800"
										>
											Trạng thái
										</th>
										<th
											scope="col"
											className="px-4 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Giá
										</th>
									</tr>
								</thead>
								<tbody>
									{bookingDetails?.length > 0 ? (
										bookingDetails.map((detail, detailIndex) => (
											<tr key={detail.id} className="text-base">
												<td
													scope="col"
													className="flex w-full justify-center pt-4 text-gray-900 px-4 py-3 bg-white"
												>
													{detail.status === BOOKING_DETAIL_STATUS.IN_PROGRESS && (
														<input
															type="checkbox"
															checked={detail.selected}
															onChange={() => handleSelectDetail(detailIndex)}
														/>
													)}
												</td>
												<td
													scope="col"
													className="text-left text-gray-900 w-16 lg:w-24 px-4 py-3 bg-white dark:bg-gray-800"
												>
													{extractServiceFromBookingDetail(detail)}
												</td>
												<td
													scope="col"
													className="text-left text-gray-900 w-40 px-4 py-3 bg-white dark:bg-gray-800"
												>
													<div className="flex w-full">
														<div
															className={`text-base text-black font-semibold bg-${stringBookingDetailStatusColor.at(
																detail.status
															)} px-2 rounded-full`}
														>
															<div>
																{stringBookingDetailStatus.at(detail.status)}
															</div>
														</div>
													</div>
												</td>
												<td className="text-left text-gray-900 w-24 lg:w-40 px-4 py-3 bg-white dark:bg-gray-800 text-base">
													<div
														className={`${
															detail.status === BOOKING_DETAIL_STATUS.CANCELLED &&
															'line-through'
														}`}
													>
														{formatPrice(detail.price)}
													</div>
												</td>
											</tr>
										))
									) : (
										<div>Đơn hàng còn trống</div>
									)}

									<tr>
										<td
											colSpan={3}
											className="text-right bg-blue-50 text-gray-900 w-24 lg:w-40 px-4 py-3 dark:bg-gray-800 text-base"
										>
											Thành tiền
										</td>
										<td className="font-semibold text-left text-gray-900 w-24 lg:w-40 px-4 py-3 bg-yellow-50 dark:bg-gray-800 text-base">
											{formatPrice(total)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{total > 0 && booking.status === BOOKING_STATUS.IN_PROGRESS && (
						<div>
							{
								// Payment method
							}
							<div className="pt-5">
								{total > paidTotal && (
									<Heading>Còn lại: <span className='text-red-500'>{formatPrice(total - paidTotal)}</span></Heading>
								)}
								<Heading>Chọn phương thức thanh toán:</Heading>
								<div className="flex justify-center gap-5">
									<div
										className={`text-base flex gap-2 items-center shadow-md sm:rounded-lg w-max p-3 cursor-pointer hover:bg-blue-50 ${
											method === 0 && 'bg-blue-100'
										}`}
										onClick={() => setMethod(TRANSACTION_METHOD.CASH)}
									>
										<div>
											<BsCashCoin size={20} />
										</div>
										<div>Tiền mặt</div>
									</div>
									<div
										className={`text-base flex gap-2 items-center shadow-md sm:rounded-lg w-max p-3 cursor-pointer hover:bg-blue-50 ${
											method === 1 && 'bg-blue-100'
										}`}
										onClick={() => setMethod(TRANSACTION_METHOD.BANKING)}
									>
										<div>
											<BsCreditCard size={20} />
										</div>
										<div>Thanh toán qua ngân hàng</div>
									</div>
									<div
										className={`text-base flex gap-2 items-center shadow-md sm:rounded-lg w-max p-3 cursor-pointer hover:bg-blue-50 ${
											method === 2 && 'bg-blue-100'
										}`}
										onClick={() => setMethod(TRANSACTION_METHOD.EWALLET)}
									>
										<div>
											<BsWallet2 size={20} />
										</div>
										<div>Ví điện tử</div>
									</div>
								</div>
							</div>
							{
								// Fill in payment
							}
							<div className="flex flex-wrap gap-3 items-center pb-3 pt-5">
								<div className="flex flex-wrap gap-1 items-center">
									<input
										type="checkbox"
										checked={isRefund}
										onChange={() => setIsRefund((prev) => !prev)}
									/>
									<div>Hoàn tiền</div>
								</div>
								<div className="max-w-max">
									<MoneyInput
										value={amount}
										onAccept={(value) => setAmount(value)}
									/>
								</div>
							</div>
							<div>
								<label className="text-base font-semibold">Ghi chú</label>
								<textarea
									rows={4}
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
								/>
							</div>
							<div className="flex justify-center pt-5">
								<div className="w-32">
									<Button onClick={handleSubmit}>Thanh toán</Button>
								</div>
							</div>
						</div>
					)}
				</CardBody>
			</Card>
		</div>
	);
};

PaymentBooking.propTypes = {
	booking: PropTypes.object.isRequired
};

export default PaymentBooking;
