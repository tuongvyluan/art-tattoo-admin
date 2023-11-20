import Button from 'components/Button';
import { fetcherPost, fetcherPut } from 'lib';
import { BASE_URL } from 'lib/env';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardBody, Alert } from 'ui';

function StudioInfo({ studio }) {
	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

	const handleAlert = (state, title, content, isWarn = false) => {
		setShowAlert((prev) => state);
		setAlertContent({
			title: title,
			content: content,
			isWarn: isWarn
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
	};

	const handleSubmit = (newStudio) => {
		if (newStudio.id) {
			fetcherPut(`${BASE_URL}/studios/${newStudio.id}`, newStudio)
				.then(() => {
					setDefaultProfile(profile);
					handleAlert(true, '', 'Sửa thông tin thành công.');
				})
				.catch((e) => {
					handleAlert(true, '', 'Sửa thông tin thất bại.', true);
				});
			handleAlert(true, '', 'Đang cập nhật studio.');
		} else {
			fetcherPost(`${BASE_URL}/studios`, newStudio)
				.then((response) => {
					setDefaultProfile(profile);
					handleAlert(true, '', 'Tạo studio thành công.');
					data.user.studioId = response.studioId;
				})
				.catch((e) => {
					console.log(e);
					handleAlert(true, '', 'Tạo studio thất bại.', true);
				});
			handleAlert(true, '', 'Đang tạo studio.');
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleSubmit({
			...profile,
			openTime: profile.openTime,
			closeTime: profile.closeTime
		});
	};

	return (
		<div className="relative h-full">
			<Alert
				color={alertContent.isWarn ? 'red' : 'blue'}
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
						<h1 className="border-b border-gray-300 pb-3 text-base">
							Thông tin studio
						</h1>
						<form method="post" className="pt-3" onSubmit={handleFormSubmit}>
							<div className="flex flex-wrap items-center justify-between mb-3">
								<div className="w-full sm:w-2/5 lg:w-1/2 sm:pb-0 pb-6">
									<label>{'Tên'}</label>
									<input
										aria-label={'studioName'}
										name="studioName"
										type="text"
										value={profile.studioName}
										onChange={handleFormChange}
										required
										className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
										placeholder={'Tên studio'}
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
							<div className="block mb-3">
								<label>{'Địa chỉ'}</label>
								<input
									aria-label={'address'}
									name="address"
									type="text"
									value={profile.address}
									onChange={handleFormChange}
									required
									className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
									placeholder={'Địa chỉ'}
								/>
							</div>
							<div className="block mb-3">
								<label>{'Bio'}</label>
								<textarea
									aria-label={'bioContent'}
									name="bioContent"
									type="text"
									value={profile.bioContent}
									onChange={handleFormChange}
									required
									rows={5}
									className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
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
									<Button>Lưu</Button>
								</div>
							</div>
						</form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}

StudioInfo.propTypes = {
	studio: PropTypes.object.isRequired
};

export default StudioInfo;
