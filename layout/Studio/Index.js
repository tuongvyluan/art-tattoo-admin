import { useState } from 'react';
import { Avatar, Card, CardBody, Loading, WidgetStatCard } from '../../ui';
import { Users } from 'icons/solid';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';

function StudioIndexPage({ studioId }) {
	const [studio, setStudio] = useState({
		id: null,
		ownerId: '',
		studioName: '',
		address: '',
		bioContent: '',
		openTime: '08:00',
		closeTime: '20:00',
		certificate: null,
		isAuthorized: false,
		isPrioritized: false,
		status: 0,
		artists: [],
		bookings: []
	});

	if (studioId && !studio.id) {
		fetcher(`${BASE_URL}/studios/${studioId}`).then((response) => {
			setStudio({
				...studio,
				id: studioId,
				ownerId: response.artistId,
				artists: response.studioArtists,
				bookings: response.bookings
			});
		});
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	} else
		return (
			<>
				<div className="flex flex-wrap -mx-2">
					<div className="w-full md:w-2/4 lg:w-1/4 px-2">
						<WidgetStatCard
							title="Tổng đơn hàng"
							value={studio.bookings?.length}
							icon={<Users width={16} height={16} />}
							type={'blue'}
						/>
					</div>
					<div className="w-full md:w-2/4 lg:w-1/4 px-2">
						<WidgetStatCard
							title="Đơn hàng tháng này"
							value={'23'}
							icon={<Users width={16} height={16} />}
							type={'gray'}
						/>
					</div>
					<div className="w-full md:w-2/4 lg:w-1/4 px-2">
						<WidgetStatCard
							title={'Doanh thu tháng này'}
							value={'23,465,563'}
							icon={<Users width={16} height={16} />}
							type={'indigo'}
						/>
					</div>
					<div className="w-full md:w-2/4 lg:w-1/4 px-2">
						<WidgetStatCard
							title={'Lượt theo dõi'}
							value={'123'}
							icon={<Users width={16} height={16} />}
							type={'red'}
						/>
					</div>
				</div>
				{studio.artists && studio.artists.length > 0 ? (
					<div>
						<Card>
							<CardBody className="flex">
								{studio.artists?.map((artist, artistIndex) => (
									<div key={artist.id} className="w-1/4 px-2 mb-3">
										<a className="w-full block text-gray-900 dark:text-white">
											<div className="flex justify-center">
												<Avatar
													size={48}
													src={
														artist.artist.avatar
															? artist.artist.avatar
															: '/images/ATL.png'
													}
													alt={artist.artist.firstName}
												/>
											</div>
											<div className="mt-1 flex justify-center text-center">
												<div>
													<span className="block">
														{artist.artist.firstName} {artist.artist.lastName}
													</span>
												</div>
											</div>
										</a>
									</div>
								))}
							</CardBody>
						</Card>
					</div>
				) : (
					<div className="flex items-center justify-center h-full">
						Bạn đang chưa có nghệ sĩ nào, vào trang nghệ sĩ để nhập key từ nghệ sĩ và
						thêm họ vào tiệm xăm của mình nhé.
					</div>
				)}
			</>
		);
}

export default StudioIndexPage;
