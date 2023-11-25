import TattooDetailsPage from 'layout/Studio/TattooDetailsPage';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';

const TattooDetails = () => {
	// Check authenticated
	const { status, data } = useSession();
	const router = useRouter();
	const booking =
		typeof router.query['booking'] !== 'undefined' ? router.query['booking'] : '';
	const { id } = router.query;
	const [artTattoo, setArtTattoo] = useState(undefined);
	const [artist, setArtist] = useState(undefined);
	const [artistList, setArtistList] = useState(undefined);

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (!artistList) {
		fetcher(`${BASE_URL}/artists/${data.user.studioId}/artist-studio-list`)
			.then((data) => {
				setArtistList(data);
			})
			.catch((e) => {
				setArtistList([]);
			});
	}

	if (id !== 'new' && !artTattoo) {
		fetcher(`${BASE_URL}/TattooArts/Details?id=${id}&is`).then((data) => {
			const stageMap = new Map(
				data.medias.map((obj) => {
					return [
						obj.tattooArtStageId,
						{
							id: obj.tattooArtStageId,
							name: obj.stageName,
							description: obj.description ? obj.description : '',
							medias: []
						}
					];
				})
			);
			data.medias.map((obj) => {
				const value = stageMap.get(obj.tattooArtStageId);
				value.medias.push({ ...obj, saved: true }); // saved field to note that this image has been saved to db
				stageMap.set(obj.tattooArtStageId, value);
			});
			const renderData = {
				...data,
				stages: Array.from(stageMap, ([id, value]) => value)
			};
			if (renderData.stages.length === 0) {
				renderData.stages.push({
					id: 1,
					name: 'Sau khi xăm',
					description: '',
					medias: []
				});
			}
			setArtTattoo(renderData);
			setArtist(renderData.artist);
		});
	}

	const handleSubmit = (newArtTattoo) => {
		if (id === 'new') {
			console.log('Create');
		} else {
			console.log('Update');
		}
		setArtTattoo(newArtTattoo);
		console.log(newArtTattoo);
	};

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
		if ((id !== 'new' && (!artTattoo || !artist)) || !artistList) {
			return (
				<div className="flex items-center justify-center h-full">
					<Loading />
				</div>
			);
		}
		return (
			<TattooDetailsPage
				artistList={artistList}
				bookingId={booking}
				artTattoo={artTattoo}
				artist={artist}
				handleSubmit={handleSubmit}
			/>
		);
	} else {
		Router.replace('/');
	}
};

TattooDetails.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default TattooDetails;
