import { Alert, BackgroundImg, Link, Logo } from 'ui';
import PropTypes from 'prop-types';
import Button from './Button';
import GoogleLogo from '/public/svg/google.svg';
import { signIn } from 'next-auth/react';
import { Modal } from 'flowbite-react';
import { useState } from 'react';

const Login = ({ user }) => {
	const [profile, setProfile] = useState(user);
	const [showAlert, setShowAlert] = useState(false);
	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

	const handleFormChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleAlert(true, '', 'Đang đăng nhập tài khoản...');

		const res = await signIn('credentials', {
			email: profile.email,
			password: profile.password,
			redirect: false
		});

		if (!res.ok) {
			if (res.error.includes('unverified')) {
				handleAlert(
					true,
					'Đăng nhập thất bại.',
					'Email chưa được xác thực, hãy kiểm tra hộp mail để xác thực tài khoản nhé.',
					true
				);
			} else if (res.error.includes('banned')) {
				handleAlert(true, 'Đăng nhập thất bại.', 'Tài khoản này đã bị khoá.', true);
			} else
				handleAlert(true, 'Đăng nhập thất bại.', 'Sai email hoặc password.', true);
		}
	};

	const handleAlert = (state, title, content, isWarn = false) => {
		setShowAlert((prev) => state);
		setAlertContent({
			title: title,
			content: content,
			isWarn: isWarn
		});
	};

	return (
		<div className="relative">
			<div className="absolute -top-3 -left-5 -right-10 h-screen">
				<BackgroundImg
					image={'/images/booking-img.jpg'}
					className="relative w-full h-full bg-center bg-cover bg-fallback"
				/>
				<div className="relative h-noFooter w-full">
					<Modal size={'xl'} position={'center'} show={true}>
						<Alert
							showAlert={showAlert}
							setShowAlert={setShowAlert}
							color={alertContent.isWarn ? 'red' : 'blue'}
							className="bottom-2 right-2 absolute z-100"
						>
							<strong className="font-bold mr-1">{alertContent.title}</strong>
							<span className="block sm:inline">{alertContent.content}</span>
						</Alert>
						<Modal.Body>
							<div className="w-full">
								<div className="flex flex-col justify-center items-center px-3 bg-white h-5/6 overflow-auto">
									<div className="w-full max-w-screen-xl">
										<div className="w-full flex justify-center mx-0">
											<div className="w-full md:w-2/3 px-2 flex justify-center">
												<div className="w-full max-w-md">
													<div className="text-center mb-3 text-indigo-500">
														<Logo height={50} width={50} />
													</div>
													<form className="sign-in-form" onSubmit={handleSubmit}>
														<div className="text-center mb-3">
															<h1 className="uppercase text-2xl mb-3 font-bold leading-none ">
																Art Tattoo Lover
															</h1>
															<p className="text-gray-800">
																Đăng nhập để sử dụng dịch vụ quản lí tiệm xăm của Art
																Tattoo Lover Platform
															</p>
														</div>
														<div className="rounded-lg shadow-sm">
															<div className="block mb-3">
																<label>Email</label>
																<input
																	aria-label={'Email'}
																	name="email"
																	type="email"
																	value={profile.email}
																	onChange={handleFormChange}
																	required
																	className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
																	placeholder={'Email'}
																/>
															</div>
															<div className="block mb-3">
																<label>Password</label>
																<input
																	aria-label={'Password'}
																	name="password"
																	type="password"
																	value={profile.password}
																	onChange={handleFormChange}
																	required
																	className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
																	placeholder={'Password'}
																/>
															</div>
														</div>
														<div className="flex justify-center">
															<Button>Đăng nhập</Button>
														</div>
													</form>
													<div className="flex justify-center pt-3">
														<Button outline onClick={() => signIn('google')}>
															<div className="flex flex-wrap gap-2 items-center justify-center">
																<GoogleLogo className="w-4 h-4" />
																<div>Đăng nhập với Google</div>
															</div>
														</Button>
													</div>
													<div className="text-center">
														<small className="text-gray-700 text-center">
															<span>Chưa có tài khoản?</span>{' '}
															<Link href="/auth/register">
																<a>Tạo tài khoản mới</a>
															</Link>
														</small>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	user: PropTypes.object
};
export default Login;
