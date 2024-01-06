import Button from 'components/Button';
import MoneyInput from 'components/MoneyInput';
import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { ChevronDown } from 'icons/outline';
import { extractServiceName, fetcherPost, formatPrice } from 'lib';
import { BASE_URL } from 'lib/env';
import { BOOKING_DETAIL_STATUS, stringServiceCategories } from 'lib/status';
import PropTypes from 'propTypes';
import { useState } from 'react';
import { Alert, Dropdown, DropdownMenu, DropdownToggle } from 'ui';

const AddBookingDetailModal = ({
	openModal,
	setOpenModal,
	serviceList = [],
	artistList = [],
	bookingId,
	setLoading
}) => {
	const [bookingDetail, setBookingDetail] = useState({
		bookingId: bookingId,
		serviceId: '',
		artistId: null,
		price: 0,
		status: BOOKING_DETAIL_STATUS.PENDING,
		description: ''
	});

	// Alert related vars
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

	const handleChangeDetail = (e) => {
		setBookingDetail({
			...bookingDetail,
			[e.target.name]: e.target.value
		});
	};

	const createBookingDetail = () => {
		fetcherPost(`${BASE_URL}/booking-details`, bookingDetail)
			.then(() => {
				setLoading(true);
			})
			.catch(() => {
				handleAlert(true, 'Tạo dịch vụ cho đơn hàng thất bại', '', 2);
			});
	};

	const handleCheckSubmit = () => {
		if (bookingDetail.serviceId === '') {
			handleAlert(
				true,
				'Dịch vụ không hợp lệ.',
				'Phải chọn một dịch vụ từ bảng giá.',
				2
			);
			return;
		}
		const service = serviceList.at(
			serviceList.findIndex((s) => s.id === bookingDetail.serviceId)
		);
		if (
			service.minPrice > bookingDetail.price ||
			service.maxPrice < bookingDetail.price
		) {
			handleAlert(
				true,
				'Giá tiền không hợp lệ.',
				`Giá tiền cho dịch vụ này phải nằm trong khoảng ${formatPrice(
					service.minPrice
				)} tới ${formatPrice(service.maxPrice)}`,
				2
			);
			return;
		}
		createBookingDetail();
	};

	return (
		<div className="relative">
			<MyModal
				size="7xl"
				openModal={openModal}
				setOpenModal={setOpenModal}
				title={'Thêm dịch vụ'}
				onSubmit={handleCheckSubmit}
			>
				<div className="sm:px-3 md:px-1 lg:px-10 xl:px-12 h-96 overflow-y-auto overflow-x-hidden relative">
					<Alert
						showAlert={showAlert}
						setShowAlert={setShowAlert}
						color={alertContent.isWarn}
						className="bottom-2 right-2 fixed max-w-md z-50"
					>
						<strong className="font-bold mr-1">{alertContent.title}</strong>
						<span className="block sm:inline">{alertContent.content}</span>
					</Alert>
					{
						// Select service
					}
					<div className="pt-1 mx-3">
						<h2 className="text-lg font-semibold pb-3 text-center">
							Bảng giá dịch vụ
						</h2>
						<div className="relative shadow-md sm:rounded-lg w-full overflow-x-auto">
							<table className="w-full min-w-max text-sm text-left text-gray-500 pb-20">
								<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
									<tr>
										<th
											scope="col"
											className="w-1/3 sm:px-3 sm:py-3 bg-gray-50 text-center"
										>
											Tên dịch vụ
										</th>
										<th
											scope="col"
											className="sm:px-3 sm:py-3 bg-gray-50 text-center"
										>
											Loại dịch vụ
										</th>
										<th
											scope="col"
											className="sm:px-3 sm:py-3 bg-gray-50 text-center"
										>
											Đối tượng
										</th>
										<th
											scope="col"
											className="sm:px-3 sm:py-3 bg-gray-50 text-center"
										>
											Giá
										</th>
									</tr>
								</thead>
								<tbody className="h-full">
									{serviceList.map((service, serviceIndex) => (
										<tr
											onClick={() =>
												handleChangeDetail({
													target: {
														name: 'serviceId',
														value: service.id
													}
												})
											}
											key={service.id}
											className={`bg-white border-b hover:bg-blue-50 text-black cursor-pointer ${
												service.id === bookingDetail.serviceId && 'bg-blue-50'
											}`}
										>
											<td className="sm:px-3 sm:py-4">
												<div className="text-base p-1">
													{extractServiceName(service)}
												</div>
											</td>
											<td className="sm:px-3 sm:py-4 text-base">
												{stringServiceCategories.at(service.serviceCategoryId)}
											</td>
											<td className="sm:px-3 sm:py-4 text-base">
												{service.status === 0 ? 'Mọi người' : 'Khách hàng thân thiết'}
											</td>
											<td className="sm:px-3 sm:py-4">
												{service.maxPrice === 0 ? (
													<div className="text-base ">Miễn phí</div>
												) : (
													<div className="text-base flex flex-wrap min-w-max mx-auto gap-2 items-center">
														<div>{formatPrice(service.minPrice)}</div>
														<span>tới</span>
														<div>{formatPrice(service.maxPrice)}</div>
													</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{
						// Select artist
					}
					<div className="flex flex-wrap gap-2 my-2 items-center">
						<div className="w-28">Chọn nghệ sĩ:</div>
						<Dropdown className={'relative w-44'}>
							<DropdownToggle>
								<div className="appearance-none relative block w-full px-3 py-2.5 border border-gray-600 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none">
									<div>
										{
											artistList
												?.filter((a) => a?.id === bookingDetail.artistId)
												?.at(0)?.account?.fullName
										}
									</div>
									<div className="absolute top-2 right-2">
										<ChevronDown width={16} height={16} />
									</div>
								</div>
							</DropdownToggle>
							<DropdownMenu className={'h-16 overflow-auto'}>
								{artistList.map((a, aIndex) => (
									<div
										key={a?.id}
										onClick={() =>
											handleChangeDetail({
												target: {
													name: 'artistId',
													value: a?.id
												}
											})
										}
										className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
											a?.id === bookingDetail.artistId ? 'bg-indigo-100' : ''
										}`}
									>
										{a?.account?.fullName}
									</div>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
					{
						// Set price
					}
					<div className="flex flex-wrap gap-2 my-2 items-center py-3">
						<div className="w-28">Giá tiền:</div>
						<MoneyInput
							value={bookingDetail.price}
							onAccept={(value, mask) =>
								handleChangeDetail({
									target: {
										name: 'price',
										value: value
									}
								})
							}
						/>
					</div>
					{
						// Set description
					}
					<div className="flex flex-wrap gap-2 my-2 items-center py-3">
						<div className="w-28">Ghi chú:</div>
						<div className="flex-grow">
							<MyInput
								name={'description'}
								value={bookingDetail.description}
								placeholder={'Thêm ghi chú'}
								type="text"
								onChange={handleChangeDetail}
							/>
						</div>
					</div>
				</div>
			</MyModal>
		</div>
	);
};

AddBookingDetailModal.propTypes = {
	bookingId: PropTypes.string.isRequired,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
	serviceList: PropTypes.array,
	setLoading: PropTypes.func,
	artistList: PropTypes.array
};

export default AddBookingDetailModal;
