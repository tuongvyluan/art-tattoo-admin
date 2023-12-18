import Button from 'components/Button';
import Heading from 'components/Heading';
import { Tooltip } from 'flowbite-react';
import { formatTimeWithoutSecond } from 'lib';
import { cityMap } from 'lib/city';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardBody, Avatar } from 'ui';
import UpdateStudioInfo from './UpdateStudioInfo';

function StudioInfo({ studio }) {
	const [profile, setProfile] = useState(studio)
	const [avatar, setAvatar] = useState(profile.avatar);
	const [isEdit, setIsEdit] = useState(false);

	return (
		<div className="relative h-full">
			{isEdit ? (
				<UpdateStudioInfo studio={profile} setStudio={setProfile} setIsEdit={() => setIsEdit(false)} />
			) : (
				<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
					<Card>
						<CardBody>
							<div className="border-b border-gray-300 text-base flex w-full justify-between">
								<Heading>Thông tin profile</Heading>
								<div className="flex flex-wrap gap-2 items-center">
									<div>Ngừng nhận đơn hàng</div>
									<Tooltip
										content={`${
											profile.isOpened ? 'Đang  ' : 'Đang ngừng '
										}nhận đơn hảng`}
									>
										<div className="relative cursor-pointer">
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
												src={avatar ? avatar : '/images/upload-img.png'}
												alt={'avatar'}
												size={150}
											/>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap items-center justify-start gap-3 mb-3 mt-3">
									<div className="w-full flex flex-wrap gap-1 items-end sm:w-2/5 lg:w-1/2 sm:pb-0 pb-6">
										<label className="w-20">{'Tên:'}</label>
										<div className="text-base">{profile.studioName}</div>
									</div>
									<div className="w-max flex flex-wrap gap-1 items-end sm:pb-0 pb-6">
										<label className="w-20">{'Mã số thuế:'}</label>
										<div className="text-base">{profile.taxCode}</div>
									</div>
								</div>
								<div className="flex gap-3 mb-3 sm:mb-0 ">
									<div className="w-full flex flex-wrap gap-1 items-end sm:w-2/5 lg:w-1/2 sm:pb-0 pb-6">
										<label className="w-20">{'Giờ mở cửa:'}</label>
										<div className="text-base">
											{formatTimeWithoutSecond(profile.openTime)}
										</div>
									</div>
									<div className=" flex flex-wrap gap-1 items-end">
										<label>{'Giờ đóng cửa:'}</label>
										<div className="text-base">
											{formatTimeWithoutSecond(profile.closeTime)}
										</div>
									</div>
								</div>
								<div className="mb-3 flex flex-wrap gap-1 items-end pt-3">
									<label className="w-20">{'Thành phố:'}</label>
									<div className="text-base">{cityMap.get(profile.city)}</div>
								</div>
								<div className="mb-3 flex flex-wrap gap-1 items-end">
									<label className="w-20">{'Địa chỉ:'}</label>
									<div className="text-base">{profile.address}</div>
								</div>

								<div className=" flex flex-wrap gap-1 items-end mb-3">
									<label className="w-20">{'Bio:'}</label>
									<div className="text-base">{profile.bioContent}</div>
								</div>
								<div className="flex justify-end gap-2">
									<div className="w-16">
										<Button onClick={() => setIsEdit(true)}>Sửa</Button>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			)}
		</div>
	);
}

StudioInfo.propTypes = {
	studio: PropTypes.object.isRequired
};

export default StudioInfo;
