const { useSession } = require('next-auth/react');
import ServicePage from 'layout/Studio/Service';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { PLACEMENT, ROLE, SERVICE_SIZE } from 'lib/status';
import { useState } from 'react';
import { v4 } from 'uuid';
const { Loading } = require('ui');

const StudioService = () => {
	// Check authenticated
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [services, setServices] = useState([{
		id: v4(),
		name: 'Tư vấn',
		placement: PLACEMENT.ANY,
		size: SERVICE_SIZE.ANY,
		minPrice: 0,
		maxPrice: 0
	}]);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		const studioId = data.user.studioId;
		if (loading) {
			fetcher(`${BASE_URL}/studios/${studioId}/services?pageSize=100`)
				.then((data) => {
					setServices(data.services);
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
					return (
						<div className="flex items-center justify-center h-full">
							Failed to load chart data
						</div>
					);
				});
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		} else {
			return (
				<ServicePage
					onReload={() => setLoading(true)}
					studioId={studioId}
					services={services}
				/>
			);
		}
	}
};

export default StudioService;
