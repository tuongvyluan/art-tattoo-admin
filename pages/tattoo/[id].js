import TattooDetailsPage from 'layout/Studio/TattooDetailsPage';
import { fetcher } from 'lib';
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
	const { id } = router.query;
	const [artTattoo, setArtTattoo] = useState(undefined);
	const [artist, setArtist] = useState({
		artistId: [Math.floor(Math.random() * 900)],
		artistName: 'Vy'
	});
	
	if (id !== 'new' && !artTattoo) {
		fetcher('/api/studioTattooArt').then((data) => {
			setArtTattoo(data)
			setArtist(data.artist)
		})
	}

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		if (id !== 'new' && (!artTattoo || !artist)) {
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		}
		return (
			<TattooDetailsPage
				bookingId={booking}
				artTattoo={artTattoo}
				artist={artist}
			/>
		);
	} else {
		Router.replace('/');
	}
};

TattooDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default TattooDetails;
