import { fetcher } from 'lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Loading, Ripple } from 'ui';
import { Search } from 'icons/outline';
import debounce from 'lodash.debounce';

function BookingPage() {
	const { data, error } = useSWR(`/api/social`, fetcher);
	const router = useRouter();
	const active =
		typeof router.query['active'] !== 'undefined' ? router.query['active'] : '1';
	const [activeTab, setActiveTab] = useState(active);
	const [searchKey, setSearchKey] = useState('');

	const onSearch = (e) => {
		setSearchKey(e.target.value)
	}

	const onKeyDown = (e) => {
		handleKeyDown(e)
	}

	const handleKeyDown = debounce((e) => {
		if (e.keyCode === 13 || e.key === 'Enter') {
			console.log(searchKey)
		}
	}, 300)

	const toggle = (tab) => {
		handleToggle(tab)
	};

	const handleToggle = debounce((tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
			console.log(tab)
		}
	}, 500)

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
					<ul className="list-none grid col-span-4 grid-flow-col place-items-center overflow-x-auto w-0 min-w-full -mb-10 pb-10">
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
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
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
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
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
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
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
								className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-4 md:px-6 lg:px-8 block"
							>
								Đã huỷ
								<Ripple color="black" />
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="my-3">
				<div className="relative bg-gray-200 p-2 flex items-center px-3">
					<span className="block">
						<Search width={18} height={18} />
					</span>
					<input
						value={searchKey}
						onChange={onSearch}
						onKeyDown={onKeyDown}
						className="my-2 appearance-none relative block w-full pl-3 pr-3 border-0 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 leading-none h-5 bg-transparent"
						placeholder="Bạn có thể tìm theo tên hình xăm, tên khách hàng, hoặc ID đơn hàng"
					/>
				</div>
			</div>
		</div>
	);
}

export default BookingPage;
