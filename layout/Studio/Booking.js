import { fetcher } from 'lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Loading, Ripple } from 'ui';

function BookingPage() {
	const { data, error } = useSWR(`/api/social`, fetcher);
	const router = useRouter();
	const active =
		typeof router.query['active'] !== 'undefined' ? router.query['active'] : '1';
	const [activeTab, setActiveTab] = useState(active);

	useEffect(() => {
		router.push({ query: { active: activeTab } });
	}, [activeTab]);

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
		<div className="sm:px-12 md:px-16 lg:px-32 xl:px-56">
			<div className="mx-auto ring-1 ring-black ring-opacity-5 bg-white">
				<div className="flex flex-row w-0 min-w-full">
					<ul className="list-none grid col-span-4 grid-flow-col overflow-x-auto w-0 min-w-full -mb-10 pb-10">
						<li
							className={`text-center  cursor-pointer ${
								activeTab === '1' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
						>
							<a
								onClick={() => {
									toggle('1');
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-8 block"
							>
								Tất cả
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === '2' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
						>
							<a
								onClick={() => {
									toggle('2');
								}}
								href="#"
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-8 block"
							>
								Đang thực hiện
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === '3' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
						>
							<a
								href="#"
								onClick={() => {
									toggle('3');
								}}
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-8 block"
							>
								Hoàn thành
								<Ripple color="black" />
							</a>
						</li>
						<li
							className={`text-center cursor-pointer ${
								activeTab === '4' ? 'border-b-2 border-solid border-indigo-500' : ''
							}`}
						>
							<a
								href="#"
								onClick={() => {
									toggle('4');
								}}
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-8 block"
							>
								Đã huỷ
								<Ripple color="black" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default BookingPage;
