import PaymentBooking from "layout/Studio/PaymentBooking";
import { useRouter } from "next/router";

const PaymentPage = () => {
  const router = useRouter();
  const bookingId = router.query.id;

  return <PaymentBooking bookingId={bookingId} />
}

export default PaymentPage;