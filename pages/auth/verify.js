import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from 'ui';

const VerifyPage = () => {
	const router = useRouter();
	const token = router.query.token;
	const [loading, setLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('Yêu cầu xác thực không hợp lệ.');

	if (!token) {
		return (
			<div className="flex items-center justify-center h-screen">{errorMessage}</div>
		);
	}
	if (!isSuccess && loading) {
		fetcher(`${BASE_URL}/Auth/Verify?token=${token}`)
			.then(() => {
				setIsSuccess(true);
			})
			.catch((e) => {
				let mesageTitle = 'Yêu cầu xác thực không hợp lệ.';
				if (e.message.includes('already verified')) {
					mesageTitle = 'Tài khoản này đã được xác thực.';
				}
				setErrorMessage(mesageTitle);
				setLoading(false);
			});
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading />
			</div>
		);
	}
	if (isSuccess) {
		return (
			<div className="flex items-center justify-center h-body">
				<div className="text-center text-base">
					<div>Bạn đã xác thực tài khoản thành công.</div>
					<div>
						<Link href={'/auth/signin'}>Đăng nhập</Link> để sử dụng dịch vụ của chúng
						tôi nhé.
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex items-center justify-center h-body">
			<div className="text-center text-base">
				<div>{errorMessage}</div>
				<div>
					<Link href={'/'}>Trở lại trang chủ</Link>
				</div>
			</div>
		</div>
	);
};

export default VerifyPage;
