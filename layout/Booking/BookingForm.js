import {
	Alert,
	Avatar,
	Dropdown,
	DropdownMenu,
	DropdownToggle
} from 'ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
	extractServiceName,
	fetcherPost,
	formatDate,
	formatPrice,
	formatTime,
	formatTimeForInput,
	formatTimeWithoutSecond
} from 'lib';
import { BASE_URL } from 'lib/env';
import Router from 'next/router';
import { v4 } from 'uuid';
import { stringServiceCategories } from 'lib/status';
import { BsTrash } from 'react-icons/bs';
import MyInput from 'components/MyInput';
import { ChevronDown } from 'icons/outline';
import moment from 'moment';
import { Tooltip } from 'flowbite-react';
import { cityMap } from 'lib/city';
import BookingModal from './BookingModal';
import SelectServicePage from 'layout/Studio/SelectService';

const estimeDate = [
	`Trong vòng 7 ngày tới (từ ${formatDate(moment())} tới ${formatDate(
		moment().add(7, 'days')
	)})`,
	`Trong 2 tuần kế tiếp (từ ${formatDate(moment())} tới ${formatDate(
		moment().add(14, 'days')
	)})`,
	`Trong tháng này (từ ${formatDate(moment())} tới ${formatDate(
		moment().add(1, 'months')
	)})`,
	`Trong tháng sau (từ ${formatDate(moment().add(1, 'months'))} tới ${formatDate(
		moment().add(2, 'months')
	)})`,
	'Lúc nào cũng được',
	'Hôm nay ' + formatDate(moment())
];

