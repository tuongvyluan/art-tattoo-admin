import Heading from 'components/Heading';
import { Tooltip } from 'flowbite-react';
import { Search } from 'icons/outline';
import { fetcher, formatPhoneNumber } from 'lib';
import { BASE_URL } from 'lib/env';
import Link from 'next/link';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';
import { Card, CardBody, Loading } from 'ui';
import MyPagination from 'ui/MyPagination';

const StudioCustomerListPage = ({ studioId }) => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [total, setTotal] = useState(0);
	const pageSize = 20;

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetcher(
			`${BASE_URL}/customers/CustomerStudio?studioId=${studioId}&page=${page}&pageSize=${pageSize}`
		)
			.then((data) => {
				setData(data.data);
				setTotal(Math.ceil(data.total / pageSize));
				setLoading(false);
			})
			.catch((e) => {
				setData([]);
				setTotal(0);
				setError(true);
				setLoading(false);
			});
	}, [page]);

	return (
		<div className="sm:px-8 md:px-1 lg:px-6 xl:px-32 min-h-body">
			<Card>
				<CardBody>
					<div className="border-b border-gray-300 mb-5">
						<Heading>Khách hàng</Heading>
					</div>
					{
						// Customer table
					}
					{loading ? (
						<div className="flex items-center justify-center h-full">
							<Loading />
						</div>
					) : (
						<div>
							{data?.length > 0 ? (
								<div>
									<table className="w-full mb-5 text-sm text-left text-gray-500 pb-20">
										<thead className="text-xs text-gray-700 uppercase">
											<tr>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Tên
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Email
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Số điện thoại
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Tổng số đơn hàng
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50"></th>
											</tr>
										</thead>
										<tbody className="h-full">
											{data.map((customer, index) => (
												<tr
													key={customer.id}
													className="bg-white border-b hover:bg-gray-50 text-black cursor-pointer"
												>
													<td className="px-3 py-4">
														<div>{customer.fullName} </div>
													</td>
													<td className="px-3 py-4 w-1/3">
														<div>{customer.email} </div>
													</td>
													<td className="px-3 py-4">
														<div>{formatPhoneNumber(customer.phoneNumber)} </div>
													</td>
													<td className="px-3 py-4">
														<div>{customer.noOfBookings} </div>
													</td>
													<td className="px-3 py-4 flex justify-end">
														<Tooltip content="Xem lịch sử đặt hàng của khách">
															<Link prefetch={false} href={`/booking?search=${customer.id}`}>
																<Search width={20} height={20} />
															</Link>
														</Tooltip>
													</td>
												</tr>
											))}
										</tbody>
									</table>
									{total > 0 && (
										<MyPagination
											current={page}
											setCurrent={setPage}
											totalPage={total}
										/>
									)}
								</div>
							) : (
								<div>Không có khách hàng nào.</div>
							)}
						</div>
					)}
				</CardBody>
			</Card>
		</div>
	);
};

StudioCustomerListPage.propTypes = {
	studioId: PropTypes.string.isRequired
};

export default StudioCustomerListPage;
