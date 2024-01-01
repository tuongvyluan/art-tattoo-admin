import StudioPayment from 'layout/Studio/StudioPayment';
import { useSession } from 'next-auth/react';
import { Loading } from 'ui';

const PaymentStatisticPage = () => {
	const { data, status } = useSession();

	if (status === 'unauthenticated') {
		Router.replace('/');
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (status === 'loading') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (data) {
		return <StudioPayment studioId={data?.user?.studioId} />;
	}
};

export default PaymentStatisticPage;
