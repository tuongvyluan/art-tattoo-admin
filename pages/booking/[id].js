import BookingDetailsPage from 'layout/Studio/BookingDetails';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';

const BookingDetails = () => {
	// Check authenticated
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [bookingData, setBookingData] = useState(undefined);

	// Get bookingId
	const router = useRouter();
	const bookingId = router.query.id;

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO && loading) {
		// Call api to get bookings

		fetcher(`${BASE_URL}/bookings/get-by-id?bookingId=${bookingId}`)
			.then((data) => {
				setBookingData(data);
				setLoading(false);
			})
			.catch((e) => {
				return (
					<div className="flex items-center justify-center h-full">
						Failed to load data
					</div>
				);
			});
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'loading' || loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'unauthenticated') {
		Router.replace('/')
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	} else {
		return <BookingDetailsPage setLoading={setLoading} data={bookingData} studioId={data.user.studioId} />;
	}
};

BookingDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default BookingDetails;
