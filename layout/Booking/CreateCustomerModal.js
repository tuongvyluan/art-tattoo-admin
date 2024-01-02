import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { fetcherPost } from 'lib';
import { BASE_URL } from 'lib/env';
import PropTypes from 'propTypes';
import { useState } from 'react';

const CreateCustomerModal = ({ onSubmit, openModal, setOpenModal }) => {
	const [customer, setCustomer] = useState({
		fullName: '',
		email: '',
		phoneNumber: ''
	});

	const handleFormChange = (e) => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value
		});
	};

  const onCreate = () => {
    fetcherPost(`${BASE_URL}/studios/CreateCustomerWithoutAccount`, customer).then((response) => {
      const newCustomer = {
        ...customer,
        id: response.id
      }
      onSubmit(newCustomer)
    })
  }
  
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
							<label>{'Tên'}</label>
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
							<label>{'Số điện thoại'}</label>
							<MyInput
								aria-label={'Phone'}
								name="phoneNumber"
								value={customer.phoneNumber}
								onChange={handleFormChange}
								type="tel"
								required
								placeholder={'Email'}
							/>
						</div>
						<div className="block mb-3">
							<label>{'Email'}</label>
							<MyInput
								aria-label={'Email'}
								name="email"
								value={customer.email}
								onChange={handleFormChange}
								type="email"
								required
								placeholder={'Email'}
							/>
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
	setOpenModal: PropTypes.func
};

export default CreateCustomerModal;
