import MyModal from 'components/MyModal';
import PricingComponent from 'components/Pricing';
import PackageHistoryTable from 'layout/PackageHistoryTable';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { ROLE } from 'lib/status';
import { getCodeString } from 'lib/vnpayHelpers';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from 'ui';

const PackagePage = () => {
	const router = useRouter();
	const [code, setCode] = useState(router.query.code);
	const { data, status } = useSession();
	const [openResultModal, setOpenResultModal] = useState(
		typeof router.query.code !== 'undefined'
	);
	const [packageTypes, setPackageTypes] = useState([]);
	const [error, setError] = useState(false);
	const [reloadHistory, setReloadHistory] = useState(Math.random());
	const [reloadType, setReloadType] = useState(Math.random());

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
	}, [code, data?.user?.role, reloadType]);

	useEffect(() => {
		setCode(router.query.code);
		setReloadHistory(Math.random());
	}, [router.query.code]);

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
		<div className="relative px-3">
			{router.query.code && (
				<MyModal
					canConfirm={false}
					openModal={openResultModal}
					setOpenModal={(val) => {
						if (!val) {
							router.push('/package?page=' + router.query.page);
						}
						setOpenResultModal(val);
					}}
					title={'Kết quả thanh toán'}
					cancelTitle="Đóng"
				>
					<div>
						{router.query.code === '00'
							? 'Thanh toán thành công.'
							: 'Thanh toán thất bại. ' + getCodeString(router.query.code)}
					</div>
				</MyModal>
			)}
			<PricingComponent
				setReload={() => setReloadType(Math.random())}
				packageTypes={packageTypes}
				studioId={data.user.studioId ? data.user.studioId : ''}
			/>
			<div>
				<PackageHistoryTable
					studioId={data.user.studioId ? data.user.studioId : ''}
					reloadKey={reloadHistory}
				/>
			</div>
		</div>
	);
};

PackagePage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar', 'dashboard']
});

export default PackagePage;
