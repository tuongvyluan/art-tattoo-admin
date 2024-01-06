import { fetcher, fetcherPost, fetcherPut, formatDate } from 'lib';
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
import MyPagination from 'ui/MyPagination';
import { Calendar } from 'icons/outline';
import MyInput from 'components/MyInput';

const StudioArtist = ({ studioId }) => {
	const [artistList, setArtistList] = useState([]);
	const [artistKey, setArtistKey] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(false);
	const [reloadKey, setReloadKey] = useState(Math.random());
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
						setReloadKey(Math.random());
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
				'Key không hợp lệ hoặc đã quá hạn 15 phút kể từ khi tạo key, hãy hỏi nghệ sĩ để lấy key mới.',
				2
			);
		}
	};

	const removeArtist = (artistId) => {
		fetcherPut(`${BASE_URL}/artists/${studioId}/studio-artist-deleted/${artistId}`)
			.then(() => {
				setReloadKey(Math.random());
				handleAlert(true, 'Ngừng hợp tác với nghệ sĩ thành công', '', 0);
			})
			.catch(() => {
				handleAlert(
					true,
					'Ngừng hợp tác với nghệ sĩ thất bại.',
					'Nghệ sĩ này còn đơn hàng chưa hoàn tất. Bàn giao cho nghệ sĩ khác hoặc huỷ đơn trước khi ngừng hợp tác với nghệ sĩ.',
					2
				);
			});
	};

	const getArtistStyle = (styles) => {
		const length = styles?.length;
		if (length === 0) {
			return 'Không có';
		}
		let showLength = length > 3 ? 3 : length;
		let styleString = styles.at(0).name;
		let i = 1;
		for (i; i < showLength; i++) {
			styleString += `, ${styles.at(i).name}`;
		}
		if (showLength < length) {
			styleString += ',...';
		}
		return styleString;
	};

	useEffect(() => {
		fetcher(
			`${BASE_URL}/artists/artist-studio-list?id=${studioId}&page=${currentPage}&pageSize=${pageSize}`
		)
			.then((response) => {
				setArtistList(response.data);
				setTotalPage(Math.ceil(response.total / pageSize));
			})
			.catch(() => {
				setError(true);
			});
	}, [currentPage, reloadKey]);

	return (
		<div className="relative min-h-body">
			<div className="sm:px-8 md:px-1 lg:px-6 xl:px-16">
				<Alert
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					color={alertContent.isWarn}
					className="bottom-2 right-2 absolute z-100"
				>
					<strong className="font-bold mr-1">{alertContent.title}</strong>
					<span className="block sm:inline">{alertContent.content}</span>
				</Alert>
				<Card>
					<CardBody>
						<Heading>Nghệ sĩ</Heading>
						<div className="flex items-center justify-center h-full">
							<div className="block mb-3">
								<div className="font-semibold py-2">
									Nhập key của nghệ sĩ để thêm nghệ sĩ mới
								</div>
								<div className="flex gap-2 py-2 items-center">
									<MyInput
										value={artistKey}
										type="text"
										onChange={(e) => setArtistKey(e.target.value)}
									/>
									<div className="w-16">
										<Button onClick={() => handleAddArtist()}>Thêm</Button>
									</div>
								</div>
							</div>
						</div>
						{artistList && artistList.length > 0 && !error ? (
							<div>
								<div className="w-full overflow-auto relative shadow-md sm:rounded-lg mb-5 text-base">
									{
										// Artist list
									}
									<table className="w-full min-w-3xl text-left text-gray-500">
										<thead>
											<tr>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Tên nghệ sĩ
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Style
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Ngày hợp tác
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50">
													Trạng thái
												</th>
												<th scope="col" className="px-3 py-3 bg-gray-50"></th>
											</tr>
										</thead>
										<tbody>
											{artistList.map((artist, artistIndex) => (
												<tr
													key={artist.id}
													className={`hover:bg-gray-50
												${artist?.dismissedAt === null ? '' : 'bg-gray-200 opacity-40'}
												`}
												>
													<td className="px-3 py-4 flex flex-wrap items-center gap-2">
														<Avatar src={artist.avatar} size={50} />
														<div>{artist?.fullName}</div>
													</td>
													<td className="px-3 py-4 w-1/3">
														<div>{getArtistStyle(artist.artistStyles)}</div>
													</td>
													<td className="px-3 py-4">
														<div>{formatDate(artist.createdAt)}</div>
													</td>
													<td className="px-3 py-4">
														<div>
															{artist.dismissedAt !== null
																? `Ngừng hợp tác ngày ${formatDate(
																		artist.dismissedAt
																  )}`
																: 'Đang hợp tác'}
														</div>
													</td>
													<td className="px-3 py-4">
														<div className="flex flex-wrap gap-3 justify-end">
															{artist.dismissedAt === null && (
																<Tooltip content="Ngừng hợp tác">
																	<IoPersonRemoveSharp
																		size={25}
																		className="cursor-pointer"
																		onClick={() => removeArtist(artist.id)}
																	/>
																</Tooltip>
															)}

															{artist.dismissedAt === null && (
																<Tooltip content="Xem đơn hàng">
																	<Link
																		prefetch={false}
																		href={`/booking?artistId=${artist.id}`}
																	>
																		<a className="text-gray-500">
																			<Calendar
																				className="cursor-pointer"
																				width={25}
																				height={25}
																			/>
																		</a>
																	</Link>
																</Tooltip>
															)}

															<Tooltip content="Xem trang cá nhân">
																<Link
																	prefetch={false}
																	href={`/artist/${artist.id}`}
																	target="_blank"
																>
																	<a className="text-gray-500">
																		<HiMiniMagnifyingGlass
																			className="cursor-pointer font-bold"
																			size={20}
																		/>
																	</a>
																</Link>
															</Tooltip>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{totalPage > 0 && (
									<MyPagination
										current={currentPage}
										setCurrent={setCurrentPage}
										totalPage={totalPage}
									/>
								)}
							</div>
						) : (
							<div className="flex items-center justify-center h-full">
								{error ? (
									<div>Tải dữ liệu thất bại</div>
								) : (
									<div>
										Bạn đang không hợp tác nghệ sĩ nào, vào trang nghệ sĩ để nhập key
										từ nghệ sĩ và thêm họ vào tiệm xăm của mình nhé.
									</div>
								)}
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
