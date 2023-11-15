import { ChevronLeft } from 'icons/solid';
import {
	BackgroundImg,
	Card,
	CardBody,
	Dropdown,
	DropdownMenu,
	DropdownToggle,
	Link
} from 'ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'components/Button';
import { fetcherPost } from 'lib';
import { CldUploadButton } from 'next-cloudinary';
import { generateSHA1, generateSignature } from 'lib/cloudinary_signature';
import { AiOutlineClose } from 'react-icons/ai';
import { extractPublicId } from 'cloudinary-build-url';
import MoneyInput from 'components/MoneyInput';
import { stringPlacements, stringSize } from 'lib/status';
import { tattooStyleById, tattooStylesWithoutDescription } from 'lib/tattooStyle';

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
							description: '',
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
			[e.target.name]: e.target.value
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

	const handlePublicImage = (stageIndex, mediaIndex) => {
		const stages = tattoo.stages;
		const medias = stages.at(stageIndex).medias;
		medias[mediaIndex] = {
			...medias[mediaIndex],
			isPublicized: !medias[mediaIndex].isPublicized
		};
		setTattoo({ ...tattoo, stages: stages });
	};

	const stageLength = tattoo.stages.length;

	const handleAddStage = () => {
		const stages = tattoo.stages;
		stages.push({
			stageId: stages.at(stageLength - 1).stageId + 1,
			name: '',
			description: '',
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

	const setTattooState = (key, newValue) => {
		if (tattoo[key] !== newValue) {
			setTattoo({ ...tattoo, [key]: newValue });
		}
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
						<div className="flex items-center cursor-pointer gap-2">
							<div className="text-gray-500">Public:</div>
							<div
								onClick={() => setTattooState('isPublicized', !tattoo.isPublicized)}
								className="relative"
							>
								<input
									checked={tattoo.isPublicized}
									type="checkbox"
									className="hidden"
									disabled={false}
								/>
								<div className="toggle__bar h-4 bg-gray-400 rounded-full shadow-inner"></div>
								<div className="toggle__handle absolute bg-white rounded-full shadow-sm transform transition duration-150 ease-in-out"></div>
							</div>
						</div>
					</div>
					{
						// Tattoo info
					}
					<div className="pt-3 border-b border-gray-300">
						<div className="font-semibold text-lg pb-2">Thông tin hình xăm</div>
						<div className="pb-3 flex items-center gap-1">
							<div className='w-20'>Nghệ sĩ xăm:</div>
							<span className="font-semibold"> {tattoo.artist.firstName}</span>
						</div>
						<div className="pb-3 flex items-center gap-1">
							<div className="w-20">Kích thước: </div>
							<Dropdown className="relative h-full flex items-center">
								<DropdownToggle>
									<div className="w-28 rounded-lg p-1 border border-gray-300">
										{stringSize.at(tattoo.size)}
									</div>
								</DropdownToggle>
								<DropdownMenu>
									{stringSize.map((size, sizeIndex) => (
										<div
											key={size}
											onClick={() => setTattooState('size', sizeIndex)}
											className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
												tattoo.size === sizeIndex ? 'bg-indigo-100' : ''
											}`}
										>
											{size}
										</div>
									))}
								</DropdownMenu>
							</Dropdown>
						</div>
						<div className="pb-3 flex gap-1 items-center">
							<div className="w-20">Vị trí xăm:</div>
							<Dropdown className="relative h-full flex items-center">
								<DropdownToggle>
									<div className="w-28 rounded-lg p-1 border border-gray-300">
										{stringPlacements.at(tattoo.placement)}
									</div>
								</DropdownToggle>
								<DropdownMenu className={'top-2 left-2'}>
									<div className="h-40 overflow-y-auto">
										{stringPlacements.map((placement, placementIndex) => (
											<div
												key={placement}
												onClick={() => setTattooState('placement', placementIndex)}
												className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
													tattoo.placement === placementIndex ? 'bg-indigo-100' : ''
												}`}
											>
												{placement}
											</div>
										))}
									</div>
								</DropdownMenu>
							</Dropdown>
						</div>
						<div className="pb-3 flex gap-1 items-center">
							<div className="w-20">Style:</div>
							<Dropdown className="relative h-full flex items-center">
								<DropdownToggle>
									<div className="w-28 rounded-lg p-1 border border-gray-300">
										{tattooStyleById(tattoo.styleId)?.name}
									</div>
								</DropdownToggle>
								<DropdownMenu className={'top-2 left-2'}>
									<div className="h-40 overflow-y-auto">
										{tattooStylesWithoutDescription.map((style, styleIndex) => (
											<div
												key={style.id}
												onClick={() => setTattooState('styleId', style.id)}
												className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
													tattoo.styleId === style.id ? 'bg-indigo-100' : ''
												}`}
											>
												{style.name}
											</div>
										))}
									</div>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>
					{
						// Update tattoo info
					}
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
											<div className="relative grid grid-cols-3 md:grid-cols-5 w-full">
												<div className="col-span-2 lg:col-span-3 text-base flex flex-row items-center">
													{detail.operationName}
												</div>
												<div className="col-span-1 md:col-span-2 lg:col-span-1 text-base relative">
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
													className={`absolute top-5 right-1 hover:scale-125 hover:text-red-500`}
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
												className={`absolute top-1 right-1 hover:scale-125 hover:text-red-500 ${
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
												name="name"
												value={stage.name}
												onChange={(e) => handleStageChange(e, stageIndex)}
												placeholder="Giai đoạn xăm"
											/>
											<div>
												<label className="pt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
													Thêm mô tả
												</label>
												<textarea
													className="w-full rounded-lg p-2 text-base border border-gray-300"
													type="text"
													rows={5}
													value={stage.description}
													name="description"
													onChange={(e) => handleStageChange(e, stageIndex)}
													placeholder="Mô tả cho hình xăm"
												/>
											</div>
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
														<div className="absolute top-0 left-0 flex items-center cursor-pointer gap-2">
															<div className="text-gray-500">Public:</div>
															<div
																onClick={() =>
																	handlePublicImage(stageIndex, mediaIndex)
																}
																className="relative"
															>
																<input
																	checked={media.isPublicized}
																	type="checkbox"
																	className="hidden"
																	disabled={false}
																/>
																<div className="toggle__bar h-4 bg-gray-400 rounded-full shadow-inner"></div>
																<div className="toggle__handle absolute bg-white rounded-full shadow-sm transform transition duration-150 ease-in-out"></div>
															</div>
														</div>
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
															className="relative w-full bg-center bg-cover bg-fallback mt-1"
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
