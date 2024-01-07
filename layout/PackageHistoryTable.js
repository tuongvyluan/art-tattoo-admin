import Heading from 'components/Heading';
import { fetcher, formatPrice, formatTime } from 'lib';
import { BASE_URL } from 'lib/env';
import { useRouter } from 'next/router';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';
import { Card, CardBody, Loading } from 'ui';
import MyPagination from 'ui/MyPagination';

const PackageHistoryTable = ({ studioId = '', reloadKey }) => {
	const router = useRouter();
	const [packages, setPackages] = useState([]);
	const [page, setPage] = useState(
		router.query.page ? Number.parseInt(router.query.page) : 1
	);
	const [fetchUrl, setFetchUrl] = useState(
		studioId === ''
			? `${BASE_URL}/Package/GetPackageStudio?`
			: `${BASE_URL}/Package/GetPackageStudio?studioId=` + studioId + '&'
	);
	const pageSize = 20;
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchData = () => {
		setLoading(true);
		setError(false);

		fetcher(`${fetchUrl}page=${page}&pageSize=${pageSize}`)
			.then((data) => {
				setPackages(data.packageService);
				setTotalPage(Math.ceil(data.total / pageSize));
			})
			.catch((e) => {
				setPage(1);
				setPackages([]);
				setTotalPage(0);
				setError(true);
			})
			.finally(() => {
				router.push(
					`/package?page=${page}${
						router.query.code ? '&code=' + router.query.code : ''
					}`
				);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchData();
	}, [page, reloadKey]);

	if (loading && !error) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="">
				{packages && packages.length > 0 && !error && (
					<div className="flex flex-wrap gap-2 justify-between pb-3 items-center relative">
						<div className="h-full w-full">
							<Heading>Lịch sử mua gói dịch vụ của tiệm xăm</Heading>
							<div className="w-full overflow-auto relative shadow-md sm:rounded-lg mb-5 text-base">
								{
									// Artist list
								}
								<table className="w-full min-w-3xl text-left text-gray-500">
									<thead>
										<tr>
											<th scope="col" className="px-3 py-3 bg-gray-50">
												Giá tiền
											</th>
											<th scope="col" className="px-3 py-3 bg-gray-50">
												Thời gian mua
											</th>
											<th scope="col" className="px-3 py-3 bg-gray-50">
												Hết hạn vào lúc
											</th>
											{studioId === '' && (
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Tiệm xăm
												</th>
											)}
										</tr>
									</thead>
									<tbody>
										{packages.map((r) => (
											<tr key={r.id}>
												<td className="px-3 py-4 w-1/3">{formatPrice(r.price)}</td>
												<td className="px-3 py-4">{formatTime(r.paidAt)}</td>
												<td className="px-3 py-4">{formatTime(r.expiredAt)}</td>
												{studioId === '' && <td className="px-3 py-4"></td>}
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
					</div>
				)}
			</div>
		</div>
	);
};

PackageHistoryTable.propTypes = {
	studioId: PropTypes.string,
	reloadKey: PropTypes.number
};

export default PackageHistoryTable;
