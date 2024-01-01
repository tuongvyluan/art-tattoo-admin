import MeetingSchedule from 'layout/Booking/MeetingPage';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Loading } from 'ui';

const MeetingPage = () => {
	const { data, status } = useSession();

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'unauthenticated' || data.user.role !== ROLE.STUDIO) {
		Router.replace('/');
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	return (
		<div className="relative min-h-body sm:px-8 md:px-1 lg:px-6 xl:px-20 flex flex-col">
			<div className="flex-grow relative min-w-0 p-6 rounded-lg shadow-sm mb-4 w-full bg-white">
				<MeetingSchedule id={data.user.studioId} />
			</div>
		</div>
	);
};

export default MeetingPage;
