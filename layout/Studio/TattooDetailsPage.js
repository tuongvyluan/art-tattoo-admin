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

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

function TattooDetailsPage({ bookingId, artTattoo, artist }) {
	const defaultTattoo = {
		bookingId: bookingId,
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
		console.log(tattoo);
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
		console.log(tattoo);
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
						<div className="flex pt-3">
							<div>
								<Button>Thêm giai đoạn</Button>
							</div>
						</div>
						<Card className={'pt-3'}>
							<CardBody className={'shadow-md bg-gray-50'}>
								{tattoo.stages.map((stage, stageIndex) => (
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
												<div className="relative" key={media.url}>
													<button
														onClick={() =>
															handleDeleteCloudinaryImage(media.url, stageIndex, mediaIndex)
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
								))}
							</CardBody>
						</Card>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

TattooDetailsPage.propTypes = {
	bookingId: PropTypes.string.isRequired,
	artist: PropTypes.object.isRequired,
	artTattoo: PropTypes.object
};

export default TattooDetailsPage;
