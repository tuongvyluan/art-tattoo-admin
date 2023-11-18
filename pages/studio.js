import AdminStudioPage from 'layout/Admin/Studio';
import StudioInfo from 'layout/Studio/Profile';
import { fetcher, fetcherPost } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { Loading } from 'ui';

const StudioPage = () => {
	const { status, data } = useSession();
	const handleSubmit = (newStudio) => {
		console.log(newStudio);
		fetcherPost(`${BASE_URL}/studios`, newStudio)
			.then((data) => {
				console.log(data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'authenticated') {
		if (data.user.role === ROLE.ADMIN) {
			return <AdminStudioPage />;
		}
		if (data.user.role === ROLE.STUDIO) {
			if (data.user.studioId) {
				fetcher(`${BASE_URL}/studios/${data.user.studioId}`).then((data) => {
					return <StudioInfo handleSubmit={handleSubmit} studio={data} />;
				});
			} else {
				const studio = {
					id: null,
					ownerId: data.user.id,
					studioName: '',
					address: '',
					bioContent: '',
					openTime: '08:00',
					closeTime: '20:00',
					certificate: null,
					isAuthorized: false,
					isPrioritized: false,
					status: 0
				};
				return <StudioInfo handleSubmit={handleSubmit} studio={studio} />;
			}
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		} else {
			signOut();
		}
	} else {
		Router.replace('/');
	}
};

export default StudioPage;
