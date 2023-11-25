import { ChevronDown, ChevronLeft } from 'icons/solid';
import { MdUpload } from 'react-icons/md';
import {
	Alert,
	Avatar,
	BackgroundImg,
	Card,
	CardBody,
	Dropdown,
	DropdownMenu,
	DropdownToggle,
	Link
} from 'ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { fetcherPost, fetcherPut } from 'lib';
import { CldUploadButton } from 'next-cloudinary';
import { generateSHA1, generateSignature } from 'lib/cloudinary_signature';
import { AiOutlineClose } from 'react-icons/ai';
import { extractPublicId } from 'cloudinary-build-url';
import MoneyInput from 'components/MoneyInput';
import {
	operationNames,
	stringColor,
	stringPlacements,
	stringSize
} from 'lib/status';
import { tattooStyleById, tattooStyles } from 'lib/tattooStyle';
import { v4 } from 'uuid';
import { BASE_URL } from 'lib/env';

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

function TattooDetailsPage({
	bookingId,
	artTattoo,
	artist,
	handleSubmit,
	artistList
}) {
	let defaultTattoo =
		typeof artTattoo !== 'undefined'
			? artTattoo
			: {
					id: '',
					bookingId: bookingId,
					artist: {},
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
					],
					thumbnail: '',
					price: 0,
					isPublicized: false,
					hasColor: false,
					size: 0,
					placement: 0,
					bookingDetails: []
			  };

	const [tattoo, setTattoo] = useState(JSON.parse(JSON.stringify(defaultTattoo)));
	const [thumbnailKey, setThumbnailKey] = useState(tattoo.thumbnail);
	const [showAlert, setShowAlert] = useState(false);
	const [selectedArtist, setSelectedArtist] = useState(artistList.at(0).id);

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
		let price = 0;
		bookingDetails.map((d) => {
			price += d.price;
		});
		setTattoo({ ...tattoo, bookingDetails: bookingDetails, totalRevenue: price });
	};

	const setTattooState = (key, newValue) => {
		if (tattoo[key] !== newValue) {
			setTattoo({ ...tattoo, [key]: newValue });
			console.log(newValue);
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

	const hasTattooChange = () => {
		return (
			defaultTattoo.styleId !== tattoo.styleId ||
			defaultTattoo.size !== tattoo.size ||
			defaultTattoo.placement !== tattoo.placement ||
			defaultTattoo.thumbnail !== tattoo.thumbnail ||
			defaultTattoo.isPublicized !== tattoo.isPublicized
		);
	};

	const handleSaveChange = () => {
		if (tattoo.id === '') {
			handleAlert(true, 'Đang tạo hình xăm...');
			const newTattoo = {
				artistId: artistList.at(selectedArtist).id,
				styleId: tattoo.styleId,
				size: tattoo.size,
				placement: tattoo.placement,
				thumbnail: tattoo.thumbnail,
				isPublicized: tattoo.isPublicized,
				bookingId: bookingId
			};
			fetcherPost(`${BASE_URL}/TattooArts/CreateTattoo`, newTattoo)
				.then((data) => {
					handleSubmit(newTattoo);
					handleAlert(true, 'Tạo hình xăm thành công');
					defaultTattoo = JSON.parse(JSON.stringify(tattoo));
				})
				.catch((e) => {
					handleAlert(true, 'Tạo hình xăm thất bại', '', true);
				})
				.finally(() => {
					setTimeout(() => {
						handleAlert(false, '', '');
					}, 2000);
				});
		} else {
			handleAlert(true, 'Đang cập nhật hình xăm...');
			if (hasTattooChange()) {
				const newTattoo = {
					id: tattoo.id,
					styleId: tattoo.styleId,
					size: tattoo.size,
					placement: tattoo.placement,
					thumbnail: tattoo.thumbnail,
					isPublicized: tattoo.isPublicized
				};
				fetcherPut(`${BASE_URL}/TattooArts/UpdateTattoo`, newTattoo)
					.then((data) => {
						defaultTattoo = JSON.parse(JSON.stringify(tattoo));
						handleSubmit(newTattoo);
						handleAlert(true, 'Cập nhật hình xăm thành công');
					})
					.catch((e) => {
						handleAlert(true, 'Cập nhật hình xăm thất bại', '', true);
					})
					.finally(() => {
						setTimeout(() => {
							handleAlert(false, '', '');
						}, 2000);
					});
			} else {
				handleAlert(false, '', '');
			}
		}
	};

	useEffect(() => {
		setThumbnailKey(tattoo.thumbnail);
	}, [tattoo]);

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
			<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
				<Card>
					<CardBody>
						<div className="flex justify-between border-b border-gray-300 pb-3">
							<Link href={bookingId !== '' ? `/booking/${bookingId}` : '/myTattoo'}>
								<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
									<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
								</div>
							</Link>
							<div className="flex items-center cursor-pointer gap-2">
								<div className="text-gray-500">Public:</div>
								<div
									onClick={() =>
										setTattooState('isPublicized', !tattoo.isPublicized)
									}
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
						<div className="py-3 border-b border-gray-300 flex gap-5 flex-wrap">
							<div className="w-full min-w-min sm:w-1/2 md:w-1/3 lg:w-1/4">
								<div className="flex justify-center">
									<div key={thumbnailKey}>
										<Avatar
											circular={false}
											src={
												tattoo.thumbnail
													? tattoo.thumbnail
													: '/images/upload-img.png'
											}
											alt={'Thumbnail'}
											size={150}
										/>
									</div>
								</div>
								<div className="flex flex-wrap items-center mt-1">
									<div className="mx-auto">
										<CldUploadButton
											onSuccess={(result, options) =>
												setTattooState('thumbnail', result.info?.url)
											}
											uploadPreset={UPLOAD_PRESET}
											className="text-gray-800 bg-white ring-1 ring-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
										>
											<div className="flex gap-1 items-center">
												<MdUpload size={16} />
												<div>Thay thumbnail</div>
											</div>
										</CldUploadButton>
									</div>
								</div>
							</div>
							<div className="">
								<div className="font-semibold text-lg pb-2">Thông tin hình xăm</div>
								<div className="pb-3 flex items-center gap-1">
									<div className="w-20">Nghệ sĩ xăm:</div>
									<Dropdown className={'relative'}>
										<DropdownToggle>
											<div className="w-28 rounded-lg p-1 border border-gray-300">
												Chọn nghệ sĩ
											</div>
										</DropdownToggle>
										<DropdownMenu>
											{artistList.map((a, aIndex) => (
												<div
													key={a.id}
													onClick={() => setSelectedArtist(a.id)}
													className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
														a.id === selectedArtist ? 'bg-indigo-100' : ''
													}`}
												>
													{a.id}
												</div>
											))}
										</DropdownMenu>
									</Dropdown>
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
														onClick={() =>
															setTattooState('placement', placementIndex)
														}
														className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
															tattoo.placement === placementIndex
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
												{tattooStyles.map((style, styleIndex) => (
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
								{/* <div className="pb-3 flex gap-1 items-center">
									<div className="w-20">Giá:</div>
									<div className="w-48">
										<MoneyInput
											value={tattoo.price}
											disabled={bookingId !== ''}
											onAccept={(value, mask) => setTattooState('price', value)}
										/>
									</div>
								</div> */}
							</div>
						</div>
						{
							// Update tattoo stages and booking details
						}
						<div>
							{
								// Add booking details
							}
							{tattoo.bookingId !== '' ? (
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
												<div className="relative flex flex-wrap justify-between items-center w-full">
													<Dropdown className={'relative'}>
														<DropdownToggle>
															<div className="text-base w-40 flex flex-row items-center rounded-lg p-2 border border-gray-300 relative">
																<ChevronDown
																	className="absolute right-1"
																	width={20}
																	height={20}
																/>
																<div className="h-6">
																	{operationNames.at(detail.operationId)}
																</div>
															</div>
														</DropdownToggle>
														<DropdownMenu>
															{operationNames.map((op, opIndex) => (
																<div
																	key={op}
																	onClick={() =>
																		handleBookingDetail(op, detailIndex, false)
																	}
																	className={`px-2 py-1 w-40 cursor-pointer hover:bg-gray-100`}
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
											<div className="w-full relative">
												{
													// Remove stage icon
												}
												<div className="w-full pb-3 flex justify-end">
													<button
														className={`hover:scale-125 hover:text-red-500 ${
															stageLength > 1 ? '' : 'hidden'
														}`}
														onClick={() => handleRemoveStage(stageIndex)}
													>
														<AiOutlineClose size={16} />
													</button>
												</div>
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
																	uploadPreset={UPLOAD_PRESET}
																	className="text-gray-800 bg-white ring-1 ring-gray-300 hover:text-white hover:bg-gray-700 font-medium rounded-lg text-sm py-2 px-2 w-full"
																>
																	<div className="flex gap-1 items-center">
																		<MdUpload size={16} />
																		<div>Upload</div>
																	</div>
																</CldUploadButton>
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
		</div>
	);
}

TattooDetailsPage.propTypes = {
	bookingId: PropTypes.string,
	artist: PropTypes.object,
	artTattoo: PropTypes.object,
	handleSubmit: PropTypes.func.isRequired,
	artistList: PropTypes.array.isRequired
};

export default TattooDetailsPage;
