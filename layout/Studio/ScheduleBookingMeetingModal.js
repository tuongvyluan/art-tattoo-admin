import Heading from 'components/Heading';
import MyModal from 'components/MyModal';
import { formatPrice } from 'lib';
import { stringPlacements, stringSize } from 'lib/status';
import PropTypes from 'propTypes';

const ScheduleBookingMeetingModal = ({ bookingDetail, openModal, setOpenModal }) => {
	return (
		<div className="relative">
			<MyModal
				size="xl"
				openModal={openModal}
				setOpenModal={setOpenModal}
				title={'Sắp xếp lịch hẹn'}
				confirmTitle='Tạo'
			>
				<div className="max-h-96 overflow-auto">
					<Heading>
						<div className="flex flex-wrap gap-1">
							<div className="flex gap-1 flex-wrap items-center">
								{stringSize.at(bookingDetail?.serviceSize)},
							</div>

							{bookingDetail?.servicePlacement ? (
								<div className="flex gap-1 flex-wrap items-center">
									Vị trí xăm: {stringPlacements.at(bookingDetail?.servicePlacement)},
								</div>
							) : (
								<></>
							)}

							{bookingDetail?.serviceCategory ? (
								<div className="flex gap-1 flex-wrap items-center">
									{bookingDetail?.serviceCategory.name},
								</div>
							) : (
								<></>
							)}

							<div className="flex gap-1 flex-wrap items-center">
								{formatPrice(bookingDetail?.serviceMinPrice)} -{' '}
								{formatPrice(bookingDetail?.serviceMaxPrice)}
							</div>
						</div>
					</Heading>
					{
						// Booking meeting list
					}
					{bookingDetail?.bookingMeetings?.length > 0 ? (
						<table className="w-full text-sm text-left text-gray-500 pb-20">
							<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
								<tr>
									<th scope="col" className="w-1/3 px-3 py-3 bg-gray-50 text-center">
										Ngày hẹn
									</th>
									<th scope="col" className="px-3 py-3 bg-gray-50 text-center">
										Trạng thái
									</th>
									<th scope="col" className="px-3 py-3 bg-gray-50 text-center"></th>
								</tr>
							</thead>
						</table>
					) : (
						<div>Chưa có lịch hẹn nào cho dịch vụ này</div>
					)}
				</div>
			</MyModal>
		</div>
	);
};

ScheduleBookingMeetingModal.propTypes = {
	bookingDetail: PropTypes.object.isRequired,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired
};

export default ScheduleBookingMeetingModal;
