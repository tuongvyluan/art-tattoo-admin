import BookingDetailsPage from "layout/Studio/BookingDetails";

const BookingDetails = () => {
  return (
    <BookingDetailsPage />
  )
}

BookingDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default BookingDetails;