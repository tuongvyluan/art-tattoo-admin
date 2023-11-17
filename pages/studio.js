import AdminStudioPage from 'layout/Admin/Studio';
import StudioInfo from 'layout/Studio/Profile';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Loading } from 'ui';

const StudioPage = () => {
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [studio, setStudio] = useState({
		id: null,
		ownerId: '',
		studioName: '',
		address: '',
		bioContent: '',
		openTime: null,
		closeTime: null,
		certificate: null,
		isAuthorized: false,
		isPrioritized: false,
		status: 0
	});
	const handleSubmit = (newStudio) => {
		console.log(newStudio)
	}
	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated') {
		if (data.user.role === ROLE.STUDIO) {
			if (studio.ownerId === '') {
				setStudio({
					...studio,
					ownerId: data.user.id
				});
			}
			if (!data.user.studioId && loading) {
        // Studio manager create his account but not the studio entity
				setLoading(false);
			} else if (loading) {
					fetcher(`${BASE_URL}/studios/${data.user.studioId}`).then((data) => {
            setStudio(data)
            setLoading(false)
					});
				
			}
			if (loading) {
				return (
					<div className="flex items-center justify-center h-full">
						<Loading />
					</div>
				);
			}
			return <StudioInfo handleSubmit={handleSubmit} studio={studio} />;
		}
		if (data.user.role === ROLE.ADMIN) {
			return <AdminStudioPage />;
		}
	} else {
		Router.replace('/');
	}
};

export default StudioPage;
