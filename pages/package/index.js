import MyModal from 'components/MyModal';
import PricingComponent from 'components/Pricing';
import { getCodeString } from 'lib/vnpayHelpers';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PackagePage = () => {
	const router = useRouter();
	const [code, setCode] = useState(router.query.code);
	const [openResultModal, setOpenResultModal] = useState(
		typeof code !== 'undefined'
	);

	return (
		<div className="relative">
			<MyModal
				canConfirm={false}
				openModal={openResultModal}
				setOpenModal={setOpenResultModal}
				title={'Kết quả thanh toán'}
			>
				<div>{code === '00' ? 'Thanh toán thành công.' : 'Thanh toán thất bại. ' + getCodeString(code)}</div>
			</MyModal>
			<PricingComponent />
		</div>
	);
};

PackagePage.getInitialProps = async () => ({
	namespacesRequired: ['header', 'footer', 'sidebar']
});

export default PackagePage;
