import Button from './Button';
import PropTypes from 'prop-types';
import { Modal } from 'flowbite-react';
import { useRef } from 'react';
import { IoIosWarning } from 'react-icons/io';

const MyModal = ({
	title,
	children,
	openModal,
	setOpenModal,
	onSubmit,
	confirmTitle = 'Xác nhận',
	cancelTitle = 'Huỷ',
	warn = false,
	size = 'lg',
	noFooter = false,
	canConfirm = true,
	noHeader = false
}) => {
	const initialFocus = useRef(null);
	return (
		<Modal
			initialFocus={initialFocus}
			show={openModal}
			onClose={() => setOpenModal(false)}
			size={size}
		>
			{!noHeader && (
				<Modal.Header>
					<div className="flex flex-wrap items-center gap-2">
						{warn && <IoIosWarning size={20} className="text-red-500" />}
						<div className={`${warn ? 'text-red-500' : ''}`}>{title}</div>
					</div>
				</Modal.Header>
			)}
			<Modal.Body>{children}</Modal.Body>
			{!noFooter && (
				<Modal.Footer>
					<Button ref={initialFocus} outline onClick={() => setOpenModal(false)}>
						{cancelTitle}
					</Button>
					{canConfirm && (
						<Button warn={warn} onClick={onSubmit}>
							{confirmTitle}
						</Button>
					)}
				</Modal.Footer>
			)}
		</Modal>
	);
};

MyModal.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node,
	confirmTitle: PropTypes.string,
	cancelTitle: PropTypes.string,
	warn: PropTypes.bool,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
	size: PropTypes.string,
	noFooter: PropTypes.bool,
	canConfirm: PropTypes.bool
};

export default MyModal;
