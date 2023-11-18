import BookingDetailsPage from 'layout/Studio/BookingDetails';
import { fetcher } from 'lib';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import useSWR from 'swr';
import { Loading } from 'ui';

const BookingDetails = () => {
	// Check authenticated
	const { status, data } = useSession();

  // Get bookingId
	const router = useRouter();
	const bookingId = router.query.id;

  // Call api to get booking
	const { data: bookingData, error } = useSWR(`/api/bookings?id=${bookingId}`, fetcher);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
    if (error) {
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
		return <BookingDetailsPage data={bookingData} />;
	} else {
		Router.replace('/');
	}
};

BookingDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default BookingDetails;
