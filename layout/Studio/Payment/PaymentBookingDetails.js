import { extractServiceFromBookingDetail, formatPrice } from 'lib';
import {
	BOOKING_DETAIL_STATUS,
	BOOKING_STATUS,
	stringBookingDetailStatus,
	stringBookingDetailStatusColor
} from 'lib/status';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';

const PaymentBookingDetails = ({
	bookingDetailList,
	setBookingDetailList,
	booking,
	total,
	confirmedTotal,
	canSelect = false
}) => {
	console.log(confirmedTotal, total)
	const [bookingDetails, setBookingDetails] = useState(bookingDetailList);
	const [confirmedAmount, setConfirmedAmount] = useState(confirmedTotal)
	const [amount, setAmount] = useState(total)

	const handleSelectDetail = (detailIndex) => {
		const details = [...bookingDetails];
		const detail = details.at(detailIndex);
		detail.selected = !detail.selected;
		details[detailIndex] = detail;
		setBookingDetailList(details);
	};

	useEffect(() => {
		setBookingDetails(bookingDetailList);
	}, [bookingDetailList]);

	useEffect(() => {
		setConfirmedAmount(confirmedTotal)
	}, [confirmedTotal])

	useEffect(() => {
		setAmount(total)
	}, [total])

	return (
		<div className="relative shadow-md sm:rounded-lg overflow-x-auto">
			<table className="w-full min-w-3xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
					<tr>
						{booking.status === BOOKING_STATUS.IN_PROGRESS && canSelect && (
							<th scope="col" className="w-8 px-4 py-3 bg-gray-50 dark:bg-gray-800">
								Chọn
							</th>
						)}
						<th scope="col" className="w-1/2 px-4 py-3 bg-gray-50 dark:bg-gray-800">
							Dịch vụ
						</th>
						<th scope="col" className="px-4 py-3 w-40 bg-gray-50 dark:bg-gray-800">
							Trạng thái
						</th>
						<th scope="col" className="w-1/4 px-4 py-3 bg-gray-50 dark:bg-gray-800">
							Giá
						</th>
					</tr>
				</thead>
				<tbody>
					{bookingDetails?.length > 0 ? (
						bookingDetails.map((detail, detailIndex) => (
							<tr key={detail.id} className="text-base hover:bg-gray-50">
								{booking.status === BOOKING_STATUS.IN_PROGRESS && canSelect && (
									<td
										scope="col"
										className="flex w-full justify-center pt-4 text-gray-900 px-4 py-3"
									>
										{detail.status === BOOKING_DETAIL_STATUS.IN_PROGRESS && (
											<input
												type="checkbox"
												checked={detail.selected}
												onChange={() => handleSelectDetail(detailIndex)}
											/>
										)}
									</td>
								)}
								<td
									scope="col"
									className="text-left text-gray-900 w-16 lg:w-24 px-4 py-3"
								>
									<div>{extractServiceFromBookingDetail(detail)}</div>
								</td>
								<td scope="col" className="text-left text-gray-900 px-4 py-3">
									<div className="flex w-full">
										<div
											className={`text-base min-w-max text-black font-semibold bg-${stringBookingDetailStatusColor.at(
												detail.status
											)} px-2 rounded-full`}
										>
											<div>{stringBookingDetailStatus.at(detail.status)}</div>
										</div>
									</div>
								</td>
								<td className="text-left text-gray-900 w-24 lg:w-40 px-4 py-3 text-base">
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
							colSpan={booking.status === BOOKING_STATUS.IN_PROGRESS && canSelect ? 3 : 2}
							className="text-right bg-blue-50 text-gray-900 w-24 lg:w-40 px-4 py-3 dark:bg-gray-800 text-base"
						>
							Tổng tiền đã xác nhận
						</td>
						<td className="font-semibold text-left text-gray-900 w-24 lg:w-40 px-4 py-3 bg-yellow-50 dark:bg-gray-800 text-base">
							{formatPrice(confirmedAmount)}
						</td>
					</tr>
					<tr>
						<td
							colSpan={booking.status === BOOKING_STATUS.IN_PROGRESS && canSelect ? 3 : 2}
							className="text-right bg-blue-50 text-gray-900 w-24 lg:w-40 px-4 py-3 dark:bg-gray-800 text-base"
						>
							Tổng tiền
						</td>
						<td className="font-semibold text-left text-gray-900 w-24 lg:w-40 px-4 py-3 bg-yellow-50 dark:bg-gray-800 text-base">
							{formatPrice(amount)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

PaymentBookingDetails.propTypes = {
	bookingDetailList: PropTypes.array,
	booking: PropTypes.object.isRequired,
	canSelect: PropTypes.bool,
	setBookingDetailList: PropTypes.func,
	total: PropTypes.number,
	confirmedTotal: PropTypes.number
};

export default PaymentBookingDetails;
