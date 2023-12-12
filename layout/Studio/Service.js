import Button from 'components/Button';
import MoneyInput from 'components/MoneyInput';
import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { Badge, Tooltip } from 'flowbite-react';
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

const sortServiceByCategory = (a, b) => {
	return a.status * 10 - b.status * 10 + b.serviceCategoryId - a.serviceCategoryId;
};

const filterDuplicate = (newService, oldService) => {
	return (
		newService.status === oldService.status &&
		newService.serviceCategoryId === oldService.serviceCategoryId &&
		newService.size === oldService.size &&
		newService.placement === oldService.placement
	);
};

const getServiceStatusColor = (status) => {
	if (status === 0) {
		return 'success';
	}
	if (status === 1) {
		return 'warning';
	}
	return 'failure';
};

const getServiceStatusString = (status) => {
	if (status === 0) {
		return 'Mọi người';
	}
	if (status === 1) {
		return 'Khách hàng cũ';
	}
	return 'Không ai cả (đã xoá)';
};

function ServicePage({ services, studioId, onReload }) {
	const [serviceList, setServiceList] = useState(
		JSON.parse(JSON.stringify(services.sort(sortServiceByCategory)))
	);
	const [duplicateList, setDuplicateList] = useState([]);

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

	const checkCreate = () => {
		const duplicateList = serviceList.filter((service) =>
			filterDuplicate(currentService, service)
		);
		if (duplicateList.length > 0) {
			setDuplicateList(duplicateList);
			return true;
		}
		return false;
	};

	const createUpdate = () => {
		if (
			typeof currentService.title !== 'string' ||
			currentService.title.trim().length === 0
		) {
			handleAlert(true, 'Dịch vụ không hợp lệ.', 'Phải có tên dịch vụ', 2);
			return;
		}
		if (currentService.minPrice > currentService.maxPrice) {
			handleAlert(
				true,
				'Dịch vụ không hợp lệ.',
				`Khoảng giá dịch vụ không hợp lệ do ${formatPrice(
					currentService.minPrice
				)} lớn hơn ${formatPrice(currentService.maxPrice)}`,
				2
			);
			return;
		}
		if (currentService.id === '') {
			if (duplicateList.length > 0 || !checkCreate()) {
				addService();
			}
		} else {
			updateService(currentService.id);
		}
	};

	const handleUpdateDuplicate = (oldServiceId) => {
		setCurrentService({
			...currentService,
			id: oldServiceId
		});
		updateService(oldServiceId);
	};

	const updateService = (id) => {
		handleAlert(true, 'Đang sửa dịch vụ', '', 0);
		fetcherPut(`${BASE_URL}/studios/${studioId}/services/${id}`, {
			...currentService,
			id: id
		}).then(() => {
			onReload();
		});
		setOpenAddModal(false);
	};

	const resetCurrentService = () => {
		setDuplicateList([]);
		setCurrentService({
			id: '',
			studioId: studioId,
			title: 'Xăm',
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
		setDuplicateList([]);
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
		setDuplicateList([]);
		setCurrentService({
			id: service.id,
			studioId: studioId,
			title: service.title,
			serviceCategoryId: service.serviceCategoryId,
			size: service.size,
			placement: service.placement,
			status: service.status,
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
				onSubmit={createUpdate}
				size={duplicateList.length > 0 ? '3xl' : 'xl'}
			>
				<div>
					<Alert
						showAlert={showAlert}
						setShowAlert={setShowAlert}
						color={alertContent.isWarn}
						className="bottom-2 right-2 fixed max-w-md z-50"
					>
						<strong className="font-bold mr-1">{alertContent.title}</strong>
						<span className="block sm:inline">{alertContent.content}</span>
					</Alert>
					<form className="max-h-96 overflow-auto">
						{
							// Update currentService
						}
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
										required={true}
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
										<div className="w-48 rounded-lg px-3 py-1 border border-gray-600">
											{stringServiceCategories.at(currentService.serviceCategoryId)}
										</div>
										<div className="absolute top-2 right-2">
											<ChevronDown width={16} height={16} />
										</div>
									</DropdownToggle>
									<DropdownMenu className={'h-24 overflow-auto w-40'}>
										<div className="w-44">
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
														currentService.category === cateIndex
															? 'bg-indigo-100'
															: ''
													}`}
												>
													{cate}
												</div>
											))}
										</div>
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
										<div className="w-48 rounded-lg px-3 py-1 border border-gray-600">
											{stringSize.at(currentService.size)}
										</div>
										<div className="absolute top-2 right-2">
											<ChevronDown width={16} height={16} />
										</div>
									</DropdownToggle>
									<DropdownMenu className={'h-24 overflow-auto w-40'}>
										<div className="w-44">
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
										</div>
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
										<div className="w-48 rounded-lg px-3 py-1 border border-gray-600">
											{stringPlacements.at(currentService.placement)}
										</div>
										<div className="absolute top-2 right-2">
											<ChevronDown width={16} height={16} />
										</div>
									</DropdownToggle>
									<DropdownMenu className={'h-24 overflow-auto w-40'}>
										<div className="w-44">
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
										</div>
									</DropdownMenu>
								</Dropdown>
							</div>
							<div className="mb-3 flex items-center">
								<div className="w-32">Đối tượng</div>
								<Dropdown className="relative">
									<DropdownToggle>
										<div className="w-48 rounded-lg px-3 py-1 border border-gray-600">
											{getServiceStatusString(currentService.status)}
										</div>
										<div className="absolute top-2 right-2">
											<ChevronDown width={16} height={16} />
										</div>
									</DropdownToggle>
									<DropdownMenu className={'h-16 overflow-auto'}>
										<div className="w-44">
											<div
												onClick={() =>
													handleChangeService({
														target: {
															name: 'status',
															value: 0
														}
													})
												}
												className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
													currentService.status === 0 ? 'bg-indigo-100' : ''
												}`}
											>
												Mọi người
											</div>
											<div
												onClick={() =>
													handleChangeService({
														target: {
															name: 'status',
															value: 1
														}
													})
												}
												className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
													currentService.status === 1 ? 'bg-indigo-100' : ''
												}`}
											>
												Khách hàng cũ
											</div>
											<div
												onClick={() =>
													handleChangeService({
														target: {
															name: 'status',
															value: 2
														}
													})
												}
												className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
													currentService.status === 2 ? 'bg-indigo-100' : ''
												}`}
											>
												Không ai cả
											</div>
										</div>
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
						{
							// View duplicate list
							currentService.id === '' && duplicateList.length > 0 && (
								<div>
									Bạn đã có những dịch vụ này với loại dịch vụ là{' '}
									<span className="font-semibold">
										{stringServiceCategories.at(currentService.serviceCategoryId)}
									</span>
									, kích thước{' '}
									<span className="font-semibold">
										{stringSize.at(currentService.size)}
									</span>
									, vị trí xăm{' '}
									<span className="font-semibold">
										{stringPlacements.at(currentService.placement)}
									</span>{' '}
									và dành cho{' '}
									<span className="font-semibold">
										{currentService.status === 0 ? 'Mọi người' : 'Khách hàng cũ'}
									</span>
									. Bạn có chắc muốn tạo thêm dịch vụ này không hay cập nhật dịch vụ
									cũ?
									<table className="mx-auto">
										<thead>
											<tr>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Tên dịch vụ
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Giá
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50"></th>
											</tr>
										</thead>
										<tbody>
											{duplicateList.map((service) => (
												<tr className="bg-blue-50" key={service.id}>
													<td className="px-3 py-4">
														<div>{service.title}</div>
													</td>
													<td className="px-3 py-4">
														<div>
															{formatPrice(service.minPrice)} -{' '}
															{formatPrice(service.maxPrice)}
														</div>
													</td>
													<td>
														<div className="max-w-max px-2">
															<Button
																onClick={() => handleUpdateDuplicate(service.id)}
															>
																Cập nhật
															</Button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)
						}
					</form>
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
								<div>
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
													<th scope="col" className="px-3 py-3 bg-gray-50">
														Đối tượng áp dụng
													</th>
													<th scope="col" className="px-3 py-3 bg-gray-50"></th>
												</tr>
											</thead>
											<tbody className="h-full">
												{serviceList.map((service, serviceIndex) => (
													<tr
														key={service.id}
														className={`bg-white border-b hover:bg-gray-50 text-black ${
															service.status === SERVICE_STATUS.DELETED
																? 'bg-gray-200 opacity-40'
																: ''
														}`}
													>
														<td className="px-3 py-4">
															<div>{service.title} </div>
														</td>
														<td className="px-3 py-4">
															<div>
																{stringServiceCategories.at(
																	service.serviceCategoryId
																)}
															</div>
														</td>
														<td className="px-3 py-4">
															{stringSize.at(service.size)}
														</td>
														<td className="px-3 py-4">
															{stringPlacements.at(service.placement)}
														</td>
														<td className="px-3 py-4">
															{service.maxPrice === 0 ? (
																<div>Miễn phí</div>
															) : (
																<div className="text-base flex flex-wrap min-w-max mx-auto gap-2 items-center">
																	<div>{formatPrice(service.minPrice)}</div>
																	<span>tới</span>
																	<div>{formatPrice(service.maxPrice)}</div>
																</div>
															)}
														</td>
														<td className="px-3 py-4">
															<div className="flex">
																<Badge color={getServiceStatusColor(service.status)}>
																	{getServiceStatusString(service.status)}
																</Badge>
															</div>
														</td>
														<td className="px-3 py-4 flex flex-wrap gap-1">
															<Tooltip content="Sửa dịch vụ" placement="top-end">
																<div
																	onClick={() => handleOpenUpdateModal(service)}
																	className="cursor-pointer"
																>
																	<Pencil width={25} height={25} />
																</div>
															</Tooltip>
															{service.status !== SERVICE_STATUS.DELETED && (
																<Tooltip content="Xoá dịch vụ" placement="top-end">
																	<div
																		onClick={() => handleOpenRemoveModal(service)}
																		className="cursor-pointer"
																	>
																		<BsTrash size={25} />
																	</div>
																</Tooltip>
															)}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
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
