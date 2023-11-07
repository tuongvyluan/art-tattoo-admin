import { formatPrice, formatTime } from 'lib';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card, CardBody, Link, Ripple } from 'ui';
import { Search } from 'icons/outline';
import debounce from 'lodash.debounce';
import { BOOKING_STATUS, stringBookingStatuses } from 'lib/status';
import Image from 'next/image';

const ALL_TAB = '1';
const PENDING_TAB = '2';
const COMPLETE_TAB = '3';
const CANCELLED_TAB = '4';

function BookingPage({ data }) {
	const router = useRouter();
	const active =
		typeof router.query['active'] !== 'undefined' ? router.query['active'] : '1';
	const [activeTab, setActiveTab] = useState(active);
	const [searchKey, setSearchKey] = useState('');

	let renderData = data;

	switch (activeTab) {
		case PENDING_TAB:
			renderData = data.filter(
				(booking) => booking.status === BOOKING_STATUS.PENDING
			);
			break;
		case COMPLETE_TAB:
			renderData = data.filter(
				(booking) => booking.status === BOOKING_STATUS.COMPLETED
			);
			break;
		case CANCELLED_TAB:
			renderData = data.filter(
				(booking) => booking.status === BOOKING_STATUS.CANCELLED
			);
			break;
	}

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

	return (
		<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
			<div className="mx-auto ring-1 ring-black ring-opacity-5 bg-white">
				<div className="flex flex-row w-0 min-w-full">
					<ul className="list-none grid col-span-4 grid-flow-col place-items-center overflow-x-auto w-0 min-w-full -mb-10 pb-10">
						<li
							className={`text-center  cursor-pointer ${
								activeTab === ALL_TAB
									? 'border-b-2 border-solid border-indigo-500'
									: ''
							}`}
						>
							<a
								onClick={() => {
									toggle(ALL_TAB);
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
							>
								Tất cả
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === PENDING_TAB
									? 'border-b-2 border-solid border-indigo-500'
									: ''
							}`}
						>
							<a
								onClick={() => {
									toggle(PENDING_TAB);
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
							>
								Đang thực hiện
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === COMPLETE_TAB
									? 'border-b-2 border-solid border-indigo-500'
									: ''
							}`}
						>
							<a
								href="#"
								onClick={() => {
									toggle(COMPLETE_TAB);
								}}
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
							>
								Hoàn thành
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === CANCELLED_TAB
									? 'border-b-2 border-solid border-indigo-500'
									: ''
							}`}
						>
							<a
								href="#"
								onClick={() => {
									toggle(CANCELLED_TAB);
								}}
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
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
						placeholder="Bạn có thể tìm theo tên hình xăm, tên khách hàng, hoặc ID đơn hàng"
					/>
				</div>
			</div>
			{renderData.map((booking, index) => (
				<Card key={booking.id}>
					<CardBody>
						<Link href={`/booking/${booking.id}`}>
							<div className="cursor-pointer ">
								<div className="flex justify-between mx-auto border-b border-gray-300 pb-3">
									<div className="flex gap-3 items-start">
										<div className="font-semibold">{booking.customer.firstName}</div>
									</div>
									<div>
										<div className="text-red-500">
											{stringBookingStatuses.at(booking.status)}
										</div>
									</div>
								</div>
								{booking.artTattoos.map((tattoo, tattooIndex) => (
									<div
										key={tattoo.id}
										className="py-2 flex flex-row justify-start gap-3 flex-wrap"
									>
										<div className="relative w-32 h-32">
											<Image
												layout="fill"
												src={tattoo.photo}
												alt={tattoo.id}
												className="object-contain"
											/>
										</div>
										<div className="flex-grow">
											{tattoo.bookingDetails.map(
												(bookingDetail, bookingDetailIndex) => (
													<div
														key={bookingDetail.id}
														className="flex justify-between"
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
								<div className="flex justify-end pt-3 items-start">
									<div className="text-right">
										<div>
											Ngày tạo đơn:{' '}
											<span className="text-base">
												{formatTime(booking.createdAt)}
											</span>
										</div>
										<div>
											Ngày hoàn tất:{' '}
											<span className="text-base">
												{formatTime(booking.meetingDate)}
											</span>
										</div>
										<div>
											Thành tiền:{' '}
											<span className="text-lg text-red-500">
												{formatPrice(booking.total)}
											</span>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</CardBody>
				</Card>
			))}
		</div>
	);
}

export default BookingPage;
