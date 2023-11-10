import { ChevronLeft } from 'icons/solid';
import { Card, CardBody, Link } from 'ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'components/Button';
import { fetcherFile, fetcherPost } from 'lib';

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
					{
						url: '',
						description: '',
						isPublicized: false
					}
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

	const handleFileChange = (e) => {
		let formData = new FormData();
		const length = e.target.files.length;
		let i = 0;
		for (i; i < length; i++) {
			formData.append(
				`${artist.id}-${new Date().getTime()}-${i}`,
				e.target.files[i]
			);
		}
		fetcherFile('/api/uploadFile', formData);
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
										<label className="pt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Thêm ảnh/video cho hình xăm
										</label>
										<input
											className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
											type="file"
											id="fileInput"
											onChange={handleFileChange}
											multiple
										/>
										<p
											className="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300"
											id="file_input_help"
										>
											PNG, JPG hoặc GIF.
										</p>
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

TattooDetailsPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

export default TattooDetailsPage;
