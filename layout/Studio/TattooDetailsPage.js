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
import { useState } from 'react';
import Button from 'components/Button';
import { fetcherPost, fetcherPut } from 'lib';
import { CldUploadButton } from 'next-cloudinary';
import { AiOutlineClose } from 'react-icons/ai';
import MoneyInput from 'components/MoneyInput';
import {
	operationNames,
	stringPlacements,
	stringSize,
	stringTattooStages
} from 'lib/status';
import { tattooStyleById, tattooStyles } from 'lib/tattooStyle';
import { v4 } from 'uuid';
import { BASE_URL } from 'lib/env';

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

function TattooDetailsPage({ bookingId, artTattoo, handleSubmit, artistList }) {
	const [defaultTattoo, setDefaultTattoo] = useState(artTattoo);

	const [tattoo, setTattoo] = useState(JSON.parse(JSON.stringify(defaultTattoo)));
	const [thumbnail, setThumbnail] = useState(tattoo.thumbnail);
	const [showAlert, setShowAlert] = useState(false);
	const [selectedArtist, setSelectedArtist] = useState(
		artTattoo.artistId !== '' ? artTattoo.artistId : artistList.at(0).id
	);

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

	const setTattooState = (key, newValue) => {
		if (tattoo[key] !== newValue) {
			setTattoo({ ...tattoo, [key]: newValue });
			console.log(newValue);
		}
	};

	const handleResetChange = () => {
		setTattoo(JSON.parse(JSON.stringify(defaultTattoo)));
		setThumbnail(defaultTattoo.thumbnail);
	};

	const hasTattooChange = () => {
		return (
			defaultTattoo.styleId !== tattoo.styleId ||
			defaultTattoo.size !== tattoo.size ||
			defaultTattoo.placement !== tattoo.placement ||
			defaultTattoo.thumbnail !== thumbnail ||
			defaultTattoo.isPublicized !== tattoo.isPublicized ||
			defaultTattoo.artistId !== selectedArtist
		);
	};

	// const handleSaveStagesChange = async (tattooId) => {
	// 	const newStages = tattoo.stages
	// 	const oldStages = defaultTattoo.stages
	// 	const removedStages = oldStages.filter((stage) => (stage.saved === true && (newStages.filter((newStage) => ))))
	// }

	const handleCreateTattoo = () => {
		const newTattoo = {
			artistId: selectedArtist,
			styleId: tattoo.styleId,
			size: tattoo.size,
			placement: tattoo.placement,
			thumbnail: thumbnail,
			isPublicized: tattoo.isPublicized,
			bookingId: bookingId
		};
		fetcherPost(`${BASE_URL}/TattooArts/CreateTattoo`, newTattoo)
			.then(async (data) => {
				// await handleSaveStagesChange(data.id)
				setTattoo({
					...tattoo,
					id: data.id
				})
				handleBookingDetails(data.id)
				newTattoo.id = data.id
				handleAlert(true, 'Tạo hình xăm thành công');
				setDefaultTattoo(JSON.parse(JSON.stringify(tattoo)));
				handleSubmit(newTattoo);
			})
			.catch((e) => {
				handleAlert(true, 'Tạo hình xăm thất bại', '', true);
			});
	};

	const handleUpdateTattoo = () => {
		const newTattoo = {
			id: tattoo.id,
			styleId: tattoo.styleId,
			size: tattoo.size,
			placement: tattoo.placement,
			thumbnail: thumbnail,
			isPublicized: tattoo.isPublicized
		};
		fetcherPut(`${BASE_URL}/TattooArts/UpdateTattoo`, newTattoo)
			.then(async (data) => {
				// await handleSaveStagesChange(tattoo.id)
				setDefaultTattoo(JSON.parse(JSON.stringify(tattoo)));
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
	};

	const handleSaveChange = async () => {
		if (tattoo.id === '') {
			handleAlert(true, 'Đang tạo hình xăm...');
			handleCreateTattoo();
		} else {
			handleAlert(true, 'Đang cập nhật hình xăm...');
			if (hasTattooChange()) {
				handleUpdateTattoo();
			}
		}
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
									<div key={thumbnail}>
										<Avatar
											circular={false}
											src={thumbnail ? thumbnail : '/images/upload-img.png'}
											alt={'Thumbnail'}
											size={150}
										/>
									</div>
								</div>
								<div className="flex flex-wrap items-center mt-1">
									<div className="mx-auto">
										<CldUploadButton
											onSuccess={(result, options) => setThumbnail(result.info?.url)}
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
												{
													artistList.filter((a) => a.id === selectedArtist).at(0)
														.firstName
												}{' '}
												{
													artistList.filter((a) => a.id === selectedArtist).at(0)
														.lastName
												}
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
													{a.firstName} {a.lastName}
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
														{tattooStyleById(style.id)?.name}
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
								// Add tattoo stage, including tattoo medias
							}
							<div className="pt-3 border-t border-gray-300 mt-3">
								{tattoo.stages.map((stage, stageIndex) => (
									<Card className={'pt-3'} key={stage.id}>
										<CardBody className={'shadow-md bg-gray-50 relative'}>
											<div className="w-full relative">
												{
													//Stage body
												}
												<div key={stage.id}>
													<div className="w-full rounded-lg p-2 text-base border border-gray-300">
														{stringTattooStages.at(stage.stageStyle)}
													</div>
													<div>
														<label className="pt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Mô tả
														</label>
														<textarea
															className="w-full rounded-lg p-2 text-base border border-gray-300"
															type="text"
															rows={5}
															value={stage.description}
															name="description"
															readOnly
															placeholder="Chưa có mô tả cho giai đoạn"
														/>
													</div>
													{
														//Show media section
													}
													<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
														{stage.medias.map((media, mediaIndex) => (
															<div className="relative" key={media.id}>
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
