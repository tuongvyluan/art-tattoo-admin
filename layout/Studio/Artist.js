import { fetcher, fetcherPost, fetcherPut } from 'lib';
import { API_SECRET, BASE_URL } from 'lib/env';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Alert, Avatar, Card, CardBody } from 'ui';
import CryptoJS from 'crypto-js';
import Button from 'components/Button';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Heading from 'components/Heading';
import { Tooltip } from 'flowbite-react';
import Link from 'next/link';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const StudioArtist = ({ studioId }) => {
	const [artistList, setArtistList] = useState([]);
	const [artistKey, setArtistKey] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 15;

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

	const handleAddArtist = async () => {
		let success = false;
		const keyValue = CryptoJS.AES.decrypt(artistKey, API_SECRET);
		const artistId = JSON.parse(keyValue?.toString(CryptoJS.enc.Utf8))?.id;

		if (artistId) {
			const comparison =
				Date.now() -
				JSON.parse(keyValue?.toString(CryptoJS.enc.Utf8))?.key -
				15 * 60 * 1000;
			if (comparison <= 0) {
				success = true;
				handleAlert(true, 'Đang thêm nghệ sĩ', '', 0);
				await fetcherPost(
					`${BASE_URL}/artists/${studioId}/studio-artist/${artistId}`
				)
					.then((data) => {
						handleAlert(true, 'Thêm nghệ sĩ thành công', '', 1);
					})
					.catch((e) => {
						success = false;
						handleAlert(
							true,
							'Thêm nghệ sĩ thất bại',
							'Nghệ sĩ này hiện đã thuộc về tiệm xăm.',
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
				'Key không hợp lệ hoặc đã quá hạn 15 phút kể từ khi tạo key, hãy hỏi nghệ sĩ để lấy key mới',
				2
			);
		}
	};

	const removeArtist = (artistId) => {
		fetcherPut(`${BASE_URL}/artists/${studioId}/studio-artist-deleted/${artistId}`);
	};

	const getArtistStyle = (styles) => {
		const length = styles?.length;
		if (length === 0) {
			return 'Không có';
		}
		let showLength = length > 3 ? 3 : length
		let styleString = styles.at(0).name;
		let i = 1;
		for (i; i < showLength; i++) {
			styleString += `, ${styles.at(i).name}`;
		}
		if (showLength < length) {
			styleString += ',...'
		}
		return styleString;
	};

	useEffect(() => {
		fetcher(
			`${BASE_URL}/artists/${studioId}/artist-studio-list?page=${currentPage}&pageSize=${pageSize}`
		).then((response) => {
			setArtistList(response);
		});
	}, []);

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
			<div className="sm:px-8 md:px-1 lg:px-6 xl:px-32">
				<Card>
					<CardBody>
						<Heading>Nghệ sĩ</Heading>
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
						{artistList && artistList.length > 0 ? (
							<div className="w-full overflow-auto relative shadow-md sm:rounded-lg mb-5 text-base">
								<table className="w-full min-w-3xl text-left text-gray-500">
									<thead>
										<tr>
											<th scope="col" className="px-3 py-3 bg-gray-50">
												Tên nghệ sĩ
											</th>
											<th scope="col" className="px-3 py-3 bg-gray-50">
												Style
											</th>
											{/* <th scope="col" className="px-3 py-3 bg-gray-50">
											Ngày hợp tác
										</th>
										<th scope="col" className="px-3 py-3 bg-gray-50">
											Trạng thái
										</th> */}
											<th scope="col" className="px-3 py-3 bg-gray-50"></th>
										</tr>
									</thead>
									<tbody>
										{artistList.map((artist, artistIndex) => (
											<tr
												key={artist.id}
												className={`hover:bg-gray-50 
											${
												''
												//artist?.dismissedAt === null ? '' : 'bg-gray-200 opacity-40'
											}
											`}
											>
												<td className="px-3 py-4 flex flex-wrap items-center gap-2">
													<Avatar src={artist.avatar} size={50} />
													<div>{artist?.fullName}</div>
												</td>
												<td className="px-3 py-4 w-1/2">
													<div>{getArtistStyle(artist.artistStyles)}</div>
												</td>
												{/* <td className="px-3 py-4">
												<div>{formatDate(artist.createdAt)}</div>
											</td>
											<td className="px-3 py-4">
												<div>
													{artist.dismissedAt !== null
														? `Ngừng hợp tác ngày ${formatDate(artist.dismissedAt)}`
														: 'Đang hợp tác'}
												</div>
											</td> */}
												<td className="px-3 py-4">
													<div className="flex flex-wrap gap-3 justify-center">
														<Tooltip content="Ngừng hợp tác">
															<IoPersonRemoveSharp
																size={25}
																className="cursor-pointer"
																onClick={() => removeArtist(artist.id)}
															/>
														</Tooltip>
														<Tooltip content='Xem trang cá nhân'>
															<Link
																href={`https://tattoolover.netlify.app/artist/${artist.id}`} target='_blank'
															>
																<HiMiniMagnifyingGlass
																	className="cursor-pointer font-bold"
																	size={20}
																/>
															</Link>
														</Tooltip>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className="flex items-center justify-center h-full">
								Bạn đang không hợp tác nghệ sĩ nào, vào trang nghệ sĩ để nhập key từ
								nghệ sĩ và thêm họ vào tiệm xăm của mình nhé.
							</div>
						)}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

StudioArtist.propTypes = {
	studioId: PropTypes.string
};

export default StudioArtist;
