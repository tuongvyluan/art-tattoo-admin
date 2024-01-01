import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardBody } from 'ui';
import Heading from 'components/Heading';
import { Badge, Tooltip } from 'flowbite-react';
import MyPagination from 'ui/MyPagination';
import { BASE_URL } from 'lib/env';
import { fetcher } from 'lib';
import { cityMap } from 'lib/city';
import Link from 'next/link';
import { Search } from 'icons/outline';

function AdminStudioPage({ pageSize }) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		fetcher(`${BASE_URL}/studios`)
			.then((data) => {
				setItems(data.studios);
				setTotalPage(Math.ceil(data.total / pageSize));
			})
			.catch((e) => {
				setError(true);
			});
	}, []);

	useEffect(() => {
		fetcher(`${BASE_URL}/studios?page=${page}`)
			.then((data) => {
				setItems(data.studios);
			})
			.catch((e) => {
				setError(true);
			});
	}, [page]);

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				Tải dữ liệu thất bại
			</div>
		);
	}

	return (
		<div>
			<Card>
				<CardBody>
					<Heading>Tiệm xăm</Heading>
					<div className="pt-1">
						<div className="w-full overflow-auto relative shadow-md sm:rounded-lg mb-5">
							<table className="w-full min-w-3xl text-sm text-left text-gray-500">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="w-1/4 px-3 py-3 bg-gray-50 text-center"
										>
											Tên tiệm xăm
										</th>
										{/* <th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Thành phố
										</th> */}
										<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Địa chỉ
										</th>
										<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Thành phố
										</th>
										<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Mã số thuế
										</th>
										{/* <th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Hạn sử dụng gói
										</th> */}
										{/* <th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Đánh giá
										</th> */}
										{/* <th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Đang mở cửa
										</th> */}
										<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Được phép hoạt động
										</th>
										<th
											scope="col"
											className="px-3 py-3 bg-gray-50 text-center min-w-0"
										></th>
									</tr>
								</thead>
								<tbody className="h-full">
									{items.map((item, itemIndex) => (
										<tr key={item.id} className='hover:bg-gray-50'>
											<td className="px-3 py-4 min-w-max">
												<div className="flex gap-2 items-center">
													<Avatar src={item.avatar} size={40} />
													<div className="flex-grow text-base">
														{item.studioName}
													</div>
												</div>
											</td>
											{/* <td className="px-3 py-4"></td> */}
											<td className="px-3 py-4">{item.address}</td>
											<td className="px-3 py-4">{cityMap.get(item.city)}</td>
											<td className="px-3 py-4">{item.taxCode}</td>
											{/* <td className="px-3 py-4"></td>
											<td className="px-3 py-4"></td> */}
											{/* <td className="px-3 py-4"></td> */}
											<td className="px-3 py-4">
												{item.isActivated ? (
													<div className="w-32 flex">
														<Badge color="success" className="text-center">
															Đang hoạt động
														</Badge>
													</div>
												) : (
													<div className="w-32 flex">
														<Badge color="failure" className="text-center">
															Đã bị khoá
														</Badge>
													</div>
												)}
											</td>
											<td className="px-3 py-4">
												<Tooltip content="Xem chi tiết tiệm xăm">
													<Link href={`/studio/${item.id}`}>
														<Search className='cursor-pointer' width={20} height={20} />
													</Link>
												</Tooltip>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</CardBody>
			</Card>
			{totalPage > 0 && (
				<MyPagination current={page} setCurrent={setPage} totalPage={totalPage} />
			)}
		</div>
	);
}

export default AdminStudioPage;
