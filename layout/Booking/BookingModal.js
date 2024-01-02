import PropTypes from 'prop-types';
import { Modal } from 'flowbite-react';
import Button from 'components/Button';

const BookingModal = ({
	children,
	onSubmit,
	canConfirm = true,
	cancelTitle = 'Huỷ',
	confirmTitle = 'Xác nhận',
	size = '7xl',
	openModal,
	setOpenModal
}) => {
	
	return (
		<Modal
			size={size}
			position={'center'}
			show={openModal}
			onClose={() => setOpenModal(false)}
		>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<div className="flex flex-wrap items-center justify-center gap-3 w-full">
					<div>
						<Button outline onClick={() => setOpenModal(false)}>
							{cancelTitle}
						</Button>
					</div>
					{canConfirm && (
						<div>
							<Button onClick={onSubmit}>{confirmTitle}</Button>
						</div>
					)}
				</div>
			</Modal.Footer>
		</Modal>
	);
};

BookingModal.propTypes = {
	children: PropTypes.node,
	onSubmit: PropTypes.func.isRequired,
	canConfirm: PropTypes.bool,
	cancelTitle: PropTypes.string,
	confirmTitle: PropTypes.string,
	size: PropTypes.string,
	openModal: PropTypes.bool,
	setOpenModal: PropTypes.func
};

export default BookingModal;
