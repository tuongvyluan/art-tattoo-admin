import { Ripple } from 'ui';

const ALL_TAB = '-1';
const PENDING_TAB = '0';
const IN_PROGRESS_TAB = '1';
const CUSTOMER_CANCELLED_TAB = '2';
const STUDIO_CANCELLED_TAB = '3';
const COMPLETE_TAB = '4';
const NOT_COMPLETE_TAB = '5';

const FilterBookingStatus = ({ toggle, activeTab }) => {
	return (
		<div className="mx-auto ring-1 ring-black ring-opacity-5 bg-white">
			<div className="flex flex-row w-0 min-w-full">
				<ul className="list-none grid col-span-4 grid-flow-col place-items-center overflow-x-auto w-0 min-w-full -mb-10 pb-10">
					<li
						className={`text-center  cursor-pointer ${
							activeTab === ALL_TAB ? 'border-b-2 border-solid border-gray-700' : ''
						}`}
					>
						<button
							onClick={() => {
								toggle(ALL_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Tất cả
							<Ripple color="black" />
						</button>
					</li>
					<li
						className={`text-center cursor-pointer ${
							activeTab === PENDING_TAB
								? 'border-b-2 border-solid border-gray-700'
								: ''
						}`}
					>
						<button
							onClick={() => {
								toggle(PENDING_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Chờ xác nhận
							<Ripple color="black" />
						</button>
					</li>
					<li
						className={`text-center cursor-pointer ${
							activeTab === IN_PROGRESS_TAB
								? 'border-b-2 border-solid border-gray-700'
								: ''
						}`}
					>
						<button
							onClick={() => {
								toggle(IN_PROGRESS_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Đang thực hiện
							<Ripple color="black" />
						</button>
					</li>
					<li
						className={`text-center cursor-pointer ${
							activeTab === COMPLETE_TAB
								? 'border-b-2 border-solid border-gray-700'
								: ''
						}`}
					>
						<button
							onClick={() => {
								toggle(COMPLETE_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Hoàn thành
							<Ripple color="black" />
						</button>
					</li>
					<li
						className={`text-center cursor-pointer ${
							activeTab === CUSTOMER_CANCELLED_TAB
								? 'border-b-2 border-solid border-gray-700'
								: ''
						}`}
					>
						<button
							onClick={() => {
								toggle(CUSTOMER_CANCELLED_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Khách hàng huỷ
							<Ripple color="black" />
						</button>
					</li>
					<li
						className={`text-center cursor-pointer ${
							activeTab === STUDIO_CANCELLED_TAB
								? 'border-b-2 border-solid border-gray-700'
								: ''
						}`}
					>
						<button
							onClick={() => {
								toggle(STUDIO_CANCELLED_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Tiệm xăm huỷ
							<Ripple color="black" />
						</button>
					</li>
					<li
						className={`text-center cursor-pointer ${
							activeTab === NOT_COMPLETE_TAB
								? 'border-b-2 border-solid border-gray-700'
								: ''
						}`}
					>
						<button
							onClick={() => {
								toggle(NOT_COMPLETE_TAB);
							}}
							className="relative text-gray-900 dark:text-white hover:text-indigo py-3 px-2 sm:px-3 md:px-2 lg:px-4 block"
						>
							Đã dừng
							<Ripple color="black" />
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default FilterBookingStatus;
