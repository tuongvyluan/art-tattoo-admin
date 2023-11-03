import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { Avatar, Loading, Ripple } from '../../ui';

function StudioIndexPage() {
	const { data, error } = useSWR(`/api/social`, fetcher);
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
		<div className="-mx-4">
			<div className="mx-auto">
				<div className="flex justify-between items-center py-4 px-10">
					<div className="flex items-center">
						<div>
							<Avatar size={84} src={`images/avatar.jpg`} alt={`avatar`} />
						</div>
						<div className="ltr:ml-6 rtl:mr-6">
							<div className="hidden sm:inline-block text-2xl flex items-center">
								<span className="ltr:mr-2 rtl:ml-2">Gerald Morris</span>
							</div>
							<p className="mt-2 font-hairline text-sm">123,456 followers</p>
						</div>
					</div>
				</div>
				<div className="flex flex-row overflow-hidden w-0 min-w-full">
					<ul className="list-none flex flex-row overflow-hidden w-0 min-w-full p-4 -mb-10 pb-10">
						<li
							className={`text-center  cursor-pointer ${
								activeTab === '1' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
							onClick={() => {
								toggle('1');
							}}
						>
							<a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
								Trang chủ
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === '2' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
							onClick={() => {
								toggle('2');
							}}
						>
							<a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
								Hồ sơ
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === '3' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
							onClick={() => {
								toggle('3');
							}}
						>
							<a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
								Nghệ sĩ xăm
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === '4' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
							onClick={() => {
								toggle('4');
							}}
						>
							<a className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-8 block">
								Tài khoản
								<Ripple color="black" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default StudioIndexPage;
