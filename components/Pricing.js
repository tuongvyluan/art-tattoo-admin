import { WidgetPricing } from 'ui';
import PropTypes from 'propTypes';
import { AdminWidgetPricing } from 'ui/AdminWidgetPricing';
import Heading from './Heading';
import { Tooltip } from 'flowbite-react';
import { Pencil } from 'icons/outline';
import MyModal from './MyModal';
import { useEffect, useState } from 'react';
import MyInput from './MyInput';
import MoneyInput from './MoneyInput';
import { fetcherPut } from 'lib';
import { BASE_URL } from 'lib/env';
import { useSession } from 'next-auth/react';

const PricingComponent = ({ packageTypes = [], studioId = '', setReload }) => {
	const [currentPackageType, setCurrentPackageType] = useState(undefined);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const { data } = useSession();

	const handleUpdatePackage = (packageType) => {
		fetcherPut(`${BASE_URL}/Package/UpdatePackageType`, {
			id: packageType.id,
			name: packageType.title,
			price: packageType.price,
			description: packageType.subtitle,
			updaterId: data?.user?.id,
			noOfMonths: packageType.noOfMonths,
			maxQuantity: packageType.isLimited ? packageType.maxQuantity : null
		}).then(() => {
			setReload()
		})
	};

	const handleOpenUpdateModal = (packageType) => {
		setCurrentPackageType(packageType);
		setOpenUpdateModal(true);
	};

	const getPackageTypes = () => {
		return packageTypes.map((p) => {
			return {
				title: p.name,
				subtitle: p.description,
				price: p.price,
				id: p.id,
				status: p.status,
				noOfMonths: p.noOfMonths,
				maxQuantity: p.maxQuantity,
				isLimited: p.maxQuantity !== null
			};
		});
	};

	const handleFormChange = (e) => {
		setCurrentPackageType({
			...currentPackageType,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (!openUpdateModal) {
			setCurrentPackageType(undefined);
		}
	}, [openUpdateModal]);

	return (
		<div className="relative">
			<MyModal
				openModal={openUpdateModal}
				setOpenModal={setOpenUpdateModal}
				title={'Thay đổi thông tin gói'}
				onSubmit={() => handleUpdatePackage(currentPackageType)}
			>
				<div className="max-h-96 w-full min-w-0 overflow-auto relative px-2">
					<div className="block mb-3">
						<div>
							Tên gói <span className="text-red-500">*</span>{' '}
						</div>
						<MyInput
							name="title"
							type="text"
							value={currentPackageType?.title}
							onChange={handleFormChange}
							required
							placeholder={'Tên gói'}
						/>
					</div>
					<div className="flex justify-between gap-3 flex-wrap">
						<div className="block mb-3 w-40">
							<div>
								Giá <span className="text-red-500">*</span>{' '}
							</div>
							<MoneyInput
								py={2}
								value={currentPackageType?.price}
								onAccept={(value, mask) =>
									handleFormChange({
										target: {
											name: 'price',
											value: value
										}
									})
								}
							/>
						</div>
						<div className="block mb-3 w-40">
							<div>
								Số tháng <span className="text-red-500">*</span>{' '}
							</div>
							<input
								className="appearance-none relative block w-full px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none"
								step={1}
								min={1}
								max={18}
								name="noOfMonths"
								type="number"
								value={currentPackageType?.noOfMonths}
								onChange={handleFormChange}
								required
								placeholder={'Số tháng'}
							/>
						</div>
					</div>
					<div className="flex gap-2 flex-wrap items-center mb-3">
						<div
							className={`${
								currentPackageType?.isLimited ? 'block' : 'hidden'
							} w-40`}
						>
							<div>
								Số lần mua <span className="text-red-500">*</span>{' '}
							</div>
							<input
								className="appearance-none relative block w-full px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-base leading-none"
								step={1}
								min={0}
								max={100}
								name="maxQuantity"
								type="number"
								value={currentPackageType?.maxQuantity}
								onChange={handleFormChange}
								required
								placeholder={'Số lần'}
							/>
						</div>
						<div
							role="button"
							onClick={() =>
								handleFormChange({
									target: {
										name: 'isLimited',
										value: !currentPackageType?.isLimited
									}
								})
							}
							className={`flex flex-wrap gap-1 items-center cursor-pointer ${
								currentPackageType?.isLimited ? 'pt-4' : ''
							}`}
						>
							<input
								type="checkbox"
								checked={currentPackageType?.isLimited}
								name="isLimited"
								readOnly
								value={currentPackageType?.isLimited}
							/>
							<div>Giới hạn lần mua</div>
						</div>
					</div>
					<div className="block mb-3">
						<div>
							Mô tả <span className="text-red-500">*</span>{' '}
						</div>
						<textarea
							aria-label={'Mô tả'}
							name="subtitle"
							type="text"
							value={currentPackageType?.subtitle}
							onChange={handleFormChange}
							required
							rows={5}
							className="appearance-none text-base relative block w-full px-3 py-3 ring-1 ring-gray-300 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
							placeholder={'Nhập mô tả cho gói'}
						/>
					</div>
				</div>
			</MyModal>
			<div>
				<Heading>Các gói dịch vụ</Heading>
				{studioId === '' ? (
					<div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
						{getPackageTypes().map((item, index) => (
							<AdminWidgetPricing
								className="relative break-words rounded-lg overflow-hidden shadow-md mb-4 bg-white w-full px-2 text-center py-5"
								title={item.title}
								subtitle={item.subtitle}
								price={item.price}
								id={item.id}
								key={item.id}
								maxQuantity={item.maxQuantity}
								duration={item.noOfMonths}
							>
								<div className="absolute right-2 top-2 cursor-pointer">
									<Tooltip content="Thay đổi" placement="top-end">
										<div
											role="button"
											tabIndex={0}
											onClick={() => handleOpenUpdateModal(item)}
											className="cursor-pointer"
										>
											<Pencil width={20} height={20} />
										</div>
									</Tooltip>
								</div>
							</AdminWidgetPricing>
						))}
					</div>
				) : (
					<div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
						{getPackageTypes().map((item, index) => (
							<WidgetPricing
								className="relative break-words rounded-lg overflow-hidden shadow-md mb-4 bg-white w-full px-2 text-center py-5"
								title={item.title}
								subtitle={item.subtitle}
								price={item.price}
								id={item.id}
								key={item.id}
								studioId={studioId}
								maxQuantity={item.maxQuantity}
								duration={item.noOfMonths}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

PricingComponent.propTypes = {
	packageTypes: PropTypes.array,
	studioId: PropTypes.string,
	setReload: PropTypes.func
};

export default PricingComponent;
