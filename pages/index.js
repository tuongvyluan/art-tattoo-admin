import Dashboard from 'components/Dashboard';
import { useSession } from 'next-auth/react';
import { Loading } from '../ui';
import { ROLE } from '../lib/role'
import StudioIndexPage from '../layout/Studio/Index';

const Index = () => {

	// Check authenticated
	const { status, data } = useSession();
	
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

Index.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default Index;
