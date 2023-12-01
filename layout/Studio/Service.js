import Button from 'components/Button';
import MoneyInput from 'components/MoneyInput';
import MyInput from 'components/MyInput';
import { Tooltip } from 'flowbite-react';
import { stringPlacements, stringSize } from 'lib/status';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { Alert, Card, CardBody, Dropdown, DropdownMenu, DropdownToggle } from 'ui';
import { v4 } from 'uuid';

function ServicePage({ services, studioId, onReload }) {
	const [serviceList, setServiceList] = useState(services);

	const length = serviceList.length;

	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

	const setServiceField = (name, value, index) => {
		const services = [...serviceList];
		services[index][name] = value;
		setServiceList(services);
	};

	const removeService = (serviceIndex) => {
		const services = [...serviceList];
		services.splice(serviceIndex, 1);
		setServiceList(services);
	};

	const addService = (serviceIndex) => {
		const services = [...serviceList];
		const service = {
			id: v4(),
			name: '',
			size: 0,
			placement: 0,
			minPrice: 0,
			maxPrice: 0
		};
		services.splice(serviceIndex, 0, service);
		setServiceList(services);
	};

	const handleAlert = (state, title, content, isWarn = false) => {
		setShowAlert((prev) => state);
		setAlertContent({
			title: title,
			content: content,
			isWarn: isWarn
		});
	};

	const handleSubmit = () => {
		handleAlert(true, 'Đang cập nhật bảng giá', '');
	};

	return (
		<div className="relative">
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn ? 'red' : 'blue'}
				className="bottom-2 right-2 fixed max-w-md z-50"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<div className="sm:px-3 md:px-1 lg:px-10 xl:px-12">
				<div className="flex justify-end pb-3 ">
					<div className="flex gap-2 items-center">
						<div className="w-16">
							<Button onClick={handleSubmit}>Lưu</Button>
						</div>
					</div>
				</div>
				<Card>
					<CardBody>
						<div className="pt-1">
							<h2 className="text-lg font-semibold pb-3 text-center">
								Bảng giá dịch vụ
							</h2>
							<div className="relative shadow-md sm:rounded-lg">
								<table className="w-full text-sm text-left text-gray-500 pb-20">
									<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
										<tr>
											<th
												scope="col"
												className="w-1/4 px-3 py-3 bg-gray-50 text-center"
											>
												Tên dịch vụ
											</th>
											<th
												scope="col"
												className="w-32 px-3 py-3 bg-gray-50 text-center"
											>
												Kích thước
											</th>
											<th
												scope="col"
												className="w-32 px-3 py-3 bg-gray-50 text-center"
											>
												Vị trí xăm
											</th>
											<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
												Giá
											</th>
											<th
												scope="col"
												className="px-3 py-3 bg-gray-50 text-center"
											></th>
										</tr>
									</thead>
									<tbody className="h-full">
										{serviceList.map((service, serviceIndex) => (
											<tr
												key={service.id}
												className="bg-white border-b hover:bg-gray-50 text-black"
											>
												<td className="px-3 py-4">
													<MyInput
														name={'name'}
														value={service.name}
														onChange={(e) =>
															setServiceField('name', e.target.value, serviceIndex)
														}
													/>
												</td>
												<td className="px-3 py-4">
													<Dropdown className="relative flex items-center">
														<DropdownToggle>
															<div className="w-32 rounded-lg p-1 border border-gray-300">
																{stringSize.at(service.size)}
															</div>
														</DropdownToggle>
														<DropdownMenu isBottom={serviceIndex >= length - 3}>
															{stringSize.map((size, sizeIndex) => (
																<div
																	key={size}
																	onClick={() =>
																		setServiceField('size', sizeIndex, serviceIndex)
																	}
																	className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
																		service.size === sizeIndex ? 'bg-indigo-100' : ''
																	}`}
																>
																	{size}
																</div>
															))}
														</DropdownMenu>
													</Dropdown>
												</td>
												<td className="px-3 py-4">
													<Dropdown className="relative flex items-center">
														<DropdownToggle>
															<div className="w-32 rounded-lg p-1 border border-gray-300">
																{stringPlacements.at(service.placement)}
															</div>
														</DropdownToggle>
														<DropdownMenu
															isBottom={serviceIndex >= length - 3}
															className={'max-h-28 overflow-y-auto'}
														>
															{stringPlacements.map((placement, placementIndex) => (
																<div
																	key={placement}
																	onClick={() =>
																		setServiceField(
																			'size',
																			placementIndex,
																			serviceIndex
																		)
																	}
																	className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
																		service.placement === placementIndex
																			? 'bg-indigo-100'
																			: ''
																	}`}
																>
																	{placement}
																</div>
															))}
														</DropdownMenu>
													</Dropdown>
												</td>
												<td className="px-3 py-4">
													<div className="flex flex-wrap max-w-max mx-auto gap-2 items-center">
														<div className="w-32">
															<MoneyInput
																name="minPrice"
																value={service.minPrice}
																onAccept={(value, mask) =>
																	setServiceField('minPrice', value, serviceIndex)
																}
															/>
														</div>
														<span>tới</span>
														<div className="w-32">
															<MoneyInput
																name="minPrice"
																value={service.minPrice}
																onAccept={(value, mask) =>
																	setServiceField('maxPrice', value, serviceIndex)
																}
															/>
														</div>
													</div>
												</td>
												<td className="px-3 py-4 flex flex-wrap gap-2">
													<Tooltip content="Xoá dịch vụ" placement="bottom-end">
														<div
															onClick={() => removeService(serviceIndex)}
															className="cursor-pointer"
														>
															<BsTrash size={25} />
														</div>
													</Tooltip>
													<Tooltip content="Thêm dịch vụ" placement="bottom-end">
														<div
															onClick={() => addService(serviceIndex)}
															className="cursor-pointer"
														>
															<MdAdd size={25} />
														</div>
													</Tooltip>
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
		</div>
	);
}

ServicePage.propTypes = {
	services: PropTypes.array.isRequired,
	studioId: PropTypes.string.isRequired,
	onReload: PropTypes.func
};

export default ServicePage;
