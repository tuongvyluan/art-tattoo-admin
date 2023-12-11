const { useSession } = require('next-auth/react');
import TattooListNotFilter from 'layout/Studio/TattooListNotFilter';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
const { Loading } = require('ui');

const TattooList = () => {
	// Check authenticated
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
			<TattooListNotFilter
				url={`${BASE_URL}/TattooArts/TattooUser?studioId=${data?.user?.studioId}&accountId=${data?.user?.id}`}
				pageSize={12}
				studioId={data?.user?.studioId}
			/>
		);
	}
};

export default TattooList;
