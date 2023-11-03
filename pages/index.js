import Dashboard from 'components/Dashboard';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Loading } from '../ui';
import Router from 'next/router';

const DashboardPage = () => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') {
			Router.replace('/auth/signin');
		}
	}, [status]);
	if (status === 'authenticated') {
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
