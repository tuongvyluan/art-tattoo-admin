import Heading from 'components/Heading';
import { Tooltip } from 'flowbite-react';
import { fetcher, formatPrice, formatTime } from 'lib';
import { BASE_URL } from 'lib/env';
import { stringTransactionMethod } from 'lib/status';
import Link from 'next/link';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Card, CardBody } from 'ui';
import MyPagination from 'ui/MyPagination';

const StudioPayment = ({ studioId }) => {
	const [totalPage, setTotalPage] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [filter, setFilter] = useState(undefined);
	const pageSize = 10;

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetcher(
			`${BASE_URL}/transactions/GetTransactionByAccount?studioId=${studioId}&page=${page}&pageSize=${pageSize}`
		)
			.then((data) => {
				setTransactions(data.data);
				setTotalPage(Math.ceil(data.total / pageSize));
				setLoading(false);
			})
			.catch((e) => {
				setTransactions([]);
				setTotalPage(0);
				setError(true);
				setLoading(false);
			});
	}, [page]);

	if (error) {
		return (
			<div className="absolute top-0 bottom-0 flex flex-col justify-center left-0 right-0 text-lg">
				<div className="text-center">Tải dữ liệu thất bại.</div>
				<Link prefetch={false} href="/">
					<div className="text-center cursor-pointer text-blue-500">
						Trở lại trang chủ
					</div>
				</Link>
			</div>
		);
	}

	return (
		<div className="relative sm:px-12 md:px-3 lg:px-10 xl:px-20">
			<Card>
				<CardBody>
					<Heading>Lịch sử giao dịch</Heading>
					{
						// Transaction table
					}
					<div className="w-full">
						<div className="w-full overflow-auto relative shadow-md sm:rounded-lg mb-5">
							<table className="w-full min-w-3xl text-sm text-left text-gray-500">
								<thead className="text-xs text-gray-700 uppercase">
									<tr>
										<th
											scope="col"
											className="w-1/4 px-4 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Khách hàng
										</th>
										<th
											scope="col"
											className="w-28 px-4 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Số tiền
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
											className="px-2 py-3 bg-gray-50 dark:bg-gray-800"
										></th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((transaction, transactionIndex) => (
										<tr
											key={transaction.id}
											className="text-base bg-white border-b hover:bg-gray-50"
										>
											<td className="text-left text-gray-900 px-4 py-3 text-base">
												{transaction.fullName}
											</td>
											<td
												scope="col"
												className={`text-left ${
													transaction.isRefund ? 'text-red-500' : 'text-gray-900'
												} w-16 lg:w-24 px-4 py-3`}
											>
												{transaction.isRefund && '-'}
												{formatPrice(transaction.price)}
											</td>
											<td className="text-left text-gray-900 w-1/3 px-4 py-3 text-base">
												{transaction.description}
											</td>
											<td scope="col" className="text-left text-gray-900 px-4 py-3">
												{formatTime(transaction.createdAt)}
											</td>
											<td className="text-left text-gray-900 sm:w-28 px-4 py-3 text-base">
												{stringTransactionMethod.at(transaction.method)}
											</td>
											<td className="text-left text-gray-900 px-4 py-3 text-base">
												<Tooltip content='Xem đơn hàng'>
													<Link prefetch={false} href={`/booking/${transaction.bookingId}`}>
														<div className="cursor-pointer flex justify-center">
															<HiMiniMagnifyingGlass
																className="hover:text-gray-600 cursor-pointer"
																size={20}
															/>
														</div>
													</Link>
												</Tooltip>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{totalPage > 0 && (
							<MyPagination
								current={page}
								setCurrent={setPage}
								totalPage={totalPage}
							/>
						)}
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

StudioPayment.propTypes = {
	studioId: PropTypes.string.isRequired
};

export default StudioPayment;
