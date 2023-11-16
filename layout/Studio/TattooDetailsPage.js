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
import { fetcherPost, randomFrom0To } from 'lib';
import { CldUploadButton } from 'next-cloudinary';
import { generateSHA1, generateSignature } from 'lib/cloudinary_signature';
import { AiOutlineClose } from 'react-icons/ai';
import { extractPublicId } from 'cloudinary-build-url';
import MoneyInput from 'components/MoneyInput';
import { operationNames, stringPlacements, stringSize } from 'lib/status';
import { tattooStyleById, tattooStylesWithoutDescription } from 'lib/tattooStyle';
import { v4 } from 'uuid';

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

function TattooDetailsPage({ bookingId, artTattoo, artist, handleSubmit }) {
	let defaultTattoo =
		typeof artTattoo !== 'undefined'
			? artTattoo
			: {
					bookingId: artTattoo ? artTattoo.id : bookingId,
					artistId: artist.id,
					artist: artist,
					bookingDetails: [
						{
							bookingDetailsId: v4(),
							operationName: 'Xăm trọn gói',
							price: randomFrom0To(8) * 1200000 + 1000000
						}
					],
					styleId: 14,
					stages: [
						{
							id: 1,
							name: 'Sau khi xăm',
							description: '',
							medias: [
								// {
								// id: '',
								// url: '',
								// description: '',
								// isPublicized: false
								// }
							]
						}
					]
			  };
	const [tattoo, setTattoo] = useState(JSON.parse(JSON.stringify(defaultTattoo)));

	const handleStageChange = (e, stageIndex) => {
		const stages = tattoo.stages;
		const stage = {
			...stages.at(stageIndex),
			[e.target.name]: e.target.value
		};
		stages[stageIndex] = stage;
		setTattoo({ ...tattoo, stages: stages });
	};

	// delete image from the cloudinary storage
	const deleteCloudinaryImage = (imgUrl) => {
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
	};

	// handle when pressing delete image button
	const handleDeleteCloudinaryImage = (imgUrl, stageIndex, mediaIndex) => {
		const stages = tattoo.stages;
		const image = stages.at(stageIndex).medias.at(mediaIndex);
		// If this image was recently added and its link hasn't been saved to db, completely remove it from cloudinary
		if (!image.saved) {
			deleteCloudinaryImage(imgUrl);
		}
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
			id: v4(),
			url: result.info?.url,
			description: '',
			isPublicized: false,
			saved: false
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
			id: stages.at(stageLength - 1).id + 1,
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

	const handleAddBookingDetail = () => {
		const bookingDetails = tattoo.bookingDetails;
		bookingDetails.push({
			bookingDetailsId: v4(),
			operationName: '',
			price: 0
		});
		setTattoo({ ...tattoo, bookingDetails: bookingDetails });
	};

	const handleRemoveBookingDetail = (detailIndex) => {
		const bookingDetails = tattoo.bookingDetails;
		bookingDetails.splice(detailIndex, 1);
		setTattoo({ ...tattoo, bookingDetails: bookingDetails });
	};

	const handleBookingDetail = (value, detailIndex, changePrice = true) => {
		const bookingDetails = tattoo.bookingDetails;
		const detail = changePrice
			? {
					...bookingDetails.at(detailIndex),
					price: value
			  }
			: {
					...bookingDetails.at(detailIndex),
					operationName: value
			  };
		bookingDetails[detailIndex] = detail;
		setTattoo({ ...tattoo, bookingDetails: bookingDetails });
	};

	const setTattooState = (key, newValue) => {
		if (tattoo[key] !== newValue) {
			setTattoo({ ...tattoo, [key]: newValue });
		}
	};

	const handleResetChange = () => {
		const stages = tattoo.stages;
		const stageLength = stages.length;
		let i = 0;
		let j;
		let medias;
		for (i; i < stageLength; i++) {
			medias = stages.at(i).medias;
			for (j = 0; j < medias.length; j++) {
				if (!medias.at(j).saved) {
					deleteCloudinaryImage(medias.at(j).url);
				}
			}
		}
		setTattoo(JSON.parse(JSON.stringify(defaultTattoo)));
	};

	const handleSaveChange = () => {
		handleSubmit(tattoo);
		defaultTattoo = JSON.parse(JSON.stringify(tattoo));
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
									readOnly
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
							<div className="w-20">Nghệ sĩ xăm:</div>
							<span className="font-semibold">
								{/* {tattoo.artist.firstName} */}
							</span>
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
									<div className="w-28 md:w-48 rounded-lg p-1 border border-gray-300">
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
						// Update tattoo stages and booking details
					}
					<div>
						{
							// Add booking details
						}
						{tattoo.id !== '' ? (
							<div className="border-b border-gray-300">
								<div className="flex py-3">
									<div>
										<Button onClick={handleAddBookingDetail}>Thêm dịch vụ</Button>
									</div>
								</div>
								{
									// Booking details list
								}
								{tattoo.bookingDetails.map((detail, detailIndex) => (
									<div
										className={
											'relative min-w-0 break-words rounded-lg mb-4 w-full bg-white dark:bg-gray-600'
										}
										key={detail.bookingDetailsId}
									>
										<div
											className={'bg-gray-50 py-4 px-6 flex flex-row items-center'}
										>
											<div className="relative flex flex-wrap justify-between w-full">
												<Dropdown className={'relative'}>
													<DropdownToggle>
														<input
															onChange={(e) =>
																handleBookingDetail(
																	e.target.value,
																	detailIndex,
																	false
																)
															}
															required
															placeholder="Tên dịch vụ"
															value={detail.operationName}
															className="text-base flex flex-row items-center rounded-lg p-2 border border-gray-300"
														/>
													</DropdownToggle>
													<DropdownMenu>
														{operationNames.map((op, opIndex) => (
															<div
																key={op}
																onClick={() =>
																	handleBookingDetail(op, detailIndex, false)
																}
																className={`px-2 py-1 cursor-pointer hover:bg-gray-100`}
															>
																{op}
															</div>
														))}
													</DropdownMenu>
												</Dropdown>

												<div className="text-base relative">
													<MoneyInput
														value={detail.price}
														onAccept={(value, mask) =>
															handleBookingDetail(value, detailIndex)
														}
													/>
												</div>
												{
													// Remove booking detail icon
												}
												<button
													onClick={() => handleRemoveBookingDetail(detailIndex)}
												>
													<AiOutlineClose
														className={`absolute -top-3 -right-5 hover:scale-125 hover:text-red-500 ${
															tattoo.bookingDetails.length > 1 ? '' : 'hidden'
														}`}
														size={16}
													/>
												</button>
											</div>
										</div>
									</div>
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
								<Card className={'pt-3'} key={stage.id}>
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
										<div key={stage.id}>
											<input
												className="w-full rounded-lg p-2 text-base border border-gray-300"
												type="text"
												name="name"
												required
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
													<div className="relative" key={media.id}>
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
																	readOnly
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
															key={media.id}
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
					{
						// Save or reset tattoo
					}
					<div className="flex justify-end flex-wrap gap-2">
						<div className="w-16">
							<Button outline onClick={handleResetChange}>
								Reset
							</Button>
						</div>
						<div className="w-16">
							<Button onClick={handleSaveChange}>Lưu</Button>
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
	artTattoo: PropTypes.object,
	handleSubmit: PropTypes.func.isRequired
};

export default TattooDetailsPage;
