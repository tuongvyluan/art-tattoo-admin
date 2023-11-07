import { ChevronLeft } from 'icons/solid';
import { formatDate } from 'lib';
import { BOOKING_STATUS, stringBookingStatuses } from 'lib/status';
import { useRouter } from 'next/router';
import { Card, CardBody, Link } from 'ui';
import { WidgetOrderStatus } from 'ui/WidgetOrderStatus';

function BookingDetailsPage() {
	const router = useRouter();
	const bookingId = router.query.id;
	const timeline = [
		{
			text: 'Đã hoàn thành',
			date: new Date(+new Date() - 1000000000),
			id: 0
		},
		{
			text: `Đã xác nhận lịch hẹn vào ngày ${formatDate(
				new Date(+new Date() - 1900000000)
			)}`,
			date: new Date(+new Date() - 1700000000),
			id: 1
		},
		{
			text: 'Đã đặt hẹn',
			date: new Date(+new Date() - 1900000000),
			id: 2
		}
	];
	return (
		<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
			<Card>
				<CardBody>
					<div className="flex justify-between border-b border-gray-300 pb-3">
						<Link href="/booking">
							<div className="cursor-pointer flex gap-1 text-gray-500">
								<ChevronLeft width={20} heigh={20} /> TRỞ LẠI
							</div>
						</Link>
						<div>
							<span>Mã đơn hàng: {bookingId} | </span>
							<span className="text-red-500">
								{stringBookingStatuses[BOOKING_STATUS.COMPLETED]}
							</span>
						</div>
					</div>
					<div className="pt-3 border-b border-gray-300 pb-3">
						<div className="font-semibold text-lg pb-2">Thông tin đơn hàng</div>
						<div className="flex justify-start flex-wrap">
							<div className="w-full sm:w-1/2 md:w-1/3 border-r border-gray-300">
								<div className="text-base">Luân Tường Vy</div>
								<div>0911330695</div>
								<div>luantuongvy13@gmail.com</div>
							</div>
							<div className="flex-grow">
								<WidgetOrderStatus timeline={timeline} />
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

export default BookingDetailsPage;
