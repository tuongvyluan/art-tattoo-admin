import Button from 'components/Button';
import { formatPrice } from 'lib';
import { stringPlacements, stringSize } from 'lib/status';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Alert, Card, CardBody } from 'ui';

function ServicePage({ services, studioId, onReload }) {
	const [serviceList, setServiceList] = useState(services);
	const [selectedService, setSelectedService] = useState(0);

	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

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
													<div className="w-32 rounded-lg p-1 border border-gray-300">
														{service.name}
													</div>
												</td>
												<td className="px-3 py-4">
													<div className="w-32 rounded-lg p-1 border border-gray-300">
														{stringSize.at(service.size)}
													</div>
												</td>
												<td className="px-3 py-4">
													<div className="w-32 rounded-lg p-1 border border-gray-300">
														{stringPlacements.at(service.placement)}
													</div>
												</td>
												<td className="px-3 py-4">
													{service.maxPrice === 0 ? (
														<div>Miễn phí</div>
													) : (
														<div className="flex flex-wrap max-w-max mx-auto gap-2 items-center">
															<div className="w-32">
																{formatPrice(service.minPrice)}
															</div>
															<span>tới</span>
															<div className="w-32">
																{formatPrice(service.maxPrice)}
															</div>
														</div>
													)}
												</td>
												<td className="px-3 py-4 flex flex-wrap gap-2">
													<input
														type="radio"
														name="service"
														value={selectedService}
													/>
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
