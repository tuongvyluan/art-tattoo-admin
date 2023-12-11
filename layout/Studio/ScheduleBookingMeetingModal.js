import Heading from 'components/Heading';
import MyModal from 'components/MyModal';
import PropTypes from 'propTypes';

const ScheduleBookingMeetingModal = ({ bookingDetail, openModal, setOpenModal }) => {
	return (
		<div className="relative">
			<MyModal openModal={openModal} setOpenModal={setOpenModal} title={'Sắp xếp lịch hẹn'}>
				<div>
					<Heading>
						<div className="flex flex-wrap">
							<div className="flex gap-1 flex-wrap items-center">
								{stringSize.at(bookingDetail.serviceSize)},
							</div>

							{bookingDetail.servicePlacement ? (
								<div className="flex gap-1 flex-wrap items-center">
									Vị trí xăm: {stringPlacements.at(bookingDetail.servicePlacement)},
								</div>
							) : (
								<></>
							)}

							{bookingDetail.serviceCategory ? (
								<div className="flex gap-1 flex-wrap items-center">
									{bookingDetail.serviceCategory.name},
								</div>
							) : (
								<></>
							)}

							<div className="flex gap-1 flex-wrap items-center">
								{formatPrice(bookingDetail.serviceMinPrice)} -{' '}
								{formatPrice(bookingDetail.serviceMaxPrice)}
							</div>
						</div>
					</Heading>
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
