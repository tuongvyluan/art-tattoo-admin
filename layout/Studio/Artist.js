import { fetcher, fetcherPost, fetcherPut } from 'lib';
import { BASE_URL } from 'lib/env';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Alert, Avatar, Card, CardBody, Loading } from 'ui';
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
	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: 'blue'
	});

	const handleAlert = (state, title, content, isWarn = 0) => {
		setShowAlert((prev) => state);
		let color;
		switch (isWarn) {
			case 1:
				color = 'green';
				break;
			case 2:
				color = 'red';
				break;
			default:
				color = 'blue';
				break;
		}
		setAlertContent({
			title: title,
			content: content,
			isWarn: color
		});
	};

	const handleAddArtist = () => {
		const keyValue = CryptoJS.AES.decrypt(artistKey, ENCRYPT_SECRET);
		const artistId = JSON.parse(keyValue?.toString(CryptoJS.enc.Utf8))?.id;
		let success = false;

		if (artistId) {
			const comparison =
				Date.now() -
				JSON.parse(keyValue?.toString(CryptoJS.enc.Utf8))?.key -
				15 * 60 * 1000;
			if (comparison <= 0) {
				success = true;
				handleAlert(
					true,
					'Đang thêm nghệ sĩ',
					'',
					0
				);
				fetcherPost(`${BASE_URL}/artists/${studio.id}/studio-artist/${artistId}`)
					.then((data) => {
						setStudio({
							...studio,
							id: null
						});
						handleAlert(
							true,
							'Thêm nghệ sĩ thành công',
							'',
							1
						);
					})
					.catch((e) => {
						handleAlert(
							true,
							'Thêm nghệ sĩ thất bại',
							'Key không hợp lệ hoặc đã quá hạn 15 phút kể từ khi tạo key, hãy hỏi nghệ sĩ để lấy key mới',
							2
						);
					})
					.finally(() => {
						setArtistKey('');
					});
			}
		}
		if (!success) {
			handleAlert(
				true,
				'Thêm nghệ sĩ thất bại',
				'Key không hợp lệ hoặc đã quá hạn 15 kể từ khi tạo key, hãy hỏi nghệ sĩ để lấy key mới',
				2
			);
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
		<div className="relative min-h-body">
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn}
				className="bottom-2 right-2 absolute"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
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
												<span className="block">{artist.artist.fullName}</span>
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
