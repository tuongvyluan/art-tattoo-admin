import ChartComponent from 'components/ChartComponent';
import { ROLE } from 'lib/status';
import { sharedOptions, gridOptions } from 'lib/chartHelper';
import PropTypes from 'propTypes';
import { Avatar, Card, CardBody } from 'ui';
import Heading from 'components/Heading';
import { formatDate, formatPhoneNumber } from 'lib';
import Pill from 'components/Pill';
import Link from 'next/link';
import { ChevronLeft } from 'icons/outline';

const ArtistDetails = ({ artist, statistic, studioId = '', role = ROLE.ADMIN }) => {
	return (
		<div className="px-3 flex justify-center">
			<div className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
				<Card className={'w-full'}>
					<CardBody>
						<div className="">
							<div>
							{
								// Studio header
							}
							<div className="flex gap-2 items-center border-b border-gray-300">
								<Link href={role === ROLE.ADMIN ? '/studio/' + studioId : '/artist'}>
									<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500 pb-2">
										<ChevronLeft width={20} heigh={20} />
									</div>
								</Link>
								<Heading>Thông tin nghệ sĩ</Heading>
							</div>
								<div className="w-full min-w-min py-3">
									<div className="flex justify-center">
										<div>
											<Avatar
												circular={true}
												src={artist.avatar ? artist.avatar : '/images/avatar.png'}
												alt={'Avatar'}
												size={150}
											/>
										</div>
									</div>
								</div>
								<div className="w-full mb-3 flex flex-wrap gap-1 items-end">
									<label className="w-24">{'Tên:'}</label>
									<div className="text-base">{artist.fullName}</div>
								</div>
								<div className="w-full mb-3 flex flex-wrap gap-1 items-end">
									<label className="w-24">{'Số điện thoại:'}</label>
									<div className="text-base">
										{formatPhoneNumber(artist.phoneNumber)}
									</div>
								</div>
								<div className="w-full mb-3 flex flex-wrap gap-1 items-end">
									<label className="w-24">{'Email:'}</label>
									<div className="text-base">{artist.email}</div>
								</div>

								<div className="w-full mb-3 flex flex-wrap gap-1 items-end">
									<label className="w-24">{'Giới thiệu:'}</label>
									<div className="text-base">{artist.bioContent}</div>
								</div>
							</div>
							{
								// Artist styles
							}
							<div className="pb-5">
								<div className="py-5">
									<h1 className="border-b border-gray-300 pb-3 text-base font-semibold">
										Style
									</h1>
									<div className="py-2 flex flex-wrap gap-2">
										{artist?.artistStyles.map((style, index) => (
											<div className="cursor-pointer" key={style.id}>
												<Pill canHover={false} selected={false}>
													{style.name}
												</Pill>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<div>
							<div className="border-b border-gray-300 text-base">
								<Heading>Thống kê</Heading>
							</div>
							{
								<div className="border-b border-gray-300 py-3 pl-3">
									<div className="flex justify-between flex-wrap gap-3">
										<h1 className="text-base font-semibold mb-3">Tiệm xăm</h1>
									</div>
									{artist?.studioArtists ? (
										<div>
											{artist.studioArtists.map((studioArtist) => (
												<div
													key={studioArtist.createdAt}
													className="flex flex-wrap gap-2 items-center pb-3"
												>
													<Avatar
														size={50}
														src={
															studioArtist?.studioAvatar
																? studioArtist?.studioAvatar
																: '/images/ATL.png'
														}
													/>
													<div>
														<div className="text-base font-semibold">
															{studioArtist?.studioName}
														</div>
														<div>
															Từ {formatDate(studioArtist.createdAt)} đến{' '}
															{studioArtist.dismissedAt
																? `${formatDate(studioArtist.dismissedAt)}`
																: 'nay'}
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div>Nghệ sĩ chưa từng hợp tác với tiệm xăm nào</div>
									)}
								</div>
							}
							<ChartComponent
								type={'bar'}
								title="Số hình xăm từng tháng trong 12 tháng vừa qua"
								options={{
									...sharedOptions,
									...gridOptions
								}}
								data={statistic}
							/>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

ArtistDetails.propTypes = {
	artist: PropTypes.object,
	statistic: PropTypes.object,
	studioId: PropTypes.string,
	role: PropTypes.number
};

export default ArtistDetails;
