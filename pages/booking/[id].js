import BookingDetailsPage from 'layout/Studio/BookingDetails';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';

const BookingDetails = () => {
	// Check authenticated
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [bookingData, setBookingData] = useState(undefined);
	const [errorMessage, setErrorMessage] = useState('Tải dữ liệu thất bại');
	const [error, setError] = useState(false);

	// Get bookingId
	const router = useRouter();
	const bookingId = router.query.id;

	if (
		status === 'authenticated' &&
		data.user.role === ROLE.STUDIO &&
		loading &&
		!error
	) {
		// Call api to get bookings

		fetcher(`${BASE_URL}/bookings/get-by-id?bookingId=${bookingId}`)
			.then((res) => {
				if (res.studioId === data.user.studioId) {
					setBookingData(res);
					setLoading(false);
				} else {
					setError(true);
					setErrorMessage('Bạn không có quyền xem chi tiết đơn hàng này');
				}
			})
			.catch(() => {
				setError(true);
			});
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

	if (error) {
		return (
			<div className="absolute top-0 bottom-0 flex flex-col justify-center left-0 right-0 text-lg">
				<div className="text-center">{errorMessage}</div>
				<Link href="/">
					<div className="text-center cursor-pointer text-blue-500">
						Trở lại trang chủ
					</div>
				</Link>
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

	return (
		<BookingDetailsPage
			setLoading={setLoading}
			data={bookingData}
			studioId={data.user.studioId}
		/>
	);
};

BookingDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default BookingDetails;