const BookingForm = ({ studio, customerId, openModal, setOpenModal }) => {
	const [serviceList, setServiceList] = useState(studio.services);
	const [description, setDescription] = useState('');
	const [time, setTime] = useState(5);
	const [estimateTime, setEstimateTime] = useState(formatTimeForInput(moment()));
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const [selectedServices, setSelectedServices] = useState(new Map());
	const [bookingDetails, setBookingDetails] = useState([]);
	const [artists, setArtists] = useState(
		[
			{
				id: null,
				account: {
					fullName: 'Nghệ sĩ bất kỳ'
				}
			}
		].concat(studio.artists)
	);

	const handleSelectChange = (isIncrease, service) => {
		if (isIncrease) {
			setMinPrice((prev) => prev + service.minPrice);
			setMaxPrice((prev) => prev + service.maxPrice);
			handleAddBookingDetail(service);
		} else {
			setMinPrice((prev) => prev - service.minPrice);
			setMaxPrice((prev) => prev - service.maxPrice);
		}
		selectedServices.set(service.id, service.quantity);
	};

	const handleAddBookingDetail = (service) => {
		const id = v4();
		const detail = {
			id: id,
			service: service,
			serviceId: service.id,
			description: '',
			artistId: null
		};
		const details = [...bookingDetails];
		details.push(detail);
		setBookingDetails(details);
	};

	const handleRemoveBookingDetail = (index) => {
		const details = [...bookingDetails];
		const service = details.at(index).service;
		handleSelectChange(false, service);
		const services = [...serviceList];
		const serviceIndex = services.findIndex((s) => s.id === service.id);
		services[serviceIndex] = {
			...service,
			quantity: services[serviceIndex].quantity - 1
		};
		setServiceList(services);
		details.splice(index, 1);
		setBookingDetails(details);
	};

	const handleChangeBookingDetail = (index, name, value) => {
		console.log(value);
		const detail = {
			...bookingDetails[index],
			[name]: value
		};
		bookingDetails[index] = detail;
		setBookingDetails([...bookingDetails]);
	};

	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: 'blue'
	});

	const handleAlert = (state, title, content, isWarn = 0) => {
		setShowAlert((prev) => state);
		let color;
		switch (isWarn) {
			case 1:
				color = 'green';
				break;
			case 2:
				color = 'red';
				break;
			default:
				color = 'blue';
				break;
		}
		setAlertContent({
			title: title,
			content: content,
			isWarn: color
		});
	};
	const handleSubmit = () => {
		handleAlert(true, 'Đang đặt hẹn', '', 0);
		let newDescription = `Thời gian hẹn dự tính: ${estimeDate.at(
			time
		)}, lúc ${formatTimeWithoutSecond(estimateTime)}. ${description}`;
		fetcherPost(`${BASE_URL}/customers/CreateBookingWithServices`, {
			studioId: studio.id,
			customerId: customerId,
			description: newDescription,
			bookingDetails: bookingDetails
		})
			.then((data) => {
				handleAlert(true, 'Đặt hẹn thành công', '', 1);
				Router.replace('/booking/' + data.id);
			})
			.catch((e) => {
				handleAlert(true, 'Đặt hẹn thất bại', '', 2);
			});
	};

	return (
		<div className="relative">
			<BookingModal
				canConfirm={true}
				onSubmit={handleSubmit}
				confirmTitle={'Xác nhận'}
				size={'7xl'}
				openModal={openModal}
				setOpenModal={setOpenModal}
			>
				<div className="h-96 w-full min-w-min overflow-auto relative">
					<Alert
						showAlert={showAlert}
						setShowAlert={setShowAlert}
						color={alertContent.isWarn}
						className="bottom-2 right-2 fixed max-w-md z-50"
					>
						<strong className="font-bold mr-1">{alertContent.title}</strong>
						<span className="block sm:inline">{alertContent.content}</span>
					</Alert>
					{/* <!-- Hiển thị tên studio --> */}
					<div className="flex bg-white flex-row w-0 min-w-full">
						<div className="flex justify-between items-center py-4 pr-2">
							<div className="flex items-center">
								<div>
									<Avatar
										size={70}
										src={studio.avatar ? studio.avatar : '/images/ATL.png'}
										alt={`avatar`}
									/>
								</div>
								<div className="">
									<div className="sm:inline-block text-base ml-2">
										<p className="font-bold">{studio.name}</p>
										<p className="text-sm">
											{studio.address}, {cityMap.get(studio.city)}
										</p>
										<p className="text-sm">
											{formatTimeWithoutSecond(studio.openTime)} -{' '}
											{formatTimeWithoutSecond(studio.closeTime)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- Hiển thị form--> */}
					<div className=" overflow-y-auto min-w-full py-4 px-2">
						<h2 className="text-xl font-semibold mb-4">
							Chọn dịch vụ khách mong muốn:
						</h2>
						<form>
							{serviceList && (
								<div>
									<SelectServicePage
										onChange={handleSelectChange}
										services={serviceList}
									/>
								</div>
							)}

							<h2 className="text-lg font-semibold mb-2">Chi tiết yêu cầu</h2>
							<div className="mb-4 mr-4">
								{bookingDetails.map((detail, detailIndex) => (
									<div key={detail.id} className="pt-3">
										<div className="text-lg">
											{detailIndex + 1}. {extractServiceName(detail.service)} -{' '}
											{stringServiceCategories.at(detail.service.serviceCategoryId)}
										</div>
										<div className="flex flex-wrap gap-2 my-2 items-center">
											<div>Nghệ sĩ xăm mong muốn:</div>
											<Dropdown className={'relative w-44'}>
												<DropdownToggle>
													<div className="appearance-none relative block w-full px-3 py-2.5 border border-gray-600 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none">
														<div>
															{
																artists.filter((a) => a.id === detail.artistId).at(0)
																	.account.fullName
															}
														</div>
														<div className="absolute top-2 right-2">
															<ChevronDown width={16} height={16} />
														</div>
													</div>
												</DropdownToggle>
												<DropdownMenu>
													{artists.map((a, aIndex) => (
														<div
															role="button"
															key={a.id}
															onClick={() =>
																handleChangeBookingDetail(
																	detailIndex,
																	'artistId',
																	a.id
																)
															}
															className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
																a.id === detail.artistId ? 'bg-indigo-100' : ''
															}`}
														>
															{a.account.fullName}
														</div>
													))}
												</DropdownMenu>
											</Dropdown>
										</div>
										<div className="flex justify-between items-center gap-2">
											<MyInput
												name="description"
												placeholder="Ghi chú mong muốn cho dịch vụ này"
												value={detail.description}
												onChange={(e) =>
													handleChangeBookingDetail(
														detailIndex,
														'description',
														e.target.value
													)
												}
											/>
											<Tooltip content="Xoá dịch vụ">
												<div
													role="button"
													className="cursor-pointer"
													onClick={() => handleRemoveBookingDetail(detailIndex)}
												>
													<BsTrash size={25} />
												</div>
											</Tooltip>
										</div>
									</div>
								))}
							</div>

							<h2 className="text-lg font-semibold mt-5 mb-4 border-t-2 border-gray-300 pt-5">
								Khách hàng có thể đến tiệm xăm vào lúc?
							</h2>
							<div className="flex flex-wrap items-center gap-2 mb-4">
								<div>
									<Dropdown className={'relative'}>
										<DropdownToggle className={'relative'}>
											<div
												className={
													'appearance-none relative block w-full min-w-md pl-1 pr-7 py-2.5 border border-gray-600 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none'
												}
											>
												{estimeDate.at(time)}
											</div>
											<div className="absolute top-2.5 right-2">
												<ChevronDown width={16} height={16} />
											</div>
										</DropdownToggle>
										<DropdownMenu className={'max-h-24 overflow-auto'}>
											<div>
												{estimeDate.map((date, index) => (
													<div
														role="button"
														className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
															index === time && 'bg-blue-50'
														}`}
														onClick={() => setTime(index)}
														key={date}
														value={index}
													>
														{date}
													</div>
												))}
											</div>
										</DropdownMenu>
									</Dropdown>
								</div>
								<div className="flex items-center gap-2">
									<div>Vào lúc</div>
									<div>
										<input
											type="time"
											className="bg-gray-50 border border-gray-600 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											min={studio.openTime}
											max={studio.closeTime}
											step={1}
											value={estimateTime}
											onChange={(e) => setEstimateTime(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="mt-3 mb-10">
								Giá dịch vụ ước tính:{' '}
								{maxPrice > 0 && (
									<span className="text-lg">
										{formatPrice(minPrice)} - {formatPrice(maxPrice)}
									</span>
								)}
							</div>
						</form>
					</div>
				</div>
			</BookingModal>
		</div>
	);
};

BookingForm.propTypes = {
	studio: PropTypes.object,
	customerId: PropTypes.string,
	openModal: PropTypes.bool,
	setOpenModal: PropTypes.func
};
export default BookingForm;
