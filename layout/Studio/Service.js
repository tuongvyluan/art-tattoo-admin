import Button from 'components/Button';
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
import { Card, CardBody, Ripple } from 'ui';

const SIZE_TAB = '1';
const PLACEMENT_TAB = '2';

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

	const [activeTab, setActiveTab] = useState('1');

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
			console.log(tab);
		}
	};

	return (
		<div className="sm:px-3 md:px-1 lg:px-10 xl:px-36">
			<div className="flex justify-between">
				<div className="w-72 ring-1 ring-black ring-opacity-5 bg-white mb-3">
					<div className="flex flex-row w-0 min-w-full">
						<ul className="list-none grid col-span-4 grid-flow-col place-items-center overflow-x-auto w-0 min-w-full -mb-10 pb-10">
							<li
								className={`text-center  cursor-pointer ${
									activeTab === SIZE_TAB
										? 'border-b-2 border-solid border-gray-700'
										: ''
								}`}
							>
								<a
									onClick={() => {
										toggle(SIZE_TAB);
									}}
									href="#"
									className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
								>
									Theo size
									<Ripple color="black" />
								</a>
							</li>
							<li
								className={`text-center cursor-pointer ${
									activeTab === PLACEMENT_TAB
										? 'border-b-2 border-solid border-gray-700'
										: ''
								}`}
							>
								<a
									onClick={() => {
										toggle(PLACEMENT_TAB);
									}}
									href="#"
									className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
								>
									Theo vị trí xăm
									<Ripple color="black" />
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="w-16">
						<Button outline type="reset">
							Reset
						</Button>
					</div>
					<div className="w-16">
						<Button>Lưu</Button>
					</div>
				</div>
			</div>
			<Card>
				<CardBody>
					{
						// Bảng giá theo size
						activeTab === SIZE_TAB && (
							<div className="pt-1">
								<h2 className="text-lg font-semibold pb-3 text-center">
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
													<td
														className={`px-3 py-2 text-base ${
															getColor(key) ? 'bg-blue-50' : ''
														}`}
													>
														{getColor(key) ? 'Màu sắc' : 'Trắng đen'}
													</td>
													<td
														className={`px-3 py-2 flex justify-center ${
															getColor(key) ? 'bg-blue-50' : ''
														}`}
													>
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
						)
					}
					{
						// Bảng giá theo vị trí xăm
						activeTab === PLACEMENT_TAB && (
							<div className="pt-1">
								<h2 className="text-lg font-semibold pb-3 text-center">
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
													<td
														className={`px-3 py-2 text-base ${
															getColor(key) ? 'bg-blue-50' : ''
														}`}
													>
														{getColor(key) ? 'Màu sắc' : 'Trắng đen'}
													</td>
													<td
														className={`px-3 py-2 flex justify-center ${
															getColor(key) ? 'bg-blue-50' : ''
														}`}
													>
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
						)
					}
				</CardBody>
			</Card>
		</div>
	);
}

ServicePage.propTypes = {
	services: PropTypes.array.isRequired
};

export default ServicePage;
