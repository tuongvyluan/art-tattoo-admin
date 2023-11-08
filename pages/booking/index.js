import BookingPage from 'layout/Studio/Booking';
import { fetcher } from 'lib';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import useSWR from 'swr';
import { Loading } from 'ui';

const Booking = () => {
	// Check authenticated
	const { status, data } = useSession();

	// Call api to get bookings
	const { data: bookingData, error } = useSWR('api/bookings', fetcher);
	
	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		if (error) {
			console.log(bookingData, error)
			return (
				<div className="flex items-center justify-center h-full">
					Failed to load data
				</div>
			);
		}

		if (!bookingData) {
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		}

		return (
			<BookingPage data={bookingData} />
		)
	} else {
		Router.replace('/');
	}
};

Booking.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default Booking;
