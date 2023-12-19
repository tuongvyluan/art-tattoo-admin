import StudioCustomerListPage from 'layout/Studio/CustomerListPage';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Loading } from 'ui';

const StudioCustomerList = () => {
	const { data, status } = useSession();

  if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'unauthenticated' || data.user.role !== ROLE.STUDIO) {
		Router.replace('/')
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

  if (status === 'authenticated') {
		return <StudioCustomerListPage studioId={data.user.studioId} />
	}
};

export default StudioCustomerList;
