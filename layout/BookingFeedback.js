import Button from 'components/Button';
import Heading from 'components/Heading';
import MyModal from 'components/MyModal';
import MyRating from 'components/MyRating';
import { fetcherPost, formatPrice, showTextMaxLength } from 'lib';
import { BASE_URL } from 'lib/env';
import { stringPlacements, stringSize } from 'lib/status';
import { noImageAvailable } from 'lib/tattooPhoto';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'propTypes';
import { useState } from 'react';
import { Avatar, Card, CardBody } from 'ui';

const getFeedbackList = (bookingDetails) => {
	const list = [];
	let emptyFeedback = {
		rating: 5,
		content: ''
	};
	if (bookingDetails?.length > 0) {
		bookingDetails.forEach((element) => {
			let fb = {
				...emptyFeedback,
				bookingDetailId: element.id
			};
			list.push(element?.feedback !== null ? element?.feedback : fb);
		});
	}
	return list;
};

const BookingFeedback = ({ booking, accountId, canFeedback = false }) => {
	const [bookingDetails, setBookingDetails] = useState(booking.bookingDetails);
	const [feedbacks, setFeedbacks] = useState(getFeedbackList(bookingDetails));

	return (
		<div className="relative sm:px-8 md:px-1 lg:px-6 xl:px-56">
			<Card>
				<CardBody>
					<div>
						<Heading>Đánh giá chất lượng dịch vụ</Heading>
						{bookingDetails.map((bookingDetail, bookingDetailIndex) => (
							<div key={bookingDetail.id} className="pb-5">
								{
									// Phần chi tiết đơn hàng
								}
								<Card>
									<div className="w-full flex justify-start gap-2 items-start py-5 relative">
										{
											// Phần hình xăm của booking service
										}
										<div className="flex justify-start gap-2 items-center pl-5">
											<div>
												{bookingDetail.tattooArt ? (
													<Link
														href={`/tattoo/update/${bookingDetail.tattooArt.id}?booking=${bookingDetail.tattooArt.bookingId}`}
													>
														<div className="cursor-pointer flex justify-start gap-3 flex-wrap">
															<div className="relative w-24 h-24">
																<Image
																	layout="fill"
																	src={
																		bookingDetail.tattooArt.thumbnail
																			? bookingDetail.tattooArt.thumbnail
																			: noImageAvailable
																	}
																	alt={'a'}
																	className="object-contain rounded-2xl"
																/>
															</div>
														</div>
													</Link>
												) : (
													<div className="border border-gray-300 rounded-xl w-24 h-24 cursor-default">
														<div className="px-2 py-7 text-center text-gray-600">
															Không có hình xăm
														</div>
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
												<div>{bookingDetailIndex + 1}</div>
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
													<div className="pr-1">
														{bookingDetail.serviceCategory.name},
													</div>
												) : (
													<></>
												)}

												<div className="pr-1">
													{bookingDetail.serviceMaxPrice === 0 ? (
														<div>Miễn phí</div>
													) : (
														<div>
															{formatPrice(bookingDetail.serviceMinPrice)} -{' '}
															{formatPrice(bookingDetail.serviceMaxPrice)}
														</div>
													)}
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
											</div>
											{
												// Assign artist
											}
											{bookingDetail.artist && (
												<div className="flex flex-wrap gap-1 items-center text-base font-semibold pt-3">
													<Avatar
														size={25}
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
								{
									// Phần feedback
								}
								{feedbacks.at(bookingDetailIndex).content !== '' ? (
									<Card className={'bg-gray-50 p-5'}>
										<div className="w-full pb-3">
											<MyRating
												readonly={true}
												rating={feedbacks.at(bookingDetailIndex).rating}
											/>
										</div>
										<div>{feedbacks.at(bookingDetailIndex).content}</div>
									</Card>
								) : (
									<div>Chưa có đánh giá</div>
								)}
							</div>
						))}
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

BookingFeedback.propTypes = {
	booking: PropTypes.object,
	bookingDetails: PropTypes.array,
	accountId: PropTypes.string,
	canFeedback: PropTypes.bool
};

export default BookingFeedback;
