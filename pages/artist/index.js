import StudioArtist from 'layout/Studio/Artist';
import { ROLE } from 'lib/status';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { Loading } from 'ui';

const ArtistPage = () => {
	const { status, data } = useSession();

	if (status === 'authenticated') {
		if (data.user.role === ROLE.ADMIN) {
			return <div>ADMIN</div>;
		}
		if (data.user.role === ROLE.STUDIO) {
			if (data.user.studioId) {
				return <StudioArtist studioId={data.user.studioId} />;
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

export default ArtistPage;
