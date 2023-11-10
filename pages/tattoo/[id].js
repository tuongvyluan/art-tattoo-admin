import TattooDetailsPage from 'layout/Studio/TattooDetailsPage';
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
    const [bookingId, setBookingId] = useState(booking);
		const artist = {
			id: '1',
			firstName: 'Vy'
		}
  
  if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
    return (
			<TattooDetailsPage bookingId={bookingId} artist={artist} />
		)
  } else {
    Router.replace('/');
  }
}

TattooDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default TattooDetails;
