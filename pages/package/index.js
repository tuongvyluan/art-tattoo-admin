import MyModal from 'components/MyModal';
import PricingComponent from 'components/Pricing';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { getCodeString } from 'lib/vnpayHelpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from 'ui';

const PackagePage = () => {
	const router = useRouter();
	const [code, setCode] = useState(router.query.code)
	const { data, status } = useSession();
	const [openResultModal, setOpenResultModal] = useState(
		typeof router.query.code !== 'undefined'
	);
	const [packageTypes, setPackageTypes] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetcher(
			`${BASE_URL}/Package/${
				data?.user?.role === ROLE.STUDIO
					? 'GetStudioPackageType?studioId=' + data.user.studioId
					: 'GetAllPackageType'
			}`
		)
			.then((data) => {
				setPackageTypes(data);
			})
			.catch(() => {
				setError(true);
			});

		if (typeof code !== 'undefined') {
			setOpenResultModal(true);
		}
	}, [code]);

	useEffect(() => {
		setCode(router.query.code)
	}, [router.query.code])

	if (status !== 'authenticated') {
		return (
			<div className="flex items-center justify-center h-full">
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full">
				Tải dữ liệu thất bại
			</div>
		);
	}

	return (
		<div className="relative">
			<MyModal
				canConfirm={false}
				openModal={openResultModal}
				setOpenModal={setOpenResultModal}
				title={'Kết quả thanh toán'}
				cancelTitle="Đóng"
			>
				<div>
					{router.query.code === '00'
						? 'Thanh toán thành công.'
						: 'Thanh toán thất bại. ' + getCodeString(router.query.code)}
				</div>
			</MyModal>
			<PricingComponent
				packageTypes={packageTypes}
				studioId={data?.user?.studioId ? data.user.studioId : ''}
			/>
		</div>
	);
};

PackagePage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

export default PackagePage;
