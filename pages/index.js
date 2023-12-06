import { signOut, useSession } from 'next-auth/react';
import { Loading } from '../ui';
import { ROLE } from '../lib/status';
import StudioIndexPage from '../layout/Studio/Index';
import Router from 'next/router';
import AdminIndexPage from 'layout/Admin/Index';

const Index = () => {
	// Check authenticated
	const { status, data } = useSession();

	if (status === 'authenticated') {
		if (data.user.role === ROLE.ADMIN) {
			return <AdminIndexPage />
		}
		if (data.user.role === ROLE.STUDIO) {
			if (data.user.studioId) {
				return <StudioIndexPage studioId={data.user.studioId} />;
			} else {
				Router.replace('/studio');
				return (
					<div className="flex items-center justify-center h-full">
						<Loading />
					</div>
				);
			}
		}
		signOut();
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
