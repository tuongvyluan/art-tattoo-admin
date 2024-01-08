import BookingPage from 'layout/Booking/Booking';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Loading } from 'ui';

const Booking = () => {
	// Check authenticated
	const { status, data } = useSession();
	const [canBook, setCanBook] = useState(false);

	useEffect(() => {
		if (data?.user?.studioId) {
			fetcher(`${BASE_URL}/studios/studio-details?id=${data?.user?.studioId}`).then((response) => {
				setCanBook(data.canBooking)
			});
		}
	}, [data]);

	if (status !== 'authenticated') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		return <BookingPage studioId={data.user.studioId} canBook={canBook} />;
	}
};

Booking.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default Booking;
