import { Avatar, Dropdown, DropdownMenu, DropdownToggle, Link } from 'ui';
import { signOut, useSession } from 'next-auth/react';
import { Logout, MenuAlt1, User } from 'icons/solid';

import PropTypes from 'prop-types';
import { useAppState } from 'components/AppProvider';
import { roleString } from 'lib/status';

const Header = ({ toggleOpen }) => {
	const { data } = useSession();
	const [state, dispatch] = useAppState();

	return (
		<nav
			className={`bg-white dark:bg-gray-600 shadow-sm z-20 md:z-30 h-header ${
				state.stickyHeader ? 'sticky top-0' : 'relative'
			}`}
		>
			<div className="w-full mx-auto h-full">
				<div className="relative flex items-center justify-between md:justify-end h-full">
					<div className="flex flex-wrap gap-2 items-center">
						<a
							className="flex md:hidden items-center flex-shrink-0 px-4 cursor-pointer text-gray-900"
							onClick={toggleOpen}
						>
							<MenuAlt1 width={18} height={18} strokeWidth={2} />
						</a>
					</div>
					<div className="inset-y-0 right-0 items-center px-4 sm:static sm:inset-auto flex h-full">
						<Dropdown className="px-3 relative h-full flex items-center">
							<DropdownToggle>
								<div className="flex flex-wrap gap-2 items-center">
									<div className="flex justify-center">
										<Avatar
											size={32}
											src={
												data?.user?.avatar ? data.user.avatar : `/images/avatar.png`
											}
											alt={data ? data?.user?.fullName : 'Unknown'}
										/>
									</div>
									<div>
										<div className="font-semibold">
											{data?.user?.studioName
												? data?.user?.studioName
												: data?.user?.fullName}
										</div>
										<div>
											{typeof data?.user.role !== 'undefined' ? roleString.at(data?.user?.role) : ''}
										</div>
									</div>
								</div>
							</DropdownToggle>
							<DropdownMenu>
								<div className="py-1">
									<Link prefetch={false} href="/studio">
										<div className="flex cursor-pointer items-center px-5 py-3 leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
											<User width={16} height={16} />{' '}
											<span className="ml-3">Hồ sơ</span>
										</div>
									</Link>
									<a
										href="#"
										onClick={() => signOut()}
										className="flex items-center px-5 py-3 leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out border-t border-1 border-gray-100"
									>
										<Logout width={16} height={16} />{' '}
										<div className="ml-3">Đăng xuất</div>
									</a>
								</div>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</div>
		</nav>
	);
};

Header.propTypes = {
	toggleOpen: PropTypes.func
};

export default Header;
