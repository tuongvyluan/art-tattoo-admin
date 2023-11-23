import { Link, Logo } from 'ui';
import PropTypes from 'prop-types';
import Button from './Button';

const Login = ({ handleSubmit, user, setUser }) => {
	const handleFormChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col justify-center items-center px-3 bg-white dark:bg-gray-600 min-h-screen">
			<div className="w-full max-w-screen-xl">
				<div className="w-full flex justify-center mx-0">
					<div className="w-full md:w-1/2 px-2 flex justify-center">
						<div className="w-full max-w-md">
							<div className="text-center mb-5 text-indigo-500">
								<Logo height={50} width={50} />
							</div>
							<form className="sign-in-form" onSubmit={handleSubmit}>
								<div className="text-center mb-5">
									<h1 className="uppercase text-2xl mb-3 font-bold leading-none ">
										Art Tattoo Lover
									</h1>
									<p className="text-gray-800">
										Đăng nhập để sử dụng dịch vụ quản lí tiệm xăm của Art Tattoo
										Lover Platform
									</p>
								</div>

								<div className="rounded-lg shadow-sm">
									<div className="block mb-3">
										<label>Email</label>
										<input
											aria-label={'Email'}
											name="email"
											type="email"
											value={user.email}
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
											value={user.password}
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
	);
};
Login.propTypes = {
	handleSubmit: PropTypes.func,
	user: PropTypes.object,
	setUser: PropTypes.func
};
export default Login;
