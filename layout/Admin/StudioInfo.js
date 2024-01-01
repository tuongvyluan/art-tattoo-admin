import MyRating from 'components/MyRating';
import PropTypes from 'propTypes';
import Heading from 'components/Heading';
import { ChevronLeft } from 'icons/outline';
import { FiClock, FiHome, FiPhone } from 'react-icons/fi';
import { Avatar, Card, CardBody } from 'ui';
import Link from 'next/link';
import { formatPhoneNumber, formatTimeWithoutSecond } from 'lib';

const AdminStudioInfo = ({ studio }) => {
	return (
		<Card>
			<CardBody>
				{
					// Studio header
				}
				<div className="flex gap-2 items-center border-b border-gray-300">
					<Link href={'/studio'}>
						<div className="cursor-pointer flex gap-1 text-gray-500 hover:text-indigo-500 pb-2">
							<ChevronLeft width={20} heigh={20} />
						</div>
					</Link>
					<Heading>{studio.studioName}</Heading>
				</div>
				{
					// Studio Info
				}
				<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start pt-4">
					<div className="cursor-pointer text-center w-max mx-auto">
						<div>
							<Avatar
								size={120}
								src={studio.avatar ? studio.avatar : '/images/avatar.png'}
								alt={studio.studioName}
							/>
						</div>
					</div>
					<div className={`block`}>
						<div className="pb-5">
							<div className="flex gap-2 py-2 text-base items-center">
								<div>
									<FiHome size={20} />
								</div>
								<div>{studio.address}</div>
							</div>
							<div className="flex gap-2 py-2 text-base items-center">
								<div>
									<FiPhone size={20} />
								</div>
								<div>{formatPhoneNumber(studio.phoneNumber)}</div>
							</div>
							<div className="flex gap-2 py-2 text-base items-center">
								<div>
									<FiClock size={20} />
								</div>
								<div>
									{formatTimeWithoutSecond(studio.openTime)} -{' '}
									{formatTimeWithoutSecond(studio.closeTime)}
								</div>
							</div>
						</div>
					</div>
					<div>
						<h1 className="font-semibold text-base pb-2">Giới thiệu</h1>
						<div>
							{studio.bioContent?.trim().length > 0
								? studio.bioContent?.trim()
								: 'Chưa có giới thiệu'}
						</div>

						<h1 className="font-semibold text-base pt-3 pb-2">Đánh giá</h1>

						<div className="flex flex-wrap gap-2 items-center text-base">
							<MyRating
								allowFraction={true}
								readonly={true}
								rating={studio.rating ? studio.rating : 0}
							/>
							<div>
								{studio.rating !== null
									? `Đánh giá: ${studio.rating}/5`
									: 'Chưa có đánh giá'}
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

AdminStudioInfo.propTypes = {
	studio: PropTypes.object
};

export default AdminStudioInfo;
