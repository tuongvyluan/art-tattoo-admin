import { Modal } from 'flowbite-react';
import { fetcher } from 'lib';
import { BASE_URL } from 'lib/env';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BackgroundImg, Loading, Logo } from 'ui';

const VerifyPage = () => {
	const router = useRouter();
	const token = router.query.token;
	const [loading, setLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('Yêu cầu xác thực không hợp lệ.');
	const [isFirst, setIsFirst] = useState(true);

	if (isFirst) {
		setIsFirst(false);
		signOut({ redirect: false });
	}

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

	return (
		<div className="relative">
			<div className="absolute -top-3 -left-5 -right-10 h-screen">
				<BackgroundImg
					image={'/images/booking-img.jpg'}
					className="relative w-full h-full bg-center bg-cover bg-fallback"
				/>
				<div className="relative h-noFooter">
					<Modal size={'xl'} position={'center'} show={true}>
						<Modal.Body>
							{isSuccess ? (
								<div className="flex justify-center">
									<div className="flex flex-col text-center text-base pt-10">
										<div>
											<Logo height={50} width={50} />
											<h1 className="uppercase text-2xl mb-5 font-bold leading-none ">
												Art Tattoo Lover
											</h1>
										</div>
										<div className="flex-grow flex flex-col justify-center">
											<div className="pb-10">
												<div>Bạn đã xác thực tài khoản thành công.</div>
												<div>
													<Link href={'/auth/signin'}>Đăng nhập</Link> để sử dụng
													dịch vụ của chúng tôi nhé.
												</div>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="flex justify-center">
									<div className="flex flex-col text-center text-base pt-10">
										<div>
											<Logo height={50} width={50} />
											<h1 className="uppercase text-2xl mb-5 font-bold leading-none ">
												Art Tattoo Lover
											</h1>
										</div>
										<div className="flex-grow flex flex-col justify-center">
											<div className="pb-10">
												<div>{errorMessage}</div>
												<div>
													<Link href={'/'}>Trở lại trang chủ</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default VerifyPage;
