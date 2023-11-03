import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { Avatar, Card, CardBody, Loading, WidgetStatCard } from '../../ui';
import { Users } from 'icons/solid';

function StudioIndexPage() {
	const { data, error } = useSWR(`/api/dashboard`, fetcher);
	const [activeTab, setActiveTab] = useState('1');

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	if (error)
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load data
			</div>
		);
	if (!data)
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	return (
		<>
			<div className="flex flex-wrap -mx-2">
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title="Tổng đơn hàng"
						value={123}
						icon={<Users width={16} height={16} />}
						type={'blue'}
					/>
				</div>
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title="Đơn hàng tháng này"
						value={23}
						icon={<Users width={16} height={16} />}
						type={'gray'}
					/>
				</div>
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title={'Doanh thu tháng này'}
						value={'23,465,563'}
						icon={<Users width={16} height={16} />}
						type={'indigo'}
					/>
				</div>
				<div className="w-full md:w-2/4 lg:w-1/4 px-2">
					<WidgetStatCard
						title={'Lượt theo dõi'}
						value={'123'}
						icon={<Users width={16} height={16} />}
						type={'red'}
					/>
				</div>
			</div>
			<div>
				<Card>
					<CardBody className="flex">
          <div className="w-1/4 px-2 mb-3">
							<a className="w-full block text-gray-900 dark:text-white">
								<div className="flex justify-center">
									<Avatar
										size={48}
										src={`images/face${Math.floor(Math.random() * 7) + 1}.jpg`}
										alt={'Trung Tadashi'}
									/>
								</div>
								<div className="mt-1 flex justify-center text-center">
									<div>
										<span className="block">Trung Tadashi</span>
										<small className="text-gray-500">
											<span>Top nghệ sĩ xăm</span>
										</small>
									</div>
								</div>
							</a>
						</div><div className="w-1/4 px-2 mb-3">
							<a className="w-full block text-gray-900 dark:text-white">
								<div className="flex justify-center">
									<Avatar
										size={48}
										src={`images/face${Math.floor(Math.random() * 7) + 1}.jpg`}
										alt={'KietTattoo'}
									/>
								</div>
								<div className="mt-1 flex justify-center text-center">
									<div>
										<span className="block">KietTattoo</span>
										<small className="text-gray-500">
											<span>Top nghệ sĩ xăm</span>
										</small>
									</div>
								</div>
							</a>
						</div>
						<div className="w-1/4 px-2 mb-3">
							<a className="w-full block text-gray-900 dark:text-white">
								<div className="flex justify-center">
									<Avatar
										size={48}
										src={`images/face${Math.floor(Math.random() * 7) + 1}.jpg`}
										alt={'Keith “Bang Bang”'}
									/>
								</div>
								<div className="mt-1 flex justify-center text-center">
									<div>
										<span className="block">Keith “Bang Bang”</span>
										<small className="text-gray-500">
											<span>Top nghệ sĩ xăm</span>
										</small>
									</div>
								</div>
							</a>
						</div>
						<div className="w-1/4 px-2 mb-3">
							<a className="w-full block text-gray-900 dark:text-white">
								<div className="flex justify-center">
									<Avatar
										size={48}
										src={`images/face${Math.floor(Math.random() * 7) + 1}.jpg`}
										alt={'Bo Toee'}
									/>
								</div>
								<div className="mt-1 flex justify-center text-center">
									<div>
										<span className="block">Bo Toee</span>
										<small className="text-gray-500">
											<span>Top nghệ sĩ xăm</span>
										</small>
									</div>
								</div>
							</a>
						</div>
						<div className="w-1/4 px-2 mb-3">
							<a className="w-full block text-gray-900 dark:text-white">
								<div className="flex justify-center">
									<Avatar
										size={48}
										src={`images/face${Math.floor(Math.random() * 7) + 1}.jpg`}
										alt={'Kat Von D'}
									/>
								</div>
								<div className="mt-1 flex justify-center text-center">
									<div>
										<span className="block">Kat Von D</span>
										<small className="text-gray-500">
											<span>Top nghệ sĩ xăm</span>
										</small>
									</div>
								</div>
							</a>
						</div>
						<div className="w-1/4 px-2 mb-3">
							<a className="w-full block text-gray-900 dark:text-white">
								<div className="flex justify-center">
									<Avatar
										size={48}
										src={`images/face${Math.floor(Math.random() * 7) + 1}.jpg`}
										alt={'Dũng Tattoo'}
									/>
								</div>
								<div className="mt-1 flex justify-center text-center">
									<div>
										<span className="block">Dũng Tattoo</span>
										<small className="text-gray-500">
											<span>Top nghệ sĩ xăm</span>
										</small>
									</div>
								</div>
							</a>
						</div>
					</CardBody>
				</Card>
			</div>
		</>
	);
}

export default StudioIndexPage;
