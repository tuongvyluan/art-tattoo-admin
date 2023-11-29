import TattooDetailsPage from 'layout/Studio/TattooDetailsPage';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';
import { v4 } from 'uuid';

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

	if (!artTattoo) {
		if (id !== 'new') {
			fetcher(`${BASE_URL}/TattooArts/Details?id=${id}&is`).then((data) => {
				// Get all stages from medias
				const stageMap = new Map(
					data.medias.map((obj) => {
						return [
							obj.tattooArtStageId,
							{
								id: obj.tattooArtStageId,
								name: obj.stageName,
								description: obj.description ? obj.description : '',
								medias: [],
								saved: true
							}
						];
					})
				);

				// Push medias to related stage
				data.medias.map((obj) => {
					const value = stageMap.get(obj.tattooArtStageId);
					value.medias.push({ ...obj, saved: true }); // saved field to note that this image has been saved to db
					stageMap.set(obj.tattooArtStageId, value);
				});
				const renderData = {
					...data,
					stages: Array.from(stageMap, ([id, value]) => value),
					bookingDetails: data.bookingDetails.map((bookingDetail) => {
						return {
							...bookingDetail,
							saved: true
						}
					})
				};
				setArtTattoo(renderData);
				setArtist(renderData.artist);
			});
		} else {
			setArtTattoo({
				id: '',
				artistId: '',
				styleId: 1,
				bookingId: booking,
				description: '',
				size: 1,
				placement: 0,
				isPublicized: false,
				status: 0,
				totalRevenue: 0,
				thumbnail: '',
				medias: [],
				bookingDetails: [{
					bookingDetailsId: v4(),
					operationId: 0,
					price: 0,
					saved: false,
					paymentId: null
				}],
				stages: []
			});
		}
	}

	const handleSubmit = (newArtTattoo) => {
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
