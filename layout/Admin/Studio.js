import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'ui';
import Heading from 'components/Heading';
import { Badge } from 'flowbite-react';
import MyPagination from 'ui/MyPagination';
import { BASE_URL } from 'lib/env';
import { fetcher } from 'lib';

function AdminStudioPage({ pageSize }) {
	const [items, setItems] = useState([])
	const [error, setError] = useState(false)
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		fetcher(`${BASE_URL}/studios`).then((data) => {
			setItems(data.studios)
			setTotalPage(Math.ceil(data.total / pageSize))
		}).catch((e) => {
			setError(true)
		})
	}, [])

	useEffect(() => {
		fetcher(`${BASE_URL}/studios?page=${page}`).then((data) => {
			setItems(data.studios)
		}).catch((e) => {
			setError(true)
		})
	}, [page])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        Tải dữ liệu thất bại
      </div>
    )
  }

	return (
		<div>
			<Heading>Studio</Heading>
			<Card>
				<CardBody>
					<div className="pt-1">
						<div className="relative shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left text-gray-500 pb-20">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Tên tiệm xăm
										</th>
										{/* <th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Thành phố
										</th> */}
										<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Địa chỉ
										</th>
										{/* <th scope="col" className="px-3 py-3 bg-gray-50 text-center">
											Mã số thuế
										</th> */}
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
									</tr>
								</thead>
								<tbody className="h-full">
									{items.map((item, itemIndex) => (
										<tr key={item.id}>
											<td className="px-3 py-4">{item.studioName}</td>
											{/* <td className="px-3 py-4"></td> */}
											<td className="px-3 py-4">{item.address}</td>
											{/* <td className="px-3 py-4"></td> */}
											{/* <td className="px-3 py-4"></td>
											<td className="px-3 py-4"></td> */}
											{/* <td className="px-3 py-4"></td> */}
											<td className="px-3 py-4">
												{item.isActivated ? (
													<div className='w-32 flex'><Badge color='success' className='text-center'>Đang hoạt động</Badge></div>
												) : (
													<div className='w-32 flex'>
														<Badge color='failure' className='text-center'>Đã bị khoá</Badge>
													</div>
												)}
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
