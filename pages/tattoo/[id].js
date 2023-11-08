const { useSession } = require("next-auth/react");
import TattooDetailsPage from 'layout/Studio/TattooDetails';
import { ROLE } from 'lib/status';
import Router from 'next/router';
const { Loading } = require("ui");

const TattooDetails = () => {
	// Check authenticated
	const { status, data } = useSession();
  
  if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'authenticated' && data.user.role === ROLE.STUDIO) {
    return (
			<TattooDetailsPage />
		)
  } else {
    Router.replace('/');
  }
}

export default TattooDetails;
