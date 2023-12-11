import { ChevronLeft } from 'icons/solid';
import { Avatar, BackgroundImg, Card, CardBody, Link } from 'ui';
import PropTypes from 'prop-types';
import { stringPlacements, stringSize, stringTattooStages } from 'lib/status';
import { tattooStyleById } from 'lib/tattooStyle';
import { useState } from 'react';

function TattooDetailNoUpdatePage({ bookingId, artTattoo, myTattoo = false }) {
	const [tattoo, setTattoo] = useState(JSON.parse(JSON.stringify(artTattoo)));

	return (
		<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
			<Card>
				<CardBody>
					<div className="flex justify-between border-b border-gray-300 pb-3">
						<Link
							href={
								bookingId === '' || myTattoo ? '/tattoo' : `/booking/${bookingId}`
							}
						>
							<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
						<div className="flex items-center cursor-pointer gap-2">
							<div className="text-gray-500">Public:</div>
							<div className="relative">
								<input
									checked={tattoo.isPublicized}
									type="checkbox"
									readOnly
									className="hidden"
									disabled={true}
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
								<div>
									<Avatar
										circular={false}
										src={
											tattoo.thumbnail ? tattoo.thumbnail : '/images/upload-img.png'
										}
										alt={'Thumbnail'}
										size={150}
									/>
								</div>
							</div>
						</div>
						<div className="">
							<div className="font-semibold text-lg pb-2">Thông tin hình xăm</div>
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Nghệ sĩ xăm:</div>
								<span className="font-semibold">{tattoo.artist.fullName}</span>
							</div>
							<div className="pb-3 flex items-center gap-1">
								<div className="w-20">Kích thước: </div>
								<div className="w-28">{stringSize.at(tattoo.size)}</div>
							</div>
							<div className="pb-3 flex gap-1 items-center">
								<div className="w-20">Vị trí xăm:</div>
								<div className="w-28">{stringPlacements.at(tattoo.placement)}</div>
							</div>
							<div className="pb-3 flex gap-1 items-center">
								<div className="w-20">Style:</div>
								<div className="w-28 md:w-48">
									{tattooStyleById(tattoo.styleId)?.name}
								</div>
							</div>
						</div>
					</div>

					{
						// Update tattoo stages and booking details
					}
					<div>
						{
							// Add tattoo stage, including tattoo tattooImages
						}
						<div>
							<div className="font-semibold text-lg pt-3">Các giai đoạn xăm</div>
							{tattoo.stages.map((stage, stageIndex) => (
								<Card className={'pt-3'} key={stage.id}>
									<CardBody className={'shadow-md bg-gray-50 relative'}>
										<div className="w-full relative">
											{
												//Stage body
											}
											<div key={stage.id}>
												<div className="text-base">
													Giai đoạn: {stringTattooStages.at(stage.stageStyle)}
												</div>
												<div>
													<div>Ghi chú: {stage.description}</div>
												</div>
												{
													//Show media section
												}
												<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
													{stage.tattooImages?.map((media, mediaIndex) => (
														<div className="relative" key={media.id}>
															<div className="absolute top-0 left-0 flex items-center cursor-pointer gap-2">
																<div className="text-gray-500">Public:</div>
																<div className="relative">
																	<input
																		checked={media.isPublicized}
																		type="checkbox"
																		readOnly
																		className="hidden"
																		disabled={true}
																	/>
																	<div className="toggle__bar h-4 bg-gray-400 rounded-full shadow-inner"></div>
																	<div className="toggle__handle absolute bg-white rounded-full shadow-sm transform transition duration-150 ease-in-out"></div>
																</div>
															</div>

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
				</CardBody>
			</Card>
		</div>
	);
}

TattooDetailNoUpdatePage.propTypes = {
	bookingId: PropTypes.string,
	artTattoo: PropTypes.object,
	myTattoo: PropTypes.bool
};

export default TattooDetailNoUpdatePage;
