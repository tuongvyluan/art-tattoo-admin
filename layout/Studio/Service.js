import Button from 'components/Button';
import MoneyInput from 'components/MoneyInput';
import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { Tooltip } from 'flowbite-react';
import { ChevronDown, Pencil } from 'icons/outline';
import { fetcherDelete, fetcherPost, fetcherPut, formatPrice } from 'lib';
import { BASE_URL } from 'lib/env';
import {
	SERVICE_PLACEMENT,
	SERVICE_SIZE,
	SERVICE_STATUS,
	stringPlacements,
	stringServiceCategories,
	stringSize
} from 'lib/status';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { Alert, Card, CardBody, Dropdown, DropdownMenu, DropdownToggle } from 'ui';

const sortServiceByCategory = (a, b) => b.serviceCategoryId - a.serviceCategoryId;

function ServicePage({ services, studioId, onReload }) {
	const [serviceList, setServiceList] = useState(
		JSON.parse(JSON.stringify(services.sort(sortServiceByCategory)))
	);

	const length = serviceList.length;

	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

	const [currentService, setCurrentService] = useState({
		id: '',
		studioId: studioId,
		title: '',
		size: SERVICE_SIZE.ANY,
		placement: SERVICE_PLACEMENT.ANY,
		serviceCategoryId: 0,
		status: 0,
		minPrice: 0,
		maxPrice: 0
	});

	const [openAddModal, setOpenAddModal] = useState(false);
	const [openRemoveModal, setOpenRemoveModal] = useState(false);

	const setServiceField = (name, value, index) => {
		const services = [...serviceList];
		services[index][name] = value;
		setServiceList(services);
	};

	const removeService = (serviceId) => {
		fetcherDelete(
			`${BASE_URL}/studios/${studioId}/services/${currentService.id}`
		).then(() => {
			onReload();
		});
		handleAlert(true, 'Đang xoá dịch vụ', '', 0);
		setOpenRemoveModal(false);
	};

	const addService = () => {
		if (currentService.minPrice > currentService.maxPrice) {
			handleAlert(true, 'Giá dịch vụ không hợp lệ', 'Giá phải từ nhỏ đến lớn', 2);
		} else {
			fetcherPost(`${BASE_URL}/studios/${studioId}/services`, currentService).then(
				() => {
					onReload();
				}
			);
		}
		handleAlert(true, 'Đang tạo dịch vụ', '', 0);
		setOpenAddModal(false);
	};

	const updateService = () => {
		if (currentService.minPrice > currentService.maxPrice) {
			handleAlert(true, 'Giá dịch vụ không hợp lệ', 'Giá phải từ nhỏ đến lớn', 2);
		} else {
			fetcherPut(
				`${BASE_URL}/studios/${studioId}/services/${currentService.id}`,
				currentService
			).then(() => {
				onReload();
			});
		}
		handleAlert(true, 'Đang sửa dịch vụ', '', 0);
		setOpenAddModal(false);
	};

	const resetCurrentService = () => {
		setCurrentService({
			id: '',
			studioId: studioId,
			title: '',
			serviceCategoryId: 0,
			size: SERVICE_SIZE.ANY,
			placement: SERVICE_PLACEMENT.ANY,
			status: 0,
			minPrice: 0,
			maxPrice: 0
		});
	};

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

	const handleChangeService = (e) => {
		setCurrentService({ ...currentService, [e.target.name]: e.target.value });
	};

	const handleOpenAddModal = () => {
		resetCurrentService();
		setOpenAddModal(true);
	};

	const handleOpenUpdateModal = (service) => {
		handleSetCurrentService(service);
		setOpenAddModal(true);
	};

	const handleSetCurrentService = (service) => {
		setCurrentService({
			id: service.id,
			studioId: studioId,
			title: service.title,
			serviceCategoryId: service.serviceCategoryId,
			size: service.size,
			placement: service.placement,
			status: 0,
			minPrice: service.minPrice,
			maxPrice: service.maxPrice
		});
	};

	const handleOpenRemoveModal = (service) => {
		handleSetCurrentService(service);
		setOpenRemoveModal(true);
	};

	return (
		<div className="relative">
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
				// Modals
			}
			<MyModal
				title="Xác nhận xoá dịch vụ"
				confirmTitle={'Xoá'}
				warn={true}
				openModal={openRemoveModal}
				setOpenModal={setOpenRemoveModal}
				onSubmit={() => removeService()}
			>
				<div>
					Bạn có chắc muốn xoá dịch vụ{' '}
					{currentService.title && <span>{currentService.title + ', '}</span>}
					{stringSize.at(currentService.size) + ', '}
					{stringPlacements.at(currentService.placement) + ', '}
					{formatPrice(currentService?.minPrice)} -{' '}
					{formatPrice(currentService?.maxPrice)}?
				</div>
			</MyModal>
			<MyModal
				title={
					currentService.id !== '' ? 'Cập nhật bảng giá dịch vụ' : 'Thêm dịch vụ mới'
				}
				confirmTitle={currentService.id !== '' ? 'Sửa' : 'Tạo'}
				openModal={openAddModal}
				setOpenModal={setOpenAddModal}
				onSubmit={() => {
					if (currentService.id === '') {
						addService();
					} else {
						updateService();
					}
				}}
				size="xl"
			>
				<div>
					{
						// service title
					}
					<div className="mb-3 flex items-center">
						<div className="w-32">Tên dịch vụ</div>
						<div className="w-44">
							<MyInput
								name={'title'}
								value={currentService.title}
								onChange={handleChangeService}
							/>
						</div>
					</div>
					{
						// service category
					}
					<div className="mb-3 flex items-center">
						<div className="w-32">Loại dịch vụ</div>
						<Dropdown className="relative">
							<DropdownToggle>
								<div className="w-44 rounded-lg px-3 py-1 border border-gray-600">
									{stringServiceCategories.at(currentService.serviceCategoryId)}
								</div>
								<div className="absolute top-2 right-2">
									<ChevronDown width={16} height={16} />
								</div>
							</DropdownToggle>
							<DropdownMenu className={'h-24 overflow-auto w-40'}>
								{stringServiceCategories.map((cate, cateIndex) => (
									<div
										key={cate}
										onClick={() =>
											handleChangeService({
												target: {
													name: 'serviceCategoryId',
													value: cateIndex
												}
											})
										}
										className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
											currentService.category === cateIndex ? 'bg-indigo-100' : ''
										}`}
									>
										{cate}
									</div>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
					{
						// service size
					}
					<div className="mb-3 flex items-center">
						<label className="w-32">Kích thước</label>
						<Dropdown className="relative">
							<DropdownToggle>
								<div className="w-44 rounded-lg px-3 py-1 border border-gray-600">
									{stringSize.at(currentService.size)}
								</div>
								<div className="absolute top-2 right-2">
									<ChevronDown width={16} height={16} />
								</div>
							</DropdownToggle>
							<DropdownMenu className={'h-24 overflow-auto w-40'}>
								{stringSize.map((size, sizeIndex) => (
									<div
										key={size}
										onClick={() =>
											handleChangeService({
												target: {
													name: 'size',
													value: sizeIndex
												}
											})
										}
										className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
											currentService.size === sizeIndex ? 'bg-indigo-100' : ''
										}`}
									>
										{size}
									</div>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
					{
						// service placement
					}
					<div className="mb-3 flex items-center">
						<label className="w-32">Vị trí xăm</label>
						<Dropdown className="relative">
							<DropdownToggle>
								<div className="w-44 rounded-lg px-3 py-1 border border-gray-600">
									{stringPlacements.at(currentService.placement)}
								</div>
								<div className="absolute top-2 right-2">
									<ChevronDown width={16} height={16} />
								</div>
							</DropdownToggle>
							<DropdownMenu className={'h-24 overflow-auto w-40'}>
								{stringPlacements.map((placement, placementIndex) => (
									<div
										key={placement}
										onClick={() =>
											handleChangeService({
												target: {
													name: 'placement',
													value: placementIndex
												}
											})
										}
										className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
											currentService.placement === placementIndex
												? 'bg-indigo-100'
												: ''
										}`}
									>
										{placement}
									</div>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
					{
						// service price range
					}
					<div className="mb-10 flex items-center">
						<div className="w-32">Giá</div>
						<div className="flex flex-wrap max-w-max gap-2 items-center">
							<div className="w-32">
								<MoneyInput
									name="minPrice"
									value={currentService.minPrice}
									min={0}
									onAccept={(value, mask) =>
										handleChangeService({
											target: {
												name: 'minPrice',
												value: value
											}
										})
									}
								/>
							</div>
							<span>tới</span>
							<div className="w-32">
								<MoneyInput
									name="maxPrice"
									value={currentService.maxPrice}
									min={currentService.minPrice}
									onAccept={(value, mask) =>
										handleChangeService({
											target: {
												name: 'maxPrice',
												value: value
											}
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</MyModal>
			<div className="sm:px-3 md:px-1 lg:px-10 xl:px-12">
				<div className="flex justify-end pb-3 ">
					<div className="flex gap-2 items-center">
						<div className="w-28">
							<Button onClick={handleOpenAddModal}>
								<div className="flex flex-wrap items-center justify-center gap-1">
									<MdAdd size={20} /> Tạo thêm
								</div>
							</Button>
						</div>
					</div>
				</div>
				<Card>
					<CardBody>
						<div className="pt-1">
							<h2 className="text-lg font-semibold pb-3 text-center">
								Bảng giá dịch vụ
							</h2>
							{serviceList?.length > 0 ? (
								<div className="relative shadow-md sm:rounded-lg">
									<table className="w-full text-sm text-left text-gray-500 pb-20">
										<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
											<tr>
												<th scope="col" className="w-1/4 px-3 py-3 bg-gray-50">
													Tên dịch vụ
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Loại dịch vụ
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Kích thước
												</th>
												<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
													Vị trí xăm
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Giá
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50"></th>
											</tr>
										</thead>
										<tbody className="h-full">
											{serviceList.map((service, serviceIndex) => (
												<tr
													key={service.id}
													className={`bg-white border-b hover:bg-gray-50 text-black ${
														service.status === SERVICE_STATUS.DELETED ? 'hidden' : ''
													}`}
												>
													<td className="px-3 py-4">
														<div>{service.title}</div>
													</td>
													<td className="px-3 py-4">
														<div>
															{stringServiceCategories.at(service.serviceCategoryId)}
														</div>
													</td>
													<td className="px-3 py-4">
														{stringSize.at(service.size)}
													</td>
													<td className="px-3 py-4">
														{stringPlacements.at(service.placement)}
													</td>
													<td className="px-3 py-4">
														{formatPrice(service.minPrice)} -{' '}
														{formatPrice(service.maxPrice)}
													</td>
													<td className="px-3 py-4 flex flex-wrap gap-5">
														<Tooltip content="Sửa dịch vụ" placement="top-end">
															<div
																onClick={() => handleOpenUpdateModal(service)}
																className="cursor-pointer"
															>
																<Pencil width={25} height={25} />
															</div>
														</Tooltip>
														<Tooltip content="Xoá dịch vụ" placement="top-end">
															<div
																onClick={() => handleOpenRemoveModal(service)}
																className="cursor-pointer"
															>
																<BsTrash size={25} />
															</div>
														</Tooltip>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div>Tiệm xăm hiện không có bảng giá dịch vụ</div>
							)}
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}

ServicePage.propTypes = {
	services: PropTypes.array.isRequired,
	studioId: PropTypes.string.isRequired,
	onReload: PropTypes.func
};

export default ServicePage;
