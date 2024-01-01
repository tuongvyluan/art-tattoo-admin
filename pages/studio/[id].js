import StudioIndexPage from 'layout/Studio/Index';
import { ROLE } from 'lib/status';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loading } from 'ui';

const StudioDetailPage = () => {
	const router = useRouter();
	const studioId = router.query.id;
	const { status, data } = useSession();

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'unauthenticated') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated') {
		if (data.user.role === ROLE.STUDIO) {
			router.replace('/');
		}
		if (data.user.role === ROLE.ADMIN) {
			return <StudioIndexPage studioId={studioId} role={ROLE.ADMIN} />;
		} else {
			signOut();
		}
	}
};

StudioDetailPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default StudioDetailPage;
