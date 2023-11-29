import AdminStudioPage from 'layout/Admin/Studio';
import StudioInfo from 'layout/Studio/Profile';
import { fetcher, fetcherPost, fetcherPut } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';

const StudioPage = () => {
	const { status, data } = useSession();
	const [loading, setLoading] = useState(true);
	const [studio, setStudio] = useState(undefined);

	const handleSubmit = (newStudio) => {
		if (newStudio.id) {
			fetcherPut(`${BASE_URL}/studios/${newStudio.id}`, newStudio)
				.then((data) => {
					console.log(data);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			fetcherPost(`${BASE_URL}/studios`, newStudio)
				.then((response) => {
					console.log(response);
					data.user.studioId = response.studioId;
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};
	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	if (status === 'unauthenticated') {
		Router.replace('/')
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
			if (data.user.studioId && loading) {
				fetcher(`${BASE_URL}/studios/${data.user.studioId}`).then((data) => {
					setLoading(false);
					setStudio(data);
				});
			} else if (!data.user.studioId) {
				const studio = {
					id: undefined,
					ownerId: data.user.id,
					studioName: '',
					address: '',
					bioContent: '',
					owner: {
						phoneNumber: ''
					},
					openTime: '08:00:00',
					closeTime: '20:00:00',
					certificate: null,
					isAuthorized: false,
					isPrioritized: false,
					status: 0
				};
				return <StudioInfo handleSubmit={handleSubmit} studio={studio} />;
			}
			if (loading) {
				return (
					<div className="flex items-center justify-center h-full">
						<Loading />
					</div>
				);
			} else {
				return <StudioInfo handleSubmit={handleSubmit} studio={studio} />;
			}
		} else {
			signOut();
		}
	}
};

StudioPage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default StudioPage;
