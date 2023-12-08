import PropTypes from 'prop-types';
import {
	stringBookingDetailStatus,
	stringBookingDetailStatusColor,
	stringPlacements,
	stringSize
} from 'lib/status';
import {
	formatDateTimeForInput,
	formatPrice,
	formatTime,
	hasBookingMeeting,
	showTextMaxLength
} from 'lib';
import { Avatar, Card, Dropdown, DropdownMenu, DropdownToggle } from 'ui';
import { MdEdit, MdOutlineCalendarMonth, MdOutlineClose } from 'react-icons/md';
import MyModal from 'components/MyModal';
import { useState } from 'react';
import MoneyInput from 'components/MoneyInput';
import MyInput from 'components/MyInput';
import Link from 'next/link';
import Image from 'next/image';

const CustomerServices = ({
	bookingDetails,
	canEdit = false,
	showMore = false,
	artistList
}) => {
	const [bookingServiceModal, setBookingServiceModal] = useState(false);
	const [selectedBookingDetail, setSelectedBookingDetail] = useState(undefined);
	const [selectedArtist, setSelectedArtist] = useState(0);
	const [selectedMeetingDate, setSelectedMeetingDate] = useState(
		formatDateTimeForInput(new Date())
	);

	const onSelectUpdatedService = (detailIndex) => {
		setSelectedArtist(0);
		setSelectedBookingDetail(bookingDetails.at(detailIndex));
		setBookingServiceModal(true);
	};

	const handleChangeDetail = (e) => {
		setSelectedBookingDetail({
			...selectedBookingDetail,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="relative">
			<MyModal
				size="3xl"
				title="Chỉnh sửa dịch vụ"
				openModal={bookingServiceModal}
				setOpenModal={setBookingServiceModal}
			>
				<div className="h-52 overflow-auto">
					{
						// Tên dịch vụ
					}
					<div className="pb-3 flex flex-wrap text-base font-semibold">
						<div className="pr-1">{selectedBookingDetail?.serviceTitle},</div>
						<div className="pr-1">
							{stringSize.at(selectedBookingDetail?.serviceSize)},
						</div>

						{selectedBookingDetail?.servicePlacement ? (
							<div className="pr-1">
								Vị trí xăm:{' '}
								{stringPlacements.at(selectedBookingDetail?.servicePlacement)},
							</div>
						) : (
							<></>
						)}

						{selectedBookingDetail?.serviceCategory ? (
							<div className="pr-1">
								{selectedBookingDetail?.serviceCategory.name},
							</div>
						) : (
							<></>
						)}

						<div className="pr-1">
							{formatPrice(selectedBookingDetail?.serviceMinPrice)} -{' '}
							{formatPrice(selectedBookingDetail?.serviceMaxPrice)}
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
											{stringBookingDetailStatus.at(0)}
										</div>
									</DropdownToggle>
									<DropdownMenu>
										<div>
											{stringBookingDetailStatus.map((status, statusIndex) => (
												<div
													key={status}
													// onClick={() => setTattooState('serviceSize', statusIndex)}
													className={`px-2 py-1 cursor-pointer hover:bg-gray-100`}
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
										<div className="w-40 rounded-lg p-1 border border-gray-600">
											{artistList?.at(selectedArtist)?.fullName}
										</div>
									</DropdownToggle>
									<DropdownMenu>
										<div>
											{artistList?.map((artist, artistIndex) => (
												<div
													key={artist.id}
													// onClick={() => setTattooState('serviceSize', statusIndex)}
													className={`px-2 py-1 cursor-pointer hover:bg-gray-100`}
												>
													{artist?.fullName}
												</div>
											))}
										</div>
									</DropdownMenu>
								</Dropdown>
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
								value={selectedBookingDetail?.description}
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
								{hasBookingMeeting(selectedBookingDetail?.bookingMeetings) ? (
									<div>
										{formatTime(
											hasBookingMeeting(selectedBookingDetail?.bookingMeetings)
										)}
									</div>
								) : (
									<div>Chưa có ngày hẹn mới</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</MyModal>
			<div className="block">
				{bookingDetails.map((bookingDetail, bookingServiceIndex) => (
					<Card
						className={`shadow-lg ${
							!showMore && bookingServiceIndex > 2 ? 'hidden' : ''
						}`}
						key={bookingDetail.id}
					>
						<div className="w-full flex justify-start gap-2 items-start bg-gray-50 py-5 relative">
							{canEdit && (
								<div className="absolute top-4 right-4 cursor-pointer flex flex-wrap gap-2">
									<div
										onClick={() => onSelectUpdatedService(bookingServiceIndex)}
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
									{bookingDetail.tattooArt ? (
										<Link
											href={`/tattoo/${bookingDetail.tattooArt.id}?booking=${bookingDetail.tattooArt.bookingId}`}
										>
											<div className="cursor-pointer flex justify-start gap-3 flex-wrap">
												<div className="relative w-24 h-24">
													<Image
														layout="fill"
														src={
															bookingDetail.tattooArt.thumbnail
																? bookingDetail.tattooArt.thumbnail
																: '/images/ATL.png'
														}
														alt={'a'}
														className="object-contain rounded-2xl"
													/>
												</div>
											</div>
										</Link>
									) : (
										<div className="border border-black rounded-xl w-24 h-24 cursor-default">
											<div className="px-2 py-7 text-center">Không có hình xăm</div>
										</div>
									)}
								</div>
							</div>
							{
								// Phần bên phải của khung booking service
							}
							<div className="pl-3 pr-16 w-full">
								<div
									key={bookingDetail.id}
									className="pb-1 flex flex-wrap text-base"
								>
									<div>{bookingServiceIndex + 1}</div>
									<div className="pr-1">
										. {stringSize.at(bookingDetail.serviceSize)},
									</div>

									{bookingDetail.servicePlacement ? (
										<div className="pr-1">
											Vị trí xăm:{' '}
											{stringPlacements.at(bookingDetail.servicePlacement)},
										</div>
									) : (
										<></>
									)}

									{bookingDetail.serviceCategory ? (
										<div className="pr-1">{bookingDetail.serviceCategory.name},</div>
									) : (
										<></>
									)}

									<div className="pr-1">
										{formatPrice(bookingDetail.serviceMinPrice)} -{' '}
										{formatPrice(bookingDetail.serviceMaxPrice)}
									</div>
								</div>
								{
									//Description
								}
								<div className="pb-1">
									{showTextMaxLength(bookingDetail.description, 50)}
								</div>
								<div className="flex flex-wrap gap-3 items-center ">
									{
										// Giá tiền
									}
									{bookingDetail.price > 0 && (
										<div className="flex flex-wrap items-center text-base font-semibold bg-teal-300 px-2 rounded-full">
											<div>{formatPrice(bookingDetail.price)}</div>
										</div>
									)}
									{
										// Ngày hẹn
									}
									{bookingDetail.bookingMeetings?.length > 0 && (
										<div className="flex flex-wrap gap-1 items-center text-base font-semibold bg-indigo-100 px-2 rounded-full">
											<MdOutlineCalendarMonth serviceSize={20} />
											<div>{formatTime(new Date())}</div>
										</div>
									)}
									{
										// Trạng thái
									}
									<div
										className={`flex flex-wrap gap-1 items-center text-base font-semibold bg-${stringBookingDetailStatusColor.at(
											bookingDetail.status
										)} px-2 rounded-full`}
									>
										<div>{stringBookingDetailStatus.at(bookingDetail.status)}</div>
									</div>
								</div>
								{
									// Assign artist
								}
								{bookingDetail.artist && (
									<div className="flex flex-wrap gap-1 items-center text-base font-semibold pt-3">
										<Avatar
											serviceSize={40}
											src={
												bookingDetail.artist?.account?.avatar
													? bookingDetail.artist.account.avatar
													: '/public/images/ATL.png'
											}
										/>
										<div>{bookingDetail.artist?.account?.fullName}</div>
									</div>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

CustomerServices.propTypes = {
	bookingDetails: PropTypes.array,
	canEdit: PropTypes.bool,
	showMore: PropTypes.bool,
	artistList: PropTypes.array
};

export default CustomerServices;
