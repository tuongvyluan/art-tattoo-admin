const { useSession } = require("next-auth/react");
import TattooListPage from 'layout/Studio/TattooList';
import { ROLE } from 'lib/status';
import Router from 'next/router';
const { Loading } = require("ui");

const TattooList = () => {
	// Check authenticated
	const { status, data } = useSession();
  
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

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
    return (
			<TattooListPage />
		)
  }
}

export default TattooList;