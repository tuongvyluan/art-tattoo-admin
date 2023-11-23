import BookingPage from 'layout/Studio/Booking';
import { fetcher } from 'lib';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { Loading } from 'ui';

const Booking = () => {
	// Check authenticated
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [bookingData, setBookingData] = useState([]);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated' && data.user.role === ROLE.STUDIO && loading) {
		// Call api to get bookings

		fetcher(
			`https://arttattoolover-web-sea-dev-001.azurewebsites.net/bookings-user?studioId=${data.user.studioId}`
		)
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

	if (!loading) {
		return <BookingPage data={bookingData} />;
	} else {
		Router.replace('/');
	}
};

Booking.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default Booking;
