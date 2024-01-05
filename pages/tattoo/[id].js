import TattooDetailsPage from 'layout/Studio/TattooDetailsPage';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';

const TattooDetails = () => {
	// Check authenticated
	const { status, data } = useSession();
	const router = useRouter();
	const booking =
		typeof router.query['booking'] !== 'undefined' ? router.query['booking'] : '';
	const back = typeof router.query['back'] !== 'undefined';
	const { id } = router.query;
	const [artTattoo, setArtTattoo] = useState(undefined);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'unauthenticated') {
		Router.replace('/');
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (!artTattoo) {
		if (id !== 'new') {
			fetcher(`${BASE_URL}/TattooArts/Details?id=${id}`).then((data) => {
				// Get all stages from medias

				const renderData = {
					...data,
					stages: data.tattooArtStages
					// bookingDetails: data.bookingDetails.map((bookingDetail) => {
					// 	return {
					// 		...bookingDetail,
					// 		saved: true
					// 	}
					// })
				};
				setArtTattoo(renderData);
			});
		} else {
			setArtTattoo({
				id: '',
				artistId: '',
				styleId: 1,
				bookingId: booking,
				description: '',
				size: 1,
				placement: 0,
				isPublicized: false,
				status: 0,
				totalRevenue: 0,
				thumbnail: '',
				stages: []
			});
		}
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		if (id !== 'new' && !artTattoo) {
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		}
		return (
			<TattooDetailsPage bookingId={booking} artTattoo={artTattoo} myTattoo={back} />
		);
	}
};

TattooDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default TattooDetails;
