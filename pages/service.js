const { useSession } = require('next-auth/react');
import ServicePage from 'layout/Studio/Service';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import Router from 'next/router';
import useSWR from 'swr';
const { Loading } = require('ui');

const StudioService = () => {
	// Check authenticated
	const { status, data } = useSession();

	const studioId = '6CEB7498-B22A-4A8C-8E4E-499189336EC2';
	const { data: services, error } = useSWR(
		`${BASE_URL}/studios/${studioId}/services?pageSize=100`
	);

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				Failed to load chart data
			</div>
		);
	}

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		if (!services) {
			return <Loading />;
		}

		return <ServicePage services={services.services} />;
	} else {
		Router.replace('/');
	}
};

export default StudioService;
