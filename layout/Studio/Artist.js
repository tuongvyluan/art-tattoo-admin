import { fetcher, fetcherPost, fetcherPut } from 'lib';
import { BASE_URL } from 'lib/env';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Avatar, Card, CardBody, Loading } from 'ui';
import CryptoJS from 'crypto-js';
import Button from 'components/Button';

const ENCRYPT_SECRET = 'qo7r0q3yrwfdngposdgv';

const StudioArtist = ({ studioId }) => {
	const [studio, setStudio] = useState({
		id: null,
		ownerId: '',
		studioName: '',
		address: '',
		bioContent: '',
		openTime: '08:00',
		closeTime: '20:00',
		certificate: null,
		isAuthorized: false,
		isPrioritized: false,
		status: 0,
		artists: [],
		bookings: []
	});
	const [artistKey, setArtistKey] = useState('');

	const handleAddArtist = () => {
		const keyValue = CryptoJS.AES.decrypt(artistKey, ENCRYPT_SECRET);
		const artistId = JSON.parse(keyValue.toString(CryptoJS.enc.Utf8))?.id;
		if (artistId) {
			fetcherPost(`${BASE_URL}/artists/${studio.id}/studio-artist/${artistId}`).then(
				(data) => {
					setStudio({
						...studio,
						id: null
					});
				}
			).finally(() => {
				setArtistKey('')
			})
		}
	};

	const removeArtist = (artistId) => {
		fetcherPut(
			`${BASE_URL}/artists/${studioId}/studio-artist-deleted/${artistId}`
		).then((data) => {
			setStudio({
				...studio,
				id: null
			});
		});
	};

	if (studioId && !studio.id) {
		fetcher(`${BASE_URL}/studios/${studioId}`).then((response) => {
			setStudio({
				...studio,
				id: studioId,
				ownerId: response.artistId,
				artists: response.studioArtists.filter((artist) => {
					return artist.artist.artist.status === 0;
				}),
				bookings: response.bookings
			});
		});
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}
	return (
		<div>
			{studio.artists && studio.artists.length > 0 ? (
				<div>
					<Card>
						<CardBody className="flex">
							{studio.artists?.map((artist, artistIndex) => (
								<div key={artist.id} className="w-1/4 px-2 mb-3">
									<a className="w-full block text-gray-900 dark:text-white">
										<div className="flex justify-center">
											<Avatar
												size={48}
												src={
													artist.artist.avatar
														? artist.artist.avatar
														: '/images/ATL.png'
												}
												alt={artist.artist.fullName}
											/>
										</div>
										<div className="mt-1 flex justify-center text-center">
											<div>
												<span className="block">
													{artist.artist.fullName}
												</span>
											</div>
										</div>
									</a>
									{/* <div className="mx-auto w-max pt-2">
										<Button onClick={() => removeArtist(artist.artist.id)}>
											Ngừng hợp tác
										</Button>
									</div> */}
								</div>
							))}
						</CardBody>
					</Card>
				</div>
			) : (
				<div className="flex items-center justify-center h-full">
					Bạn đang chưa có nghệ sĩ nào, vào trang nghệ sĩ để nhập key từ nghệ sĩ và
					thêm họ vào tiệm xăm của mình nhé.
				</div>
			)}
			<div className="flex items-center justify-center h-full">
				<div className="block mb-3">
					<label className="font-semibold py-2">
						Nhập key của nghệ sĩ để thêm nghệ sĩ mới
					</label>
					<div className="flex gap-2 py-2 items-center">
						<input
							type="value"
							value={artistKey}
							onChange={(e) => setArtistKey(e.target.value)}
							className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
						/>
						<div onClick={() => handleAddArtist()} className="w-16">
							<Button>Thêm</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

StudioArtist.propTypes = {
	studioId: PropTypes.string
};

export default StudioArtist;
