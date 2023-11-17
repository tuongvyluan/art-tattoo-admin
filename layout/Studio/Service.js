import { Link } from 'i18n';
import { ChevronLeft } from 'icons/solid';
import { serviceListToMap } from 'lib/studioServiceHelper';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardBody } from 'ui';

function ServicePage({ services }) {
	const [serviceList, setServiceList] = useState(
		JSON.parse(JSON.stringify(services))
	);
	const serviceMap = serviceListToMap(serviceList);
	const sizeList = ['Size S (<8cm)', 'Size M (8 - 15cm)', 'Size L (15 - 30cm)'];

	return (
		<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
			<Card>
				<CardBody>
					<div className="flex justify-between border-b border-gray-300 pb-3">
						<Link href={'/service'}>
							<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
					</div>
					<div className="pt-3">
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Size
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Màu sắc
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Độ khó
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
										>
											Giá
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-gray-200 dark:border-gray-700">
										<th
											rowSpan={2}
											scope="row"
											className="bg-gray-50 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white dark:bg-gray-800"
										>
											{sizeList.at(0)}
										</th>
										<td className="px-6 py-4">Trắng đen</td>
										<td className="px-6 py-4">Đơn giản</td>
										<td className="px-6 py-4 bg-blue-50">100000</td>
									</tr>
									<tr className="border-b border-gray-200 dark:border-gray-700">
										<td className="bg-yellow-50 px-6 py-4">Màu sắc</td>
										<td className="bg-yellow-50 px-6 py-4">Phức tạp</td>
										<td className="px-6 py-4 bg-blue-50">100000</td>
									</tr>
									<tr className="border-b border-gray-200 dark:border-gray-700">
										<th
											rowSpan={2}
											scope="row"
											className="bg-gray-50 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white dark:bg-gray-800"
										>
											{sizeList.at(1)}
										</th>
										<td className="px-6 py-4">Trắng đen</td>
										<td className="px-6 py-4">Đơn giản</td>
										<td className="px-6 py-4 bg-blue-50">100000</td>
									</tr>
									<tr className="border-b border-gray-200 dark:border-gray-700">
										<td className="bg-yellow-50 px-6 py-4">Màu sắc</td>
										<td className="bg-yellow-50 px-6 py-4">Phức tạp</td>
										<td className="px-6 py-4 bg-blue-50">100000</td>
									</tr>
									<tr className="border-b border-gray-200 dark:border-gray-700">
										<th
											rowSpan={2}
											scope="row"
											className="bg-gray-50 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white dark:bg-gray-800"
										>
											{sizeList.at(2)}
										</th>
										<td className="px-6 py-4">Trắng đen</td>
										<td className="px-6 py-4">Đơn giản</td>
										<td className="px-6 py-4 bg-blue-50">100000</td>
									</tr>
									<tr className="border-b border-gray-200 dark:border-gray-700">
										<td className="bg-yellow-50 px-6 py-4">Màu sắc</td>
										<td className="bg-yellow-50 px-6 py-4">Phức tạp</td>
										<td className="px-6 py-4 bg-blue-50">100000</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

ServicePage.propTypes = {
	services: PropTypes.array.isRequired
};

export default ServicePage;
