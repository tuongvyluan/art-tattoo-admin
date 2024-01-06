import MyModal from 'components/MyModal';
import PricingComponent from 'components/Pricing';
import { BASE_URL } from 'lib/env';
import { getCodeString } from 'lib/vnpayHelpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { Loading } from 'ui';

const PackagePage = () => {
	const router = useRouter();
	const { data, status } = useSession();
	const [code, setCode] = useState(router.query.code);
	const [openResultModal, setOpenResultModal] = useState(
		typeof code !== 'undefined'
	);
	const { data: packageTypes, error } = useSWR(
		`${BASE_URL}/Package/GetAllPackageType`
	);

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
					{code === '00'
						? 'Thanh toán thành công.'
						: 'Thanh toán thất bại. ' + getCodeString(code)}
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
