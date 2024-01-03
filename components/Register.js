import PropTypes from 'prop-types';
import { Avatar, BackgroundImg, Link, Logo } from 'ui';

import Button from './Button';
import Heading from './Heading';
import MyInput from './MyInput';
import CldButton from './CldButton';
import { MdUpload } from 'react-icons/md';
import PickCity from './PickCity';
import { Modal } from 'flowbite-react';

const Register = ({ user, setUser, handleSubmit, avatar, setAvatar }) => {
	const handleFormChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="relative">
			<div className="absolute -top-3 -left-5 -right-10 h-screen">
				<BackgroundImg
					image={'/images/booking-img.jpg'}
					className="relative w-full h-full bg-center bg-cover bg-fallback"
				/>
				<div className="relative h-noFooter">
					<Modal size={'5xl'} position={'center'} show={true}>
						<Modal.Body>
							<div className="flex flex-col justify-center items-center px-3 bg-white max-h-body overflow-auto">
								<div className="w-full">
									<div className="w-full flex justify-center mx-0 mt-10">
										<div className="w-full px-5 flex justify-center">
											<div className="w-full">
												<div className="text-center mb-2 text-gray-700">
													<Logo height={50} width={50} />
												</div>
												<form onSubmit={handleSubmit}>
													<div className="text-center mb-2">
														<h1 className="uppercase text-2xl mb-3 font-bold leading-none">
															Art Tattoo Lover
														</h1>
														<p className="text-gray-800">
															Tạo tài khoản để mở tiệm xăm và sử dụng dịch vụ quản lí
															tiệm xăm của Art Tattoo Lover Platform
														</p>
													</div>

													<div className="grid grid-cols-1 lg:grid-cols-9 gap-5 px-10 lg:px-0">
														<div className="lg:col-span-6">
															<Heading>Tiệm xăm</Heading>
															<div className="block lg:grid grid-cols-2 gap-5">
																<div className="block mb-3.5">
																	<div className="w-full">
																		<div className="flex justify-center">
																			<div key={avatar}>
																				<Avatar
																					circular={false}
																					src={avatar}
																					alt={'avatar'}
																					size={200}
																				/>
																			</div>
																		</div>
																		<div className="flex flex-wrap items-center pt-3">
																			<div className="mx-auto">
																				<CldButton
																					onSuccess={(result, options) =>
																						setAvatar(result.info?.url)
																					}
																				>
																					<div className="flex gap-1 items-center">
																						<MdUpload size={16} />
																						<div>Thay logo</div>
																					</div>
																				</CldButton>
																			</div>
																		</div>
																	</div>
																	<div className="block mt-9 mb-3">
																		<label className="mt-1">
																			Tên tiệm xăm{' '}
																			<span className="text-red-500">*</span>{' '}
																		</label>
																		<MyInput
																			name={'studioName'}
																			value={user.studioName}
																			onChange={handleFormChange}
																			required={true}
																		/>
																	</div>
																</div>
																<div>
																	<div className="block mb-3">
																		<label>
																			Mã số thuế{' '}
																			<span className="text-red-500">*</span>{' '}
																		</label>
																		<MyInput
																			name={'studioTaxCode'}
																			value={user.studioTaxCode}
																			onChange={handleFormChange}
																			required={true}
																		/>
																	</div>
																	<div className="block mb-3">
																		<label className="block w-full">
																			Thành phố{' '}
																			<span className="text-red-500">*</span>{' '}
																		</label>
																		<PickCity
																			className="block w-full"
																			city={user.studioCity}
																			setCity={(newCity) => {
																				handleFormChange({
																					target: {
																						name: 'studioCity',
																						value: newCity
																					}
																				});
																			}}
																		/>
																	</div>
																	<div className="block mb-3">
																		<label>
																			Địa chỉ <span className="text-red-500">*</span>{' '}
																		</label>
																		<MyInput
																			name={'studioAddress'}
																			value={user.studioAddress}
																			onChange={handleFormChange}
																			required={true}
																		/>
																	</div>
																	<div className="block mb-3">
																		<label>
																			Giờ mở cửa{' '}
																			<span className="text-red-500">*</span>{' '}
																		</label>
																		<input
																			aria-label={'studioOpenTime'}
																			name={'studioOpenTime'}
																			value={user.studioOpenTime}
																			onChange={handleFormChange}
																			type="time"
																			step={1}
																			required={true}
																			className="appearance-none text-base relative block w-full px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
																		/>
																	</div>
																	<div className="block mb-3">
																		<label>
																			Giờ đóng cửa{' '}
																			<span className="text-red-500">*</span>{' '}
																		</label>
																		<input
																			aria-label={'studioCloseTime'}
																			name={'studioCloseTime'}
																			value={user.studioCloseTime}
																			onChange={handleFormChange}
																			type="time"
																			step={1}
																			required={true}
																			className="appearance-none text-base relative block w-full px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="lg:col-span-3">
															<Heading>Quản lí tiệm xăm</Heading>
															<div className="rounded-lg shadow-sm">
																<div className="block mb-3">
																	<label>
																		{'Tên'} <span className="text-red-500">*</span>
																	</label>
																	<MyInput
																		name="name"
																		value={user.name}
																		onChange={handleFormChange}
																		required
																		placeholder={'Tên'}
																	/>
																</div>
																<div className="block mb-3">
																	<label>
																		{'Số điện thoại'}{' '}
																		<span className="text-red-500">*</span>{' '}
																	</label>
																	<MyInput
																		name={'phoneNumber'}
																		value={user.phoneNumber}
																		onChange={handleFormChange}
																		type={'tel'}
																		required
																		className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
																		placeholder={'Số điện thoại'}
																	/>
																</div>
																<div className="block mb-3">
																	<label>
																		{'Email'} <span className="text-red-500">*</span>{' '}
																	</label>
																	<MyInput
																		name="email"
																		value={user.email}
																		onChange={handleFormChange}
																		type={'email'}
																		required
																		placeholder={'Email'}
																	/>
																</div>
																<div className="block mb-3">
																	<label>
																		{'Password'}{' '}
																		<span className="text-red-500">*</span>{' '}
																	</label>
																	<MyInput
																		aria-label={'Password'}
																		name="password"
																		value={user.password}
																		onChange={handleFormChange}
																		type="password"
																		required={true}
																		placeholder={'Password'}
																	/>
																</div>
																<div className="block mb-3">
																	<label>
																		{'Xác nhận password'}{' '}
																		<span className="text-red-500">*</span>{' '}
																	</label>
																	<MyInput
																		aria-label={'cpassword'}
																		name="cpassword"
																		value={user.cpassword}
																		onChange={handleFormChange}
																		type="password"
																		required
																		placeholder={'Xác nhận password'}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="flex justify-center">
														<div className="w-56">
															<Button type="submit">Đăng ký</Button>
														</div>
													</div>
												</form>
												<div className="text-center pb-3">
													<small className="text-gray-700 text-center">
														<span>{'Đã có tài khoản?'}</span>{' '}
														<Link prefetch={false} href="/auth/signin">
															<a>{'Đăng nhập tại đây'}</a>
														</Link>
													</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</div>
	);
};

Register.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	avatar: PropTypes.string.isRequired,
	setAvatar: PropTypes.func.isRequired
};

export default Register;
