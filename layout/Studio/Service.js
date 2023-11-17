import MoneyInput from 'components/MoneyInput';
import { Link } from 'i18n';
import { ChevronLeft } from 'icons/solid';
import { PLACEMENT, SERVICE_SIZE, stringServicePlacement } from 'lib/status';
import {
	defaultServiceMap,
	getColor,
	getDifficult,
	getPlacement,
	getSize,
	serviceListToMap
} from 'lib/studioServiceHelper';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardBody } from 'ui';

function ServicePage({ services }) {
	const [serviceList, setServiceList] = useState(
		JSON.parse(JSON.stringify(services))
	);
	const serviceMap = serviceListToMap(serviceList);
	const defaultMap = defaultServiceMap();
	[...serviceMap].map(([key, value], index) => {
		if (key < 30) {
			defaultMap.set(key, {
				...defaultMap.get(key),
				minPrice: value.minPrice,
				maxPrice: value.maxPrice,
				ink: value.ink,
				id: value.id
			});
		}
		if (key >= 100 && getSize(key) === 3) {
			defaultMap.set(key, {
				...defaultMap.get(key),
				minPrice: value.minPrice,
				maxPrice: value.maxPrice,
				ink: value.ink,
				id: value.id
			});
		}
	});
	const sizeMap = new Map(
		[...defaultMap]
			.filter(([key, value]) => key < 30)
			.sort(([key1, value1], [key2, value2]) => key1 - key2)
	);

	const placementMap = new Map(
		[...defaultMap]
			.filter(([key, value]) => key >= 100)
			.sort(([key1, value1], [key2, value2]) => key1 - key2)
	);
	console.log(placementMap);
	const sizeList = ['Size S (<8cm)', 'Size M (8-15cm)', 'Size L (15-30cm)'];

	const handlePriceChange = (key, fieldKey, fieldValue) => {
		const service = defaultMap.get(key);
		service[fieldKey] = fieldValue;
		defaultMap.set(key, service);
	};

	return (
		<div className="sm:px-3 md:px-1 lg:px-10 xl:px-36">
			<Card>
				<CardBody>
					<div className="flex justify-between border-b border-gray-300 pb-3">
						<Link href={'/service'}>
							<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
					</div>
					{
						// Bảng giá theo size
					}
					<div className="pt-3 pb-5 border-b border-gray-300">
						<h2 className="text-base font-semibold pb-2 text-center">
							Bảng giá dịch vụ theo kích thước
						</h2>
						<div className="relative overflow-y-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="w-24 lg:w-40 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Size
										</th>
										<th
											scope="col"
											className="w-32 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Độ khó
										</th>
										<th
											scope="col"
											className="w-32 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Màu sắc
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Giá
										</th>
									</tr>
								</thead>
								<tbody>
									{[...sizeMap].map(([key, value], index) => (
										<tr
											key={key}
											className="border-b border-gray-200 dark:border-gray-700"
										>
											{key % 10 === 0 && (
												<th
													rowSpan={4}
													scope="row"
													className="bg-gray-50 px-3 py-2 text-base font-medium text-gray-900 dark:text-white dark:bg-gray-800"
												>
													{sizeList.at(getSize(key))}
												</th>
											)}
											{key % 5 === 0 && (
												<td rowSpan={2} className="px-3 py-2 text-base">
													{getDifficult(key) ? 'Phức tạp' : 'Đơn giản'}
												</td>
											)}
											<td className="px-3 py-2 text-base">
												{getColor(key) ? 'Màu sắc' : 'Trắng đen'}
											</td>
											<td className="px-3 py-2 bg-blue-50 flex justify-center">
												<div className="flex gap-2 items-center">
													<span className="text-base">Từ</span>
													<div className="w-32">
														<MoneyInput
															onAccept={(value, mask) =>
																handlePriceChange(key, 'minPrice', value)
															}
															value={value.minPrice}
														/>
													</div>
													<span className="text-base">tới</span>
													<div className="w-32">
														<MoneyInput
															onAccept={(value, mask) =>
																handlePriceChange(key, 'maxPrice', value)
															}
															value={value.maxPrice}
														/>
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{
						// Bảng giá theo placement
					}
					<div className="pt-3">
						<h2 className="text-base font-semibold pb-2 text-center">
							Bảng giá dịch vụ theo vị trí xăm
						</h2>
						<div className="relative overflow-y-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="w-24 lg:w-40 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Vị trí xăm
										</th>
										<th
											scope="col"
											className="w-32 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Độ khó
										</th>
										<th
											scope="col"
											className="w-32 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Màu sắc
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center"
										>
											Giá
										</th>
									</tr>
								</thead>
								<tbody>
									{[...placementMap].map(([key, value], index) => (
										<tr
											key={key}
											className="border-b border-gray-200 dark:border-gray-700"
										>
											{key % 10 === 0 && Math.round(key / 100) > 0 && (
												<th
													rowSpan={4}
													scope="row"
													className="bg-gray-50 px-3 py-2 text-base font-medium text-gray-900 dark:text-white dark:bg-gray-800"
												>
													{stringServicePlacement.at(getPlacement(key))}
												</th>
											)}
											{key % 5 === 0 && (
												<td rowSpan={2} className="px-3 py-2 text-base">
													{getDifficult(key) ? 'Phức tạp' : 'Đơn giản'}
												</td>
											)}
											<td className="px-3 py-2 text-base">
												{getColor(key) ? 'Màu sắc' : 'Trắng đen'}
											</td>
											<td className="px-3 py-2 bg-blue-50 flex justify-center">
												<div className="flex gap-2 items-center">
													<span className="text-base">Từ</span>
													<div className="w-32">
														<MoneyInput
															onAccept={(value, mask) =>
																handlePriceChange(key, 'minPrice', value)
															}
															value={value.minPrice}
														/>
													</div>
													<span className="text-base">tới</span>
													<div className="w-32">
														<MoneyInput
															onAccept={(value, mask) =>
																handlePriceChange(key, 'maxPrice', value)
															}
															value={value.maxPrice}
														/>
													</div>
												</div>
											</td>
										</tr>
									))}
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
