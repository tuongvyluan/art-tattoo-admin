import { fetcher, formatMonthYear } from 'lib';
import { BASE_URL } from 'lib/env';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';
import { colors } from 'lib/chartHelper';
import ArtistDetails from 'layout/ArtistDetails';

const ArtistDetailPage = () => {
	const router = useRouter();
	const artistId = router.query.id;
	const studioId = router.query.studioId;
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [artist, setArtist] = useState(undefined);
	const [statistic, setStatistic] = useState(undefined);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'unauthenticated') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				Tải dữ liệu thất bại
			</div>
		);
	}

	if (status === 'authenticated') {
		if (loading) {
			fetcher(`${BASE_URL}/dashboard/tattoo?artistId=${artistId}`)
				.then((response) => {
					const labels = response.sta.map((s) => formatMonthYear(s.month));
					const dataSet = [
						{
							label: 'Tổng số hình xăm',
							...colors[0],
							data: response.sta.map((s) => s.noOfTattoo)
						}
					];
					setStatistic({
						labels: labels,
						datasets: dataSet
					});
				})
				.catch((e) => {
          setError(true)
					console.log('Load artist statistic failed. ', e);
				});

			fetcher(`${BASE_URL}/artists/${artistId}/artist-details`)
				.then((response) => {
					const responseArtist = {
						id: response.id,
						bioContent: response.bioContent,
						isVerified: false,
						status: response.status,
						fullName: response.fullName,
						avatar: response.avatar,
						followerCount: response.followerCount,
						rating: 4.8,
						artistStyles: response.artistStyles,
						studioArtists: response.studioArtists,
						email: response.email,
						phoneNumber: response.phoneNumber
					};
					setArtist(responseArtist);
				})
				.catch((e) => {
          setError(true)
					console.log('Load artist details failed. Aritst ID: ', artistId);
				});

			setLoading(false);
		}

		if (!artist || !statistic) {
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		} else {
			return (
				<ArtistDetails
					artist={artist}
					statistic={statistic}
					studioId={studioId}
					role={data.user.role}
				/>
			);
		}
	}
};

export default ArtistDetailPage;
