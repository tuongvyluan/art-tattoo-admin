import TattooDetailsPage from 'layout/Studio/TattooDetailsPage';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Loading } from 'ui';

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
