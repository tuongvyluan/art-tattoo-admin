import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { fetcherPost } from 'lib';
import { BASE_URL } from 'lib/env';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';

const CreateCustomerModal = ({ onSubmit, openModal, setOpenModal, phoneNumber }) => {
	const [customer, setCustomer] = useState({
		fullName: '',
		phoneNumber: phoneNumber
	});

	const handleFormChange = (e) => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value
		});
	};

	const onCreate = () => {
		fetcherPost(`${BASE_URL}/studios/CreateCustomerWithoutAccount`, {
			fullName: customer.fullName,
			phoneNumber: phoneNumber
		}).then(
			(response) => {
				const newCustomer = {
					...customer,
					id: response.id
				};
				onSubmit(newCustomer);
			}
		);
	};

	useEffect(() => {
		if (!openModal) {
			setCustomer({
				fullName: '',
				phoneNumber: phoneNumber
			});
		}
	}, [openModal]);

	return (
		<MyModal
			openModal={openModal}
			setOpenModal={setOpenModal}
			size={'xl'}
			title="Ghi nhận thông tin khách hàng"
			onSubmit={onCreate}
		>
			<div className="rounded-lg shadow-sm">
				<div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full">
					<div>
						<div className="block mb-3">
							<label>
								{'Tên '}
								<span className="text-red-500">*</span>
							</label>
							<MyInput
								aria-label={'Full name'}
								name="fullName"
								value={customer.fullName}
								onChange={handleFormChange}
								type="text"
								required
								placeholder={'Tên'}
							/>
						</div>
						<div className="block mb-3">
							<label>{'Số điện thoại: '}</label>
							<span>{phoneNumber}</span>
						</div>
					</div>
				</div>
			</div>
		</MyModal>
	);
};

CreateCustomerModal.propTypes = {
	onSubmit: PropTypes.func,
	openModal: PropTypes.bool,
	setOpenModal: PropTypes.func,
	phoneNumber: PropTypes.string
};

export default CreateCustomerModal;
