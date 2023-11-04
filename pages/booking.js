import BookingPage from "layout/Studio/Booking";
import { ROLE } from "lib/status";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { Loading } from "ui";

const Booking = () => {
  // Check authenticated
	const { status, data } = useSession();
  if (status === 'authenticated') {
    if (data.user.role === ROLE.STUDIO) {
			return <BookingPage />
		}
    Router.replace('/')
  }
  return (
		<div className="flex items-center justify-center h-full">
			<Loading />
		</div>
	);
}

Booking.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default Booking;