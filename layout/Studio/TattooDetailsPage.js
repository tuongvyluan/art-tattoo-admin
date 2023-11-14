import { ChevronLeft } from 'icons/solid';
import { BackgroundImg, Card, CardBody, Link } from 'ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'components/Button';
import { fetcherPost } from 'lib';
import { CldUploadButton } from 'next-cloudinary';
import { generateSHA1, generateSignature } from 'lib/cloudinary_signature';
import { AiOutlineClose } from 'react-icons/ai';
import { extractPublicId } from 'cloudinary-build-url';
import MoneyInput from 'components/MoneyInput';

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

function TattooDetailsPage({ bookingId, artTattoo, artist }) {
	const defaultTattoo =
		typeof artTattoo !== 'undefined'
			? artTattoo
			: {
					bookingId: artTattoo.id,
					artistId: artist.id,
					artist: artist,
					bookingDetails: [],
					stages: [
						{
							stageId: 1,
							name: 'Sau khi xăm',
							medias: [
								// {
								// url: '',
								// description: '',
								// isPublicized: false
								// }
							]
						}
					]
			  };
	const [tattoo, setTattoo] = useState(defaultTattoo);

	const handleStageChange = (e, stageIndex) => {
		const stages = tattoo.stages;
		const stage = {
			...stages.at(stageIndex),
			name: e.target.value
		};
		stages[stageIndex] = stage;
		setTattoo({ ...tattoo, stages: stages });
	};

	// handle delete image from the cloudinary storage
	const handleDeleteCloudinaryImage = (imgUrl, stageIndex, mediaIndex) => {
		const publicId = extractPublicId(imgUrl);
		const timestamp = new Date().getTime();
		const signature = generateSHA1(generateSignature(publicId, API_SECRET));
		const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;

		fetcherPost(url, {
			public_id: publicId,
			signature: signature,
			api_key: API_KEY,
			timestamp: timestamp
		});

		const stages = tattoo.stages;
		stages.at(stageIndex).medias.splice(mediaIndex, 1);
		const stage = {
			...stages.at(stageIndex),
			medias: stages.at(stageIndex).medias
		};
		stages[stageIndex] = stage;
		setTattoo({ ...tattoo, stages: stages });
	};

	const handleUploadImage = (result, options, stageIndex) => {
		const stages = tattoo.stages;
		const medias = stages.at(stageIndex).medias;
		medias.push({
			url: result.info?.url,
			description: '',
			isPublicized: false
		});
		const stage = {
			...stages.at(stageIndex),
			medias: medias
		};
		stages[stageIndex] = stage;
		setTattoo({ ...tattoo, stages: stages });
	};

	const stageLength = tattoo.stages.length;

	const handleAddStage = () => {
		const stages = tattoo.stages;
		stages.push({
			stageId: stages.at(stageLength - 1).stageId + 1,
			name: '',
			medias: []
		});
		setTattoo({ ...tattoo, stages: stages });
	};

	const handleRemoveStage = (stageIndex) => {
		const stages = tattoo.stages;
		stages.splice(stageIndex, 1);
		setTattoo({ ...tattoo, stages: stages });
	};

	const handleAddBookingDetail = () => {};

	const handleRemoveBookingDetail = () => {};

	const handleBookingDetailPrice = (value, detailIndex) => {
		const bookingDetails = tattoo.bookingDetails;
		const detail = {
			...bookingDetails.at(detailIndex),
			price: value
		};
		bookingDetails[detailIndex] = detail;
		setTattoo({ ...tattoo, bookingDetails: bookingDetails });
	};

	return (
		<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
			<Card>
				<CardBody>
					<div className="flex justify-between border-b border-gray-300 pb-3">
						<Link href={bookingId !== '' ? `/booking/${bookingId}` : '/tattoo'}>
							<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
					</div>
					<div>
						{
							// Add booking details
						}
						{tattoo.id !== '' ? (
							<div className="border-b border-gray-300">
								<div className="flex pt-3">
									<div>
										<Button onClick={handleAddBookingDetail}>Thêm dịch vụ</Button>
									</div>
								</div>
								{
									// Booking details list
								}
								{tattoo.bookingDetails.map((detail, detailIndex) => (
									<Card className={'pt-3'} key={detail.bookingDetailsId}>
										<div
											className={
												'shadow-md bg-gray-50 py-4 px-6 flex flex-row items-center'
											}
										>
											<div className="relative grid grid-cols-5 w-full">
												<div className="col-span-3 text-base flex flex-row items-center">
													{detail.operationName}
												</div>
												<div className="col-span-1 text-base relative">
													<MoneyInput
														value={detail.price}
														onAccept={(value, mask) =>
															handleBookingDetailPrice(value, detailIndex)
														}
													/>
												</div>
											</div>
											{
												// Remove booking detail icon
											}
											<button onClick={() => handleRemoveBookingDetail(detailIndex)}>
												<AiOutlineClose
													className={`absolute top-6 right-2 hover:scale-125 hover:text-red-500`}
													size={16}
												/>
											</button>
										</div>
									</Card>
								))}
							</div>
						) : (
							<></>
						)}

						{
							// Add tattoo stage, including tattoo medias
						}
						<div>
							<div className="flex pt-3">
								<div>
									<Button onClick={handleAddStage}>Thêm giai đoạn</Button>
								</div>
							</div>
							{tattoo.stages.map((stage, stageIndex) => (
								<Card className={'pt-3'} key={stage.stageId}>
									<CardBody className={'shadow-md bg-gray-50 relative'}>
										{
											// Remove stage icon
										}
										<button onClick={() => handleRemoveStage(stageIndex)}>
											<AiOutlineClose
												className={`absolute top-2 right-2 hover:scale-125 hover:text-red-500 ${
													stageLength > 1 ? '' : 'hidden'
												}`}
												size={16}
											/>
										</button>
										{
											//Stage body
										}
										<div key={stage.stageId}>
											<input
												className="w-full rounded-lg p-2 text-base border border-gray-300"
												type="text"
												value={stage.name}
												onChange={(e) => handleStageChange(e, stageIndex)}
												placeholder="Giai đoạn xăm"
											/>
											{
												// Add media section
											}
											<div>
												<label className="pt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
													Thêm ảnh/video cho hình xăm
												</label>
												<div className="flex">
													<div>
														<CldUploadButton
															onSuccess={(result, options) =>
																handleUploadImage(result, options, stageIndex)
															}
															className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-blue-800"
															uploadPreset={UPLOAD_PRESET}
														/>
													</div>
												</div>
												<p
													className="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300"
													id="file_input_help"
												>
													PNG, JPG hoặc GIF.
												</p>
											</div>
											{
												//Show media section
											}
											<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
												{stage.medias.map((media, mediaIndex) => (
													<div className="relative" key={media.tattooMediaId}>
														<button
															onClick={() =>
																handleDeleteCloudinaryImage(
																	media.url,
																	stageIndex,
																	mediaIndex
																)
															}
														>
															<AiOutlineClose
																className="absolute top-0 right-0 hover:scale-125 hover:text-red-500"
																size={16}
															/>
														</button>
														<BackgroundImg
															key={media.mediaIndex}
															className="relative w-full bg-center bg-cover bg-fallback"
															image={media.url}
															height={150}
														/>
													</div>
												))}
											</div>
										</div>
									</CardBody>
								</Card>
							))}
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

TattooDetailsPage.propTypes = {
	bookingId: PropTypes.string,
	artist: PropTypes.object.isRequired,
	artTattoo: PropTypes.object
};

export default TattooDetailsPage;
