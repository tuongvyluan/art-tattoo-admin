import { useState } from 'react';
import { Avatar, Card, CardBody, Loading, WidgetStatCard } from '../../ui';
import { Users } from 'icons/solid';
import { fetcher, formatMonthYear, formatPrice } from 'lib';
import { BASE_URL } from 'lib/env';
import Link from 'next/link';
import ChartComponent from 'components/ChartComponent';
import { sharedOptions, gridOptions, colors, options } from 'lib/chartHelper';
import { ROLE } from 'lib/status';
import PropTypes from 'propTypes';
import AdminStudioInfo from 'layout/Admin/StudioInfo';

function StudioIndexPage({ studioId, role = ROLE.STUDIO }) {
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
	const [bookingStat, setBookingStat] = useState([]);
	const [revenueStat, setRevenueStat] = useState([]);
	const [tattooStat, setTattooStat] = useState([]);

	const [bookingLabels, setBookingLabels] = useState([]);
	const [bookingDataSet, setBookingDataSet] = useState([]);

	const [tattooRevenueLabels, setTattooRevenueLabels] = useState([]);
	const tattooRevenueDataSet = [
		{
			type: 'line',
			label: 'Doanh thu',
			data: revenueStat?.map((s) => s.revenue),
			...colors[0],
			yAxisID: 'y-axis-2'
		},
		{
			label: 'Tổng số hình xăm',
			type: 'bar',
			data: tattooStat?.map((s) => s.noOfTattoo),
			...colors[1],
			yAxisID: 'y-axis-1'
		}
	];

	if (studioId && !studio.id) {
		// Get studio details
		fetcher(`${BASE_URL}/studios/studio-details?id=${studioId}`).then((response) => {
			setStudio({
				...studio,
				id: studioId,
				studioName: response.studioName,
				address: response.address,
				city: response.city,
				status: response.status,
				ownerId: response.artistId,
				avatar: response.avatar,
				phoneNumber: response.owner.phoneNumber,
				rating: response.rating,
				artists: response.studioArtists
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
					?.filter((a) => a.dismissedAt === null),
				bookings: response.bookings
			});
		});

		fetcher(`${BASE_URL}/dashboard/booking?studioId=${studioId}`).then(
			(response) => {
				setBookingStat(response.sta);
				setBookingDataSet([
					{
						label: 'Tổng số đơn hàng',
						...colors[0],
						data: response.sta.map((s) => s.noOfBooking)
					},
					{
						label: 'Tổng số đơn hàng đã hoàn thành',
						...colors[1],
						data: response.sta.map((s) => s.noOfBookingDone)
					}
				]);
				const labels = response.sta.map((s) => formatMonthYear(s.month));
				setBookingLabels(labels);
				setTattooRevenueLabels(labels);
			}
		);

		fetcher(`${BASE_URL}/dashboard/tattoo-studio?studioId=${studioId}`).then(
			(response) => {
				setTattooStat(response.sta);
			}
		);

		fetcher(`${BASE_URL}/dashboard/revenue?studioId=${studioId}`).then(
			(response) => {
				setRevenueStat(response.sta);
			}
		);

		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	} else
		return (
			<>
				{role === ROLE.ADMIN && <AdminStudioInfo studio={studio} />}
				<div className="flex flex-wrap -mx-2 pb-2 md:gap-0">
					<div className="w-full md:w-2/4 lg:w-1/4 px-2 pb-4">
						<WidgetStatCard
							title="Số hình xăm tháng này"
							className="h-full"
							value={`${
								tattooStat?.at(11)?.noOfTattoo ? tattooStat?.at(11)?.noOfTattoo : 0
							}`}
							icon={<Users width={16} height={16} />}
							type={'blue'}
						/>
					</div>
					<div className="w-full md:w-2/4 lg:w-1/4 px-2 pb-4">
						<WidgetStatCard
							title="Đơn hàng tháng này"
							className="h-full"
							value={`${
								bookingStat?.at(11)?.noOfBooking
									? bookingStat?.at(11)?.noOfBooking
									: 0
							}`}
							icon={<Users width={16} height={16} />}
							type={'gray'}
						/>
					</div>
					<div className="w-full md:w-2/4 lg:w-1/4 px-2 pb-4">
						<WidgetStatCard
							title={'Doanh thu tháng này'}
							className="h-full"
							value={`${formatPrice(revenueStat?.at(11)?.revenue)}`}
							icon={<Users width={16} height={16} />}
							type={'indigo'}
						/>
					</div>
					<div className="w-full md:w-2/4 lg:w-1/4 px-2 pb-4">
						<WidgetStatCard
							title={'Lượt theo dõi'}
							className="h-full"
							value={'123'}
							icon={<Users width={16} height={16} />}
							type={'red'}
						/>
					</div>
				</div>
				{
					// Artists
				}
				<div>
					{studio.artists && studio.artists?.length > 0 ? (
						<div>
							<Card>
								<CardBody className="flex flex-wrap justify-center gap-3">
									{studio.artists.map((artist, artistIndex) => (
										<div key={artist.id} className="min-w-max w-1/4 px-2 mb-3">
											<div className="w-full block text-gray-900 dark:text-white">
												<div className="flex justify-center">
													<Link
														target="_blank"
														href={`/artist/${artist.artist.id}${
															role === ROLE.ADMIN ? '?studioId=' + studio.id : ''
														}`}
													>
														<Avatar
															size={48}
															src={
																artist.artist.avatar
																	? artist.artist.avatar
																	: '/images/ATL.png'
															}
															alt={artist.artist.fullName}
															className={'cursor-pointer'}
														/>
													</Link>
												</div>
												<div className="mt-1 flex justify-center text-center">
													<div>
														<span className="block">{artist.artist.fullName}</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</CardBody>
							</Card>
						</div>
					) : (
						<div className="flex items-center justify-center gap-1 text-lg">
							<div className="text-center">
								<span>Bạn đang không hợp tác với nghệ sĩ nào, vào </span>
								<Link prefetch={false} href={'/artist'}>đây</Link>
								<span>
									{' '}
									để nhập key từ nghệ sĩ và thêm họ vào tiệm xăm của mình nhé.
								</span>
							</div>
						</div>
					)}
				</div>
				{
					// Charts
				}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
					<div>
						<ChartComponent
							type={'bar'}
							title="Số đơn hàng từng tháng trong 12 tháng vừa qua"
							options={{
								...sharedOptions,
								...gridOptions
							}}
							data={{ labels: bookingLabels, datasets: bookingDataSet }}
						/>
					</div>
					<div>
						<ChartComponent
							type={'bar'}
							title="Doanh thu và số hình xăm từng tháng trong 12 tháng vừa qua"
							options={{
								...sharedOptions,
								...gridOptions,
								...options(tattooRevenueLabels)
							}}
							data={{ labels: tattooRevenueLabels, datasets: tattooRevenueDataSet }}
						/>
					</div>
				</div>
			</>
		);
}

StudioIndexPage.propTypes = {
	studioId: PropTypes.string,
	role: PropTypes.number
};

export default StudioIndexPage;
