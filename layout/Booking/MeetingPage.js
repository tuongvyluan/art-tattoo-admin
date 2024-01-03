import Button from 'components/Button';
import Heading from 'components/Heading';
import { ChevronDown } from 'icons/outline';
import {
	fetcher,
	formatDate,
	formatDateForInput,
} from 'lib';
import { BASE_URL } from 'lib/env';
import {
	stringBookingMeetingStatus
} from 'lib/status';
import moment from 'moment';
import PropTypes from 'propTypes';
import { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'ui';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { vi } from 'date-fns/locale';
import MyPagination from 'ui/MyPagination';
import MeetingTable from 'components/MeetingTable';

const statusList = [
	{
		key: -1,
		value: 'Tất cả lịch hẹn'
	}
].concat(
	stringBookingMeetingStatus.map((bm, index) => {
		return {
			key: index,
			value: bm
		};
	})
);

const MeetingSchedule = ({ id, artist = undefined }) => {
	const [meetings, setMeetings] = useState([]);
	const [timeRange, setTimeRange] = useState({
		from: new Date(moment()),
		to: new Date(moment().add(12, 'hours').add(7, 'days'))
	});
	const [isAsc, setIsAsc] = useState(true)
	const [status, setStatus] = useState(-1);
	const [searchKey, setSearchKey] = useState(undefined);
	const [hasChanged, setHasChanged] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const pageSize = 10;
	const [artists, setArtists] = useState([]);
	const [currentArtist, setCurrentArtist] = useState(artist);

	useEffect(() => {
		setCurrentArtist(artist);
	}, [artist]);

	useEffect(() => {
		if (!artist) {
			fetcher(
				`${BASE_URL}/artists/artist-studio-list?id=${id}&page=${1}&pageSize=${200}`
			)
				.then((response) => {
					setArtists(response.data);
					if (response.data?.length > 0) {
						setCurrentArtist(response.data.at(0));
						setSearchKey(Math.random());
					}
				})
				.catch(() => {
					setError(true);
				});
		}
	}, []);

	const getMeetings = () => {
		if (hasChanged && currentArtist) {
			fetcher(
				`${BASE_URL}/booking-meetings?from=${formatDateForInput(
					timeRange.from
				)}&to=${formatDateForInput(timeRange.to)}&artistId=${
					currentArtist.id
				}&orderBy=MeetingTime${
					status > -1 ? '&status=' + status : ''
				}&pageSize=${pageSize}&page=${page}&isDescending=${!isAsc}`
			).then((data) => {
				setTotalPage(Math.ceil(data.total / pageSize));
				setMeetings(getSortMeetings(data.bookingMeetings));
				setHasChanged(false);
			});
		}
	};

	const handleSearch = () => {
		if (hasChanged) {
			setPage(1);
			setSearchKey(Math.random());
		}
	};

	const getSortMeetings = (meetings) => {
		return meetings?.sort((a, b) => {
			return isAsc
				? new Date(a.meetingTime).getTime() - new Date(b.meetingTime).getTime()
				: new Date(b.meetingTime).getTime() - new Date(a.meetingTime).getTime();
		});
	};

	useEffect(() => {
		if (!hasChanged) {
			setHasChanged(true);
		}
	}, [timeRange, status, currentArtist]);

	useEffect(() => {
		setHasChanged(true);
		setSearchKey(Math.random() + page);
	}, [page, isAsc]);

	useEffect(() => {
		getMeetings();
	}, [searchKey]);

	return (
		<div>
			<Heading>
				Lịch hẹn {artist && `của nghệ sĩ ${artist?.account?.fullName}`}
			</Heading>
			{
				// filters
			}
			<div className="flex flex-wrap items-end gap-2 pb-5">
				{
					// By Timerange
				}
				<div className="flex justify-center">
					<div>
						<div className="text-sm font-semibold">Chọn khoảng thời gian</div>
						<Dropdown className="relative">
							<DropdownToggle>
								<div className='relative'>
									<div className="rounded-lg pl-1 pr-8 py-2 border border-gray-300">
										Từ{' '}
										<span className="font-semibold">
											{formatDate(timeRange?.from)}
										</span>{' '}
										tới{' '}
										<span className="font-semibold">
											{formatDate(timeRange?.to)}
										</span>
									</div>
									<div className="absolute top-2.5 right-2 text-gray-700">
										<ChevronDown width={17} height={17} />
									</div>
								</div>
							</DropdownToggle>
							<DropdownMenu position="left" closeOnClick={false}>
								<div className="w-full mb-4">
									<DayPicker
										showOutsideDays
										numberOfMonths={2}
										pagedNavigation
										id={'meetingPagePicker'}
										mode="range"
										defaultMonth={timeRange?.from}
										selected={timeRange}
										onSelect={setTimeRange}
										locale={vi}
										className=""
									/>
								</div>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				{
					// By Status
				}
				<div>
					<div className="text-sm font-semibold">Chọn trạng thái</div>
					<Dropdown className="relative">
						<DropdownToggle>
							<div className="relative">
								<div className="w-32 rounded-lg px-1 py-2 border border-gray-300">
									{statusList.filter((s) => s.key === status).at(0).value}
								</div>
								<div className="absolute top-2.5 right-2 text-gray-700">
									<ChevronDown width={17} height={17} />
								</div>
							</div>
						</DropdownToggle>
						<DropdownMenu position="left" className={'h-40 overflow-auto'}>
							{statusList.map((s) => (
								<div
									role="button"
									key={s.key}
									onClick={() => {
										if (status !== s.key) {
											setStatus(s.key);
										}
									}}
									className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
										status === s.key ? 'bg-indigo-100' : ''
									}`}
								>
									{s.value}
								</div>
							))}
						</DropdownMenu>
					</Dropdown>
				</div>
				{
					// By Artist
				}
				{currentArtist && !artist && (
					<div>
						<div className="text-sm font-semibold">Chọn nghệ sĩ</div>
						<Dropdown className="relative">
							<DropdownToggle>
								<div className="relative">
									<div className="w-32 rounded-lg px-1 py-2 border border-gray-300">
										{currentArtist.fullName}
									</div>
									<div className="absolute top-2.5 right-2 text-gray-700">
										<ChevronDown width={17} height={17} />
									</div>
								</div>
							</DropdownToggle>
							<DropdownMenu className={'max-h-40 overflow-auto'}>
								{artists.map((artist) => (
									<div
										role="button"
										key={artist.id}
										onClick={() => {
											if (currentArtist.id !== artist.id) {
												setCurrentArtist(artist);
											}
										}}
										className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
											currentArtist.id === artist.id ? 'bg-indigo-100' : ''
										}`}
									>
										{artist.fullName}
									</div>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
				)}
				{
					// Confirm search
				}
				{currentArtist && (
					<div>
						<div className='h-5'></div>
						<div>
							<Button onClick={handleSearch}>Tìm kiếm</Button>
						</div>
					</div>
				)}
			</div>
			{
				// Table
			}
			{meetings?.length > 0 && currentArtist ? (
				<div>
					<MeetingTable meetings={meetings} sort={(isAsc) => setIsAsc(isAsc)} isAsc={isAsc} />
					{totalPage > 0 && (
						<MyPagination
							current={page}
							setCurrent={setPage}
							totalPage={totalPage}
						/>
					)}
				</div>
			) : (
				<div className="text-center flex-grow">Chưa có lịch hẹn nào.</div>
			)}
		</div>
	);
};

MeetingSchedule.propTypes = {
	id: PropTypes.string,
	artist: PropTypes.object
};

export default MeetingSchedule;
