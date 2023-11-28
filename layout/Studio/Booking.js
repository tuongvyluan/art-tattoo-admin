import PropTypes from 'prop-types';
import { fetcher, formatPrice, formatTime } from 'lib';
import { useEffect, useState } from 'react';
import { Card, CardBody, Loading, Ripple } from 'ui';
import { Search } from 'icons/outline';
import debounce from 'lodash.debounce';
import {
	BOOKING_STATUS,
	stringBookingStatuses,
	stringColor,
	stringDifficult,
	stringPlacements,
	stringSize
} from 'lib/status';
import Image from 'next/image';
import MyPagination from 'ui/MyPagination';

const ALL_TAB = '1';
const PENDING_TAB = '2';
const CONFIRMED_TAB = '3';
const IN_PROGRESS_TAB = '4';
const COMPLETE_TAB = '5';
const CANCELLED_TAB = '6';

function BookingPage({ studioId }) {
	const [data, setData] = useState([]);
	const [activeTab, setActiveTab] = useState('1');
	const [searchKey, setSearchKey] = useState('');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [filter, setFilter] = useState(undefined);
	const [total, setTotal] = useState(0);
	const pageSize = 4;

	const onSearch = (e) => {
		setSearchKey(e.target.value);
	};

	const onKeyDown = (e) => {
		handleKeyDown(e);
	};

	const handleKeyDown = debounce((e) => {
		if (e.keyCode === 13 || e.key === 'Enter') {
			console.log(searchKey);
		}
	}, 300);

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
			console.log(tab);
		}
	};

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetcher(
			`https://arttattoolover-web-sea-dev-001.azurewebsites.net/bookings-studio?studioId=${studioId}&page=${page}&pageSize=${pageSize}${
				filter >= 0 ? `&status=${filter}` : ''
			}`
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
	}, [filter, page]);

	useEffect(() => {
		switch (activeTab) {
			case PENDING_TAB:
				setPage(1);
				setFilter(BOOKING_STATUS.PENDING);
				break;
			case CONFIRMED_TAB:
				setPage(1);
				setFilter(BOOKING_STATUS.CONFIRMED);
				break;
			case IN_PROGRESS_TAB:
				setPage(1);
				setFilter(BOOKING_STATUS.IN_PROGRESS);
				break;
			case COMPLETE_TAB:
				setPage(1);
				setFilter(BOOKING_STATUS.COMPLETED);
				break;
			case CANCELLED_TAB:
				setPage(1);
				setFilter(BOOKING_STATUS.CUSTOMER_CANCEL);
				break;
			default:
				setPage(1);
				setFilter(undefined);
				break;
		}
	}, [activeTab]);

	return (
		<div className="sm:px-8 md:px-1 lg:px-6 xl:px-56">
			<div className="mx-auto ring-1 ring-black ring-opacity-5 bg-white">
				<div className="flex flex-row w-0 min-w-full">
					<ul className="list-none grid col-span-4 grid-flow-col place-items-center overflow-x-auto w-0 min-w-full -mb-10 pb-10">
						<li
							className={`text-center  cursor-pointer ${
								activeTab === ALL_TAB
									? 'border-b-2 border-solid border-gray-700'
									: ''
							}`}
						>
							<a
								onClick={() => {
									toggle(ALL_TAB);
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
							>
								Tất cả
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === PENDING_TAB
									? 'border-b-2 border-solid border-gray-700'
									: ''
							}`}
						>
							<a
								onClick={() => {
									toggle(PENDING_TAB);
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
							>
								Chờ xác nhận
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === CONFIRMED_TAB
									? 'border-b-2 border-solid border-gray-700'
									: ''
							}`}
						>
							<a
								onClick={() => {
									toggle(CONFIRMED_TAB);
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
							>
								Đã xác nhận
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === IN_PROGRESS_TAB
									? 'border-b-2 border-solid border-gray-700'
									: ''
							}`}
						>
							<a
								onClick={() => {
									toggle(IN_PROGRESS_TAB);
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
							>
								Đang thực hiện
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === COMPLETE_TAB
									? 'border-b-2 border-solid border-gray-700'
									: ''
							}`}
						>
							<a
								href="#"
								onClick={() => {
									toggle(COMPLETE_TAB);
								}}
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
							>
								Hoàn thành
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === CANCELLED_TAB
									? 'border-b-2 border-solid border-gray-700'
									: ''
							}`}
						>
							<a
								href="#"
								onClick={() => {
									toggle(CANCELLED_TAB);
								}}
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
							>
								Đã huỷ
								<Ripple color="black" />
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="my-3">
				<div className="relative bg-gray-200 p-2 flex items-center px-3">
					<span className="block">
						<Search width={18} height={18} />
					</span>
					<input
						value={searchKey}
						onChange={onSearch}
						onKeyDown={onKeyDown}
						className="my-2 appearance-none relative block w-full pl-3 pr-3 border-0 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none h-5 bg-transparent"
						placeholder="Bạn có thể tìm theo tên hình xăm, tên khách hàng, hoặc ID lịch hẹn"
					/>
				</div>
			</div>
			{error && (
				<div className="flex items-center justify-center h-full">
					Không tồn tại đơn hẹn xăm
				</div>
			)}
			{loading && (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			)}
			{!loading && (
				<div className="relative">
					<div className="relative">
						{data.map((booking, index) => (
							<Card key={booking.id}>
								<CardBody>
									<a className='text-black' href={`/booking/${booking.id}`}>
										<div className="cursor-pointer ">
											<div className="flex justify-between mx-auto border-b border-gray-300 pb-3">
												<div className="flex gap-3 items-start">
													<div className="font-semibold">
														{booking.customer.firstName} {booking.customer.lastName}
													</div>
												</div>
												<div>
													<div className="text-red-500">
														{stringBookingStatuses.at(booking.status)}
													</div>
												</div>
											</div>
											{booking.services &&
											Object.keys(booking.services).length > 0 ? (
												<div className="mx-auto border-b border-gray-300 py-3">
													<div className="text-gray-500 pb-2">Dịch vụ đã đặt</div>
													{booking.services.map((service, serviceIndex) => (
														// Booking service
														<div key={`${booking.id}-${service.id}`}>
															<div className="pb-1 flex flex-wrap text-base">
																<div>{serviceIndex + 1}</div>
																<div className="pr-1">
																	. {stringSize.at(service.size)},
																</div>
																{service.placement ? (
																	<div className="pr-1">
																		Vị trí xăm:{' '}
																		{stringPlacements.at(service.placement)},
																	</div>
																) : (
																	<></>
																)}
																<div className="pr-1">
																	{stringColor(service.hasColor)},
																</div>
																<div className="pr-1">
																	{stringDifficult(service.isDifficult)},
																</div>
																<div>
																	{formatPrice(service.minPrice)} -{' '}
																	{formatPrice(service.maxPrice)}
																</div>
															</div>
															{booking.tattooArts?.at(serviceIndex) && (
																<div
																	key={booking.tattooArts?.at(serviceIndex).id}
																	className="py-2 flex flex-row justify-start gap-3 flex-wrap"
																>
																	<div className="relative w-24 h-24">
																		<Image
																			layout="fill"
																			src={
																				booking.tattooArts?.at(serviceIndex)
																					.thumbnail
																					? booking.tattooArts?.at(serviceIndex)
																							.thumbnail
																					: '/images/ATL.png'
																			}
																			alt={booking.tattooArts?.at(serviceIndex).id}
																			className="object-contain"
																		/>
																	</div>
																	<div className="flex-grow">
																		<div>
																			<span>Nghệ sĩ xăm: </span>
																			<span className="font-semibold">
																				{
																					booking.tattooArts?.at(serviceIndex).artist
																						?.firstName
																				}{' '}
																				{
																					booking.tattooArts?.at(serviceIndex).artist
																						?.lastName
																				}
																			</span>
																		</div>
																		{booking.tattooArts
																			?.at(serviceIndex)
																			.bookingDetails.map(
																				(bookingDetail, bookingDetailIndex) => (
																					<div
																						key={bookingDetail.id}
																						className="flex justify-between items-center"
																					>
																						<div className="text-base">
																							{bookingDetail.operationName}
																						</div>
																						<div className="text-lg">
																							{formatPrice(bookingDetail.price)}
																						</div>
																					</div>
																				)
																			)}
																	</div>
																</div>
															)}
														</div>
													))}
												</div>
											) : (
												<></>
											)}
											{/* {booking.tattooArts && booking.tattooArts.length > 0 && (
												<div className=" pb-3 border-b border-gray-300">
													<div className="text-gray-500 pt-2">Hình xăm</div>
													{booking.tattooArts?.map((tattoo, tattooIndex) => (
														<div
															key={tattoo.id}
															className="py-2 flex flex-row justify-start gap-3 flex-wrap"
														>
															<div className="relative w-24 h-24">
																<Image
																	layout="fill"
																	src={
																		tattoo.thumbnail
																			? tattoo.thumbnail
																			: '/images/ATL.png'
																	}
																	alt={tattoo.id}
																	className="object-contain"
																/>
															</div>
															<div className="flex-grow">
																<div>
																	<span>Nghệ sĩ xăm: </span>
																	<span className="font-semibold">
																		{tattoo.artist?.firstName}{' '}
																		{tattoo.artist?.lastName}
																	</span>
																</div>
																{tattoo.bookingDetails.map(
																	(bookingDetail, bookingDetailIndex) => (
																		<div
																			key={bookingDetail.id}
																			className="flex justify-between items-center"
																		>
																			<div className="text-base">
																				{bookingDetail.operationName}
																			</div>
																			<div className="text-lg">
																				{formatPrice(bookingDetail.price)}
																			</div>
																		</div>
																	)
																)}
															</div>
														</div>
													))}
												</div>
											)} */}
											<div className="flex justify-end pt-3 items-start">
												<div className="text-right">
													<div>
														Ngày tạo đơn:{' '}
														<span className="text-base">
															{formatTime(booking.createdAt)}
														</span>
													</div>
													{booking.date && (
														<div>
															Ngày hẹn:{' '}
															<span className="text-base">
																{formatTime(booking.date)}
															</span>
														</div>
													)}
													{booking.total && (
														<div>
															Thành tiền:{' '}
															<span className="text-lg text-red-500">
																{formatPrice(booking.total)}
															</span>
														</div>
													)}
												</div>
											</div>
										</div>
									</a>
								</CardBody>
							</Card>
						))}
					</div>

					{total > 0 && (
						<MyPagination current={page} setCurrent={setPage} totalPage={total} />
					)}
				</div>
			)}
		</div>
	);
}

BookingPage.propTypes = {
	studioId: PropTypes.string
};

export default BookingPage;
