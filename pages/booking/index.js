import BookingPage from 'layout/Studio/Booking';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { Loading } from 'ui';

const Booking = () => {
	// Check authenticated
	const { status, data } = useSession();
	const [bookings, setBookings] = useState(undefined);
	const [loading, setLoading] = useState([]);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		if (data.user.studioId && loading) {
			// Call api to get bookings
			fetcher(`${BASE_URL}/studios/${data.user.studioId}/bookings`)
				.then((data) => {
					setBookings(data);
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
				});
		} else if (!data.user.studioId) {
			return (
				<div className="flex items-center justify-center h-full">
					Bạn chưa tạo studio
				</div>
			);
		}

		if (!bookings && loading) {
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		} else if (!bookings) {
			return (
				<div className="flex items-center justify-center h-full">
					Chưa có đơn hàng
				</div>
			);
		}

		return <BookingPage data={bookings} />;
	} else {
		Router.replace('/');
	}
};

Booking.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default Booking;
