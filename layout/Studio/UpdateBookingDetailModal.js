import MoneyInput from 'components/MoneyInput';
import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { ChevronDown } from 'icons/outline';
import { fetcherPut, formatPrice, formatTime, hasBookingMeeting } from 'lib';
import { BASE_URL } from 'lib/env';
import { stringBookingDetailStatus, stringPlacements, stringSize } from 'lib/status';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';
import { Alert, Dropdown, DropdownMenu, DropdownToggle } from 'ui';

const UpdateBookingDetailModal = ({
	artistList,
	bookingDetail,
	openModal,
	setOpenModal,
	setLoading
}) => {
	const [detail, setDetail] = useState(bookingDetail);
	const [artists, setArtists] = useState(artistList);

	useEffect(() => {
		setDetail(bookingDetail);
	}, [bookingDetail]);

	const handleChangeDetail = (e) => {
		setDetail({
			...detail,
			[e.target.name]: e.target.value
		});
	};

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

	const updateBookingDetail = () => {
		fetcherPut(`${BASE_URL}/booking-details/${bookingDetail.id}`, detail)
			.then(() => {
				setLoading(true);
			})
			.catch(() => {
				handleAlert(true, 'Cập nhật dịch vụ cho đơn hàng thất bại', '', 2);
			});
	};

	const handleCheckSubmit = () => {
		if (
			detail?.serviceMinPrice > detail.price ||
			detail?.serviceMaxPrice < detail.price
		) {
			handleAlert(
				true,
				'Giá tiền không hợp lệ.',
				`Giá tiền cho dịch vụ này phải nằm trong khoảng ${formatPrice(
					detail?.serviceMinPrice
				)} tới ${formatPrice(detail?.serviceMaxPrice)}`,
				2
			);
			return;
		}
		updateBookingDetail();
	};

	useEffect(() => {
		setArtists(artistList);
	}, [artistList]);
	return (
		<div>
			<MyModal
				size="3xl"
				title="Chỉnh sửa dịch vụ"
				openModal={openModal}
				setOpenModal={setOpenModal}
				onSubmit={handleCheckSubmit}
			>
				<div className="h-52 overflow-auto">
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
						// Tên dịch vụ
					}
					<div className="pb-3 flex flex-wrap text-base font-semibold">
						<div className="pr-1">{detail?.serviceTitle},</div>
						<div className="pr-1">{stringSize.at(detail?.serviceSize)},</div>

						{detail?.servicePlacement ? (
							<div className="pr-1">
								Vị trí xăm: {stringPlacements.at(detail?.servicePlacement)},
							</div>
						) : (
							<></>
						)}

						{detail?.serviceCategory ? (
							<div className="pr-1">{detail?.serviceCategory.name},</div>
						) : (
							<></>
						)}

						<div className="pr-1">
							{formatPrice(detail?.serviceMinPrice)} -{' '}
							{formatPrice(detail?.serviceMaxPrice)}
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
										<div className="w-40 rounded-lg p-1 border border-gray-600">
											{stringBookingDetailStatus.at(detail?.status)}
										</div>
										<div className="absolute top-2 right-2">
											<ChevronDown width={16} height={16} />
										</div>
									</DropdownToggle>
									<DropdownMenu>
										<div>
											{stringBookingDetailStatus.map((status, statusIndex) => (
												<div
													key={status}
													onClick={() =>
														handleChangeDetail({
															target: {
																name: 'status',
																value: statusIndex
															}
														})
													}
													className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
														detail?.status === statusIndex && 'bg-blue-50'
													}`}
												>
													{status}
												</div>
											))}
										</div>
									</DropdownMenu>
								</Dropdown>
							</div>
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Giá: </div>
								<div className="w-40">
									<MoneyInput
										value={detail?.price ? detail.price : 0}
										onAccept={(value, mask) => {
											handleChangeDetail({
												target: {
													name: 'price',
													value: value
												}
											});
										}}
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Phân công: </div>
								{detail?.tattooArtId !== null ? (
									<div>
										{
											artists?.filter((a) => a?.id === detail?.artistId)?.at(0)
												?.account?.fullName
										}
									</div>
								) : (
									<Dropdown className="relative h-full flex items-center">
										<DropdownToggle>
											<div className="w-40 rounded-lg p-1 border border-gray-600">
												{
													artists?.filter((a) => a?.id === detail?.artistId)?.at(0)
														?.account?.fullName
												}
											</div>
											<div className="absolute top-2 right-2">
												<ChevronDown width={16} height={16} />
											</div>
										</DropdownToggle>
										<DropdownMenu>
											<div>
												{artists?.map((artist, artistIndex) => (
													<div
														key={artist?.id}
														onClick={() =>
															handleChangeDetail({
																target: {
																	name: 'artistId',
																	value: artist?.id
																}
															})
														}
														className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
															detail?.artistId === artist?.id && 'bg-blue-50'
														}`}
													>
														{artist?.account?.fullName}
													</div>
												))}
											</div>
										</DropdownMenu>
									</Dropdown>
								)}
							</div>
						</div>
					</div>
					{
						// Description của booking details
					}
					<div className="pb-3 flex items-center gap-1 pr-3">
						<div className="w-20">Lưu ý: </div>
						<div className="flex-grow">
							<MyInput
								name="description"
								value={detail?.description}
								onChange={handleChangeDetail}
							/>
						</div>
					</div>
					{
						// Thông tin về booking meeting cho dịch vụ
					}
					<div className="flex gap-2 w-full items-center">
						<div className="flex items-start gap-1 w-full">
							<div className="w-20">Ngày hẹn:</div>
							<div className="w-max">
								{/* <input
									className="appearance-none relative block w-full text-base mb-2 px-3 py-1 border border-gray-600 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
									type="datetime-local"
									value={selectedMeetingDate}
									onChange={(e) =>
										setSelectedMeetingDate(formatDateTimeForInput(e.target.value))
									}
								/> */}
								{hasBookingMeeting(detail?.bookingMeetings) ? (
									<div>{formatTime(hasBookingMeeting(detail?.bookingMeetings))}</div>
								) : (
									<div>Chưa có ngày hẹn mới</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</MyModal>
		</div>
	);
};

UpdateBookingDetailModal.propTypes = {
	artistList: PropTypes.array.isRequired,
	bookingDetail: PropTypes.object,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
	setLoading: PropTypes.func
};

export default UpdateBookingDetailModal;
