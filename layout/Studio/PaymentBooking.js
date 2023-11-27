import { ChevronLeft } from 'icons/solid';
import { BsCashCoin, BsCreditCard, BsWallet2 } from 'react-icons/bs';
import { formatPrice } from 'lib';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'ui';
import Button from 'components/Button';
import { useState } from 'react';

const PaymentBooking = ({ bookingId, bookingDetails, payments }) => {
	const [selectedMethod, setSelectedMethod] = useState(0);

	return (
		<div className="relative sm:px-12 md:px-3 lg:px-10 xl:px-44">
			<Card>
				<CardBody>
					{
						// Booking ID & back icon
					}
					<div className="flex justify-between border-b border-gray-300 pb-3 mb-3">
						<Link href={`/booking/${bookingId}`}>
							<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
						<div>
							<span>Mã đơn hàng: 0ffd71102da6</span>
						</div>
					</div>
					<div>
						<div className="font-semibold text-xl pb-2">Thông tin thanh toán:</div>
						{
							// Tổng tiền
						}
						<div className="relative shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="w-max px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											STT
										</th>
										<th
											scope="col"
											className="w-1/3 px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Dịch vụ
										</th>
										<th
											scope="col"
											className="w-1/4 px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Đơn giá
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Giá
										</th>
										<th className="w-max px-6 py-3 bg-gray-50 dark:bg-gray-800">
											<div className="flex justify-center w-full gap-2">
												<input type="checkbox" />
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="text-base">
										<td
											scope="col"
											rowSpan={2}
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-white dark:bg-gray-800"
										>
											1
										</td>
										<td
											scope="col"
											rowSpan={2}
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-white dark:bg-gray-800"
										>
											{'Size S (<8cm), Trắng đen, Đơn giản, ₫400,000 - ₫800,000'}
										</td>
										<td
											scope="col"
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-white dark:bg-gray-800"
										>
											Thiết kế
										</td>
										<td className="text-left text-gray-900 w-24 lg:w-40 px-6 py-3 bg-white dark:bg-gray-800 text-base">
											{formatPrice(100000)}
										</td>
										<td className="text-center text-gray-900 w-24 lg:w-40 px-6 py-3 bg-white dark:bg-gray-800 text-base">
											<input type="checkbox" />
										</td>
									</tr>
									<tr className="text-base">
										<td
											scope="col"
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-blue-50 dark:bg-gray-800"
										>
											Xăm nét
										</td>
										<td className="text-left text-gray-900 w-24 lg:w-40 px-6 py-3 bg-blue-50 dark:bg-gray-800 text-base">
											{formatPrice(400000)}
										</td>
										<td className="text-center text-gray-900 w-24 lg:w-40 px-6 py-3 bg-blue-50 dark:bg-gray-800 text-base">
											<input type="checkbox" />
										</td>
									</tr>
									<tr className="text-base">
										<td
											scope="col"
											rowSpan={2}
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											2
										</td>
										<td
											scope="col"
											rowSpan={2}
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											{'Size S (<8cm), Trắng đen, Phức tạp, ₫800,000 - ₫1,200,000'}
										</td>
										<td
											scope="col"
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-white dark:bg-gray-800"
										>
											Thiết kế
										</td>
										<td className="text-left text-gray-900 w-24 lg:w-40 px-6 py-3 bg-white dark:bg-gray-800 text-base">
											{formatPrice(300000)}
										</td>
										<td className="text-center text-gray-900 w-24 lg:w-40 px-6 py-3 bg-white dark:bg-gray-800 text-base">
											<input type="checkbox" />
										</td>
									</tr>
									<tr className="text-base">
										<td
											scope="col"
											className="text-left text-gray-900 w-16 lg:w-24 px-6 py-3 bg-blue-50 dark:bg-gray-800"
										>
											Xăm nét
										</td>
										<td className="text-left text-gray-900 w-24 lg:w-40 px-6 py-3 bg-blue-50 dark:bg-gray-800 text-base">
											{formatPrice(700000)}
										</td>
										<td className="text-center text-gray-900 w-24 lg:w-40 px-6 py-3 bg-blue-50 dark:bg-gray-800 text-base">
											<input type="checkbox" />
										</td>
									</tr>
									<tr>
										<td
											colSpan={3}
											className="text-right text-gray-900 w-24 lg:w-40 px-6 py-3 bg-white dark:bg-gray-800 text-base"
										>
											Thành tiền
										</td>
										<td className="text-left text-gray-900 w-24 lg:w-40 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-base">
											{formatPrice(0)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{
						// Payment method
					}
					<div className="pt-5">
						<div className="font-semibold text-xl pb-2">
							Chọn phương thức thanh toán:
						</div>
						<div className="flex justify-center gap-5">
							<div
								className={`text-base flex gap-2 items-center shadow-md sm:rounded-lg w-max p-3 cursor-pointer hover:bg-blue-50 ${
									selectedMethod === 0 && 'bg-blue-100'
								}`}
                onClick={() => setSelectedMethod(0)}
							>
								<div>
									<BsCashCoin size={20} />
								</div>
								<div>Tiền mặt</div>
							</div>
							<div
								className={`text-base flex gap-2 items-center shadow-md sm:rounded-lg w-max p-3 cursor-pointer hover:bg-blue-50 ${
									selectedMethod === 1 && 'bg-blue-100'
								}`}
                onClick={() => setSelectedMethod(1)}
							>
								<div>
									<BsCreditCard size={20} />
								</div>
								<div>Thanh toán qua ngân hàng</div>
							</div>
							<div
								className={`text-base flex gap-2 items-center shadow-md sm:rounded-lg w-max p-3 cursor-pointer hover:bg-blue-50 ${
									selectedMethod === 2 && 'bg-blue-100'
								}`}
                onClick={() => setSelectedMethod(2)}
							>
								<div>
									<BsWallet2 size={20} />
								</div>
								<div>Ví điện tử</div>
							</div>
						</div>
					</div>
					<div className="flex justify-center pt-5">
						<div className="w-32">
							<Button>Thanh toán</Button>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

PaymentBooking.propTypes = {
	bookingId: PropTypes.string,
	bookingDetails: PropTypes.array,
	payments: PropTypes.array
};

export default PaymentBooking;
