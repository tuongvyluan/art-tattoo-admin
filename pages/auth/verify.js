import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading, Logo } from 'ui';

const VerifyPage = () => {
	const router = useRouter();
	const token = router.query.token;
	const [loading, setLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);

	if (!token) {
		return (
			<div className="flex items-center justify-center h-screen">
				Yêu cầu xác thực không hợp lệ.
			</div>
		);
	}
	if (!isSuccess && loading) {
		fetcher(`${BASE_URL}/Auth/Verify?token=${token}`)
			.then(() => {
				setIsSuccess(true);
			})
			.catch(() => {
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
			<div className="flex items-center justify-center h-screen">
				<div className='text-lg'>
					<div className="text-center mt-10 mb-20 text-gray-700">
						<Logo height={50} width={50} />
						<h1 className="uppercase text-2xl mb-3 font-bold leading-none">
							Art Tattoo Lover
						</h1>
					</div>
					<div className="text-center">
						Bạn đã xác thực và tạo tiệm xăm thành công.
					</div>
					<div>
						<Link href={'/auth/signin'}>Đăng nhập</Link> để sử dụng dịch vụ của chúng
						tôi nhé.
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex justify-center h-screen">
			<div>
				<div className="text-center mt-10 mb-20 text-gray-700">
					<Logo height={50} width={50} />
					<h1 className="uppercase text-2xl mb-3 font-bold leading-none">
						Art Tattoo Lover
					</h1>
				</div>
				<div className="text-center text-lg">Yêu cầu xác thực không hợp lệ.</div>
			</div>
		</div>
	);
};

export default VerifyPage;
