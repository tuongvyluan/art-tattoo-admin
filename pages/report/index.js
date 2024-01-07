import AdminReport from 'layout/Admin/Report';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import { Loading } from 'ui';

const ReportPage = () => {
	const { status, data } = useSession();
	if (status !== 'authenticated' || data.user.role !== ROLE.ADMIN) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	return <AdminReport />;
};

ReportPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default ReportPage;
