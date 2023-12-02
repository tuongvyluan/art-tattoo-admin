import StudioInterior from 'layout/Studio/Interior';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import { Loading } from 'ui';

const InteriorPage = () => {
	const { status, data } = useSession();

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		return (
			<StudioInterior
				url={`${BASE_URL}/Interior?studioId=${data?.user?.studioId}`}
				pageSize={12}
				studioId={data?.user?.studioId}
			/>
		);
	}
};

export default InteriorPage;
