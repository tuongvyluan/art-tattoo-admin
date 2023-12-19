import Button from 'components/Button';
import CldButton from 'components/CldButton';
import Heading from 'components/Heading';
import MyInput from 'components/MyInput';
import PickCity from 'components/PickCity';
import { Tooltip } from 'flowbite-react';
import { ChevronLeft } from 'icons/outline';
import { fetcher, fetcherPost, fetcherPut } from 'lib';
import { BASE_URL, TAX_CODE_API } from 'lib/env';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MdUpload } from 'react-icons/md';
import { Card, CardBody, Alert, Avatar } from 'ui';

function UpdateStudioInfo({ studio, setStudio, setIsEdit, setLoading }) {
	const { data, update } = useSession();
	const [avatar, setAvatar] = useState(studio.avatar);
	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: 'blue'
	});

	const handleAlert = (state, title, content, isWarn = 0) => {
		setShowAlert((prev) => state);
		let color;
		switch (isWarn) {
			case 1:
				color = 'green';
				break;
			case 2:
				color = 'red';
				break;
			default:
				color = 'blue';
				break;
		}
		setAlertContent({
			title: title,
			content: content,
			isWarn: color
		});
	};

	const [defaultProfile, setDefaultProfile] = useState(
		JSON.parse(JSON.stringify(studio))
	);
	const [profile, setProfile] = useState(JSON.parse(JSON.stringify(studio)));

	const handleFormChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const handleReset = () => {
		setProfile(defaultProfile);
		setAvatar(studio.avatar);
	};

	const checkValidInfo = (newStudio) => {
		let res = true;
		if (newStudio?.bioContent?.trim().length === 0) {
			res = false;
			handleAlert(
				true,
				'Cập nhật thông tin thất bại.',
				'Mục giới thiệu của tiệm xăm không được để trống.',
				2
			);
		}
		return res;
	};

	const handleUpdateStudio = async (newStudio) => {
		handleAlert(true, '', 'Đang cập nhật studio.');
		let validTax = studio.isAuthorized;
		if (newStudio.taxCode !== studio.taxCode) {
			await fetcher(`${TAX_CODE_API}/${newStudio.taxCode}`).then((data) => {
				if (data.code === '00') {
					validTax = true;
				} else {
					validTax = false;
				}
			});
		}
		const checkedStudio = {
			...newStudio,
			isAuthorized: validTax,
			avatar: avatar
		};
		fetcherPut(`${BASE_URL}/studios/${newStudio.id}`, checkedStudio)
			.then(() => {
				setLoading(true)
				handleAlert(true, '', 'Sửa thông tin thành công.');
				update({
					...data,
					user: {
						...data?.user,
						studioName: checkedStudio.studioName,
						avatar: checkedStudio.avatar
					}
				})
			})
			.catch((e) => {
				handleAlert(true, '', 'Sửa thông tin thất bại.', 2);
			});
	};

	const handleCreateStudio = (newStudio) => {
		const newProfile = {
			...newStudio,
			ownerId: studio.ownerId
		};
		fetcherPost(`${BASE_URL}/studios`, newProfile)
			.then((response) => {
				setLoading(true)
				handleAlert(true, '', 'Sửa thông tin thành công.');
				update({
					...data,
					user: {
						...data?.user,
						studioId: response.studioId,
						studioName: newStudio.studioName,
						avatar: avatar
					}
				})
			})
			.catch((e) => {
				handleAlert(true, '', 'Sửa thông tin thất bại.', true);
			});
		handleAlert(true, '', 'Đang cập nhật studio.');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const studio = {
			...profile,
			openTime: profile.openTime,
			closeTime: profile.closeTime,
			avatar: avatar
		};
		if (checkValidInfo(studio)) {
			if (studio.id) {
				handleUpdateStudio(studio);
			} else {
				handleCreateStudio(studio);
			}
		}
	};

	return (
		<div className="relative h-full">
			<Alert
				color={alertContent.isWarn}
				className="-bottom-9 right-2 absolute"
				setShowAlert={setShowAlert}
				showAlert={showAlert}
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
				<Card>
					<CardBody>
						<div className="border-b border-gray-300 text-base flex w-full justify-between">
							<div className="flex flex-wrap gap-3 items-center">
								<div className="cursor-pointer pb-2 flex gap-1 text-gray-500 hover:text-indigo-500">
									<ChevronLeft
										onClick={() => {
											setStudio(defaultProfile);
											setIsEdit();
										}}
										width={20}
										heigh={20}
									/>
								</div>
								<Heading>Thông tin studio</Heading>
							</div>
							<div className="flex flex-wrap gap-2 items-center">
								<div>Ngừng nhận đơn hàng</div>
								<Tooltip
									content={`Ấn để ${profile.isOpened ? 'ngừng ' : ''}nhận đơn hảng`}
								>
									<div
										onClick={() =>
											handleFormChange({
												target: {
													name: 'isOpened',
													value: !profile.isOpened
												}
											})
										}
										className="relative cursor-pointer"
									>
										<input
											checked={!profile.isOpened}
											type="checkbox"
											readOnly
											className="hidden"
											disabled={false}
										/>
										<div className="toggle__bar h-4 bg-gray-400 rounded-full shadow-inner"></div>
										<div className="toggle__handle absolute bg-white rounded-full shadow-sm transform transition duration-150 ease-in-out"></div>
									</div>
								</Tooltip>
							</div>
						</div>
						<div className="pt-3">
							<div className="w-full min-w-min sm:w-1/2 md:w-1/3 mx-auto">
								<div className="flex justify-center">
									<div key={avatar}>
										<Avatar
											circular={false}
											src={avatar?.length > 0 ? avatar : '/images/upload-img.png'}
											alt={'avatar'}
											size={150}
										/>
									</div>
								</div>
								<div className="flex flex-wrap items-center mt-1">
									<div className="mx-auto">
										<CldButton
											onSuccess={(result, options) => setAvatar(result.info?.url)}
										>
											<div className="flex gap-1 items-center">
												<MdUpload size={16} />
												<div>Thay Avatar</div>
											</div>
										</CldButton>
									</div>
								</div>
							</div>
							<div className="flex flex-wrap items-center justify-start gap-3 mb-3 mt-3">
								<div className="w-full sm:w-2/5 lg:w-1/2 sm:pb-0 pb-6">
									<label>{'Tên'}</label>
									<MyInput
										aria-label={'studioName'}
										name="studioName"
										type="text"
										value={profile.studioName}
										onChange={handleFormChange}
										required
										placeholder={'Tên studio'}
									/>
								</div>
								<div className="w-max sm:pb-0 pb-6">
									<label>{'Mã số thuế'}</label>
									<MyInput
										aria-label={'taxCode'}
										name="taxCode"
										type="text"
										value={profile.taxCode}
										onChange={handleFormChange}
										required
										placeholder={'Mã số thuế'}
									/>
								</div>
								<div className="flex gap-5 mb-3 sm:mb-0 ">
									<div>
										<label>{'Giờ mở cửa'}</label>
										<input
											aria-label={'openTime'}
											name="openTime"
											type="time"
											step={1}
											value={profile.openTime}
											onChange={handleFormChange}
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
										/>
									</div>
									<div>
										<label>{'Giờ đóng cửa'}</label>
										<input
											aria-label={'closeTime'}
											name="closeTime"
											type="time"
											value={profile.closeTime}
											step={1}
											onChange={handleFormChange}
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
										/>
									</div>
								</div>
							</div>
							<div className="block lg:flex flex-wrap gap-2">
								<div className="block mb-3 w-52">
									<label>{'Thành phố'}</label>
									<PickCity
										city={profile.city}
										setCity={(value) =>
											handleFormChange({
												target: {
													name: 'city',
													value: value
												}
											})
										}
									/>
								</div>
								<div className="block mb-3 flex-grow">
									<label>{'Địa chỉ'}</label>
									<MyInput
										aria-label={'address'}
										name="address"
										type="text"
										value={profile.address}
										onChange={handleFormChange}
										required
										placeholder={'Địa chỉ'}
									/>
								</div>
							</div>

							{/* <div className="block mb-3">
								<label>{'Điện thoại'}</label>
								<input
									aria-label={'phoneNumber'}
									name="owner.phoneNumber"
									type="tel"
									value={profile.owner.phoneNumber}
									onChange={handleFormChange}
									required
									className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
									placeholder={'Điện thoại'}
								/>
							</div> */}

							<div className="block mb-3">
								<label>{'Giới thiệu'}</label>
								<textarea
									aria-label={'bioContent'}
									name="bioContent"
									type="text"
									value={profile.bioContent}
									onChange={handleFormChange}
									required
									rows={5}
									className="appearance-none text-base relative block w-full px-3 py-3 ring-1 ring-gray-600 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
									placeholder={'Nhập bio cho studio'}
								/>
							</div>
							<div className="flex justify-end gap-2">
								<div className="w-16">
									<Button onClick={handleReset} type="reset" outline>
										Reset
									</Button>
								</div>
								<div className="w-16">
									<Button onClick={handleFormSubmit}>Lưu</Button>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}

UpdateStudioInfo.propTypes = {
	studio: PropTypes.object.isRequired,
	setIsEdit: PropTypes.func,
	setStudio: PropTypes.func,
	setLoading: PropTypes.func
};

export default UpdateStudioInfo;
