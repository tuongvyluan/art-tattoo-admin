import Dashboard from 'components/Dashboard';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Loading } from '../ui';
import { ROLE } from '../lib/role'
import Router from 'next/router';
import StudioIndexPage from '../layout/Studio/Index';

const DashboardPage = () => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') {
			Router.replace('/auth/signin');
		}
	}, [status]);
	if (status === 'authenticated') {
		if (data.user.role === ROLE.ADMIN) {
			return <div>ADMIN</div>
		}
		if (data.user.role === ROLE.STUDIO) {
			return <StudioIndexPage />
		}
		return <Dashboard />;
	}
	return (
		<div className="flex items-center justify-center h-full">
			<Loading />
		</div>
	);
};

DashboardPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default DashboardPage;
