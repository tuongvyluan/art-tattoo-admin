import PropTypes from 'prop-types';
import { stringPlacements, stringServiceStatus, stringSize } from 'lib/status';
import { formatDateTimeForInput, formatPrice, formatTime } from 'lib';
import { Avatar, Card, Dropdown, DropdownMenu, DropdownToggle } from 'ui';
import { MdEdit, MdOutlineCalendarMonth, MdOutlineClose } from 'react-icons/md';
import MyModal from 'components/MyModal';
import { useState } from 'react';
import MoneyInput from 'components/MoneyInput';

const CustomerServices = ({ services, canEdit = false }) => {
	const [bookingServiceModal, setBookingServiceModal] = useState(false);
	const [selectedService, setSelectedService] = useState(undefined);
	const [selectedMeetingDate, setSelectedMeetingDate] = useState(
		formatDateTimeForInput(new Date())
	);

	const onSelectUpdatedService = (serviceIndex) => {
		setSelectedService(services.at(serviceIndex));
		setBookingServiceModal(true);
	};

	return (
		<div className="relative">
			<MyModal
				size="2xl"
				title="Chỉnh sửa dịch vụ"
				openModal={bookingServiceModal}
				setOpenModal={setBookingServiceModal}
			>
				<div className="h-52">
					{
						// Tên dịch vụ
					}
					<div className="pb-3 flex flex-wrap text-xl font-semibold">
						<div className="pr-1">{stringSize.at(selectedService?.size)},</div>

						{selectedService?.placement ? (
							<div className="pr-1">
								Vị trí xăm: {stringPlacements.at(selectedService?.placement)},
							</div>
						) : (
							<></>
						)}

						<div className="pr-1">
							{formatPrice(selectedService?.minPrice)} -{' '}
							{formatPrice(selectedService?.maxPrice)}
						</div>
					</div>
					{
						// Thông tin cơ bản của dịch vụ
					}
					<div className="flex gap-8 w-full">
						<div className="">
							{
								// Trạng thái
							}
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Trạng thái: </div>
								<Dropdown className="relative h-full flex items-center">
									<DropdownToggle>
										<div className="w-40 rounded-lg p-1 border border-gray-300">
											{stringServiceStatus.at(0)}
										</div>
									</DropdownToggle>
									<DropdownMenu>
										{stringServiceStatus.map((status, statusIndex) => (
											<div
												key={status}
												// onClick={() => setTattooState('size', statusIndex)}
												className={`px-2 py-1 cursor-pointer hover:bg-gray-100`}
											>
												{status}
											</div>
										))}
									</DropdownMenu>
								</Dropdown>
							</div>
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Giá: </div>
								<div className="w-40">
									<MoneyInput
										value={1000000}
										onAccept={(value, mask) => {
											return value;
										}}
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Phân công: </div>
								<Dropdown className="relative h-full flex items-center">
									<DropdownToggle>
										<div className="w-40 rounded-lg p-1 border border-gray-300">
											Chưa phân công
										</div>
									</DropdownToggle>
									<DropdownMenu>
										{stringServiceStatus.map((status, statusIndex) => (
											<div
												key={status}
												// onClick={() => setTattooState('size', statusIndex)}
												className={`px-2 py-1 cursor-pointer hover:bg-gray-100`}
											>
												{status}
											</div>
										))}
									</DropdownMenu>
								</Dropdown>
							</div>
							<div className="pb-3 flex items-center gap-1">
								<input type="checkbox" />
								<div>Tạo hình xăm</div>
							</div>
						</div>
					</div>
					{
						// Thông tin về booking meeting cho dịch vụ
					}
					<div className="flex gap-2 w-full items-center">
						<div className="flex items-start gap-1 w-full">
							<div className="w-20">Ngày hẹn:</div>
							<div className="w-min">
								<input
									className="appearance-none relative block w-full text-base mb-2 px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
									type="datetime-local"
									value={selectedMeetingDate}
									onChange={(e) =>
										setSelectedMeetingDate(formatDateTimeForInput(e.target.value))
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</MyModal>
			<div className="block">
				{services.map((service, serviceIndex) => (
					<Card className={'shadow-lg'} key={service.id}>
						<div className="w-full flex justify-start gap-2 items-start bg-gray-50 py-5 relative">
							{canEdit && (
								<div className="absolute top-4 right-4 cursor-pointer flex flex-wrap gap-2">
									<div
										onClick={() => onSelectUpdatedService(serviceIndex)}
										className="relative"
									>
										<MdEdit size={20} />
									</div>
									<div className="relative">
										<MdOutlineClose size={20} />
									</div>
								</div>
							)}
							{
								// Phần hình xăm của booking service
							}
							<div className="flex justify-start gap-2 items-center bg-gray-50 pl-5">
								<div>
									{/* <Link
										href=""
										// href={`/tattoo/${tattoo.id}?booking=${data.id}`}
									>
										<div className="cursor-pointer flex justify-start gap-3 flex-wrap">
											<div className="relative w-24 h-24">
												<Image
													layout="fill"
													src={
														// tattoo.thumbnail
														// 	? tattoo.thumbnail
														// 	:
														'/images/ATL.png'
													}
													alt={'a'}
													className="object-contain rounded-2xl"
												/>
											</div>
										</div>
									</Link> */}
									<div className="border border-black rounded-xl w-24 h-24 cursor-default">
										<div className="px-2 py-7 text-center">Không có hình xăm</div>
									</div>
								</div>
							</div>
							{
								// Phần bên phải của khung booking service
							}
							<div className="px-3 w-full">
								<div key={service.id} className="pb-1 flex flex-wrap text-base">
									<div>{serviceIndex + 1}</div>
									<div className="pr-1">. {stringSize.at(service.size)},</div>

									{service.placement ? (
										<div className="pr-1">
											Vị trí xăm: {stringPlacements.at(service.placement)},
										</div>
									) : (
										<></>
									)}

									<div className="pr-1">
										{formatPrice(service.minPrice)} - {formatPrice(service.maxPrice)}
									</div>
								</div>
								<div className="flex flex-wrap gap-3 items-center ">
									{
										// Giá tiền
									}
									<div className="flex flex-wrap items-center text-base font-semibold bg-teal-300 px-2 rounded-full">
										<div>{formatPrice(2000000)}</div>
									</div>
									{
										// Ngày hẹn
									}
									<div className="flex flex-wrap gap-1 items-center text-base font-semibold bg-indigo-100 px-2 rounded-full">
										<MdOutlineCalendarMonth size={20} />
										<div>{formatTime(new Date())}</div>
									</div>
									{
										// Trạng thái
									}
									<div className="flex flex-wrap gap-1 items-center text-base font-semibold bg-yellow-300 px-2 rounded-full">
										<div>Đang thực hiện</div>
									</div>
								</div>
								{
									// Assign artist
								}
								<div className="flex flex-wrap gap-1 items-center text-base font-semibold pt-3">
									<Avatar size={40} src={'/public/images/ATL.png'} />
									<div>Lê Bảo Trâm</div>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

CustomerServices.propTypes = {
	services: PropTypes.array,
	canEdit: PropTypes.bool
};

export default CustomerServices;
