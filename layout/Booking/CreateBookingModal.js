import Button from 'components/Button';
import Heading from 'components/Heading';
import MyInput from 'components/MyInput';
import MyModal from 'components/MyModal';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { useEffect, useState } from 'react';
import { sortServiceByCategory } from 'lib/studioServiceHelper';
import BookingForm from './BookingForm';

const CreateBookingModal = ({ studioId, openModal, setOpenModal }) => {
	const [searchValue, setSearchValue] = useState('');
	const [hasSearched, setHasSearched] = useState(false);
	const [customer, setCustomer] = useState(undefined);
	const [openBookingModal, setOpenBookingModal] = useState(false);
	const [studio, setStudio] = useState(undefined);

	const handleSearch = (e) => {
		e.preventDefault();
		fetcher(
			`${BASE_URL}/studios/GetCustomerWithPhoneNumber?phoneOrEmail=${searchValue.trim()}`
		)
			.then((response) => {
				setCustomer(response.customer);
				setHasSearched(true);
			})
			.catch(() => {
				setCustomer(undefined);
				setHasSearched(true);
			});
	};

	useEffect(() => {
		if (!openModal) {
			setCustomer(undefined);
			setSearchValue('');
			setHasSearched(false);
		}
	}, [openModal]);

	useEffect(() => {
		fetcher(`${BASE_URL}/studios/${studioId}/services-for-create-booking`).then(
			(data) => {
				const newStudio = {
					id: studioId,
					services: data.services?.sort(sortServiceByCategory)?.map((service) => {
						return {
							...service,
							quantity: 0
						};
					}),
					name: data.studioName,
					avatar: data.owner.avatar,
					artists: data.artists,
					openTime: data.openTime,
					closeTime: data.closeTime,
					address: data.address,
					city: data.city
				};
				setStudio(newStudio);
			}
		);
	}, []);
	return (
		<div className="relative">
			{
				// Search customer modal
			}
			<MyModal
				size="3xl"
				openModal={openModal}
				setOpenModal={setOpenModal}
				title={'Tạo đơn đặt hàng'}
				canConfirm={!!customer}
				onSubmit={() => setOpenBookingModal(true)}
			>
				<Heading>Tìm khách hàng</Heading>
				<form onSubmit={handleSearch}>
					<div className="flex flex-wrap gap-2 w-full">
						<div className="flex-grow">
							<MyInput
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder={'Nhập số điện thoại để tìm kiếm khách hàng.'}
							/>
						</div>
						<div>
							<Button>Tìm kiếm</Button>
						</div>
					</div>
				</form>
				{hasSearched && (
					<div className="pt-3">
						<Heading>Thông tin khách hàng</Heading>
						{customer ? (
							<div>
								<table className="w-full mb-5 text-sm text-left text-gray-500 pb-20">
									<thead className="text-xs text-gray-700 uppercase">
										<tr>
											<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
												Tên
											</th>
											<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
												Email
											</th>
											<th scope="col" className="w-32 px-3 py-3 bg-gray-50">
												Số điện thoại
											</th>
										</tr>
									</thead>
									<tbody className="h-full">
										<tr
											key={customer.id}
											className="bg-white border-b hover:bg-gray-50 text-black cursor-pointer"
										>
											<td className="px-3 py-4">
												<div>{customer.fullName} </div>
											</td>
											<td className="px-3 py-4 w-1/3">
												<div>{customer.email} </div>
											</td>
											<td className="px-3 py-4">
												<div>{customer.phoneNumber} </div>
											</td>
										</tr>
									</tbody>
								</table>
								<div className="text-base">
									Bạn có chắc sẽ tạo đơn hàng mới cho khách hàng này?
								</div>
							</div>
						) : (
							<div>Khách hàng này không tồn tại</div>
						)}
					</div>
				)}
			</MyModal>
			{
				// Create booking modal
			}
			{studio && customer && (
				<BookingForm
					studio={studio}
					customerId={customer?.id}
					openModal={openBookingModal}
					setOpenModal={setOpenBookingModal}
				/>
			)}
		</div>
	);
};

export default CreateBookingModal;
