import { Link, Logo } from 'ui';

import Illustration from 'public/images/illustrations/undraw_secure_data_0rwp.svg';
import Button from './Button';

const Register = ({user, setUser, handleSubmit}) => {
	const handleFormChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	};

	return (
		<div className="flex flex-col justify-center items-center px-3 bg-white dark:bg-gray-600 min-h-screen">
			<div className="w-full max-w-screen-xl">
				<div className="block md:flex flex-wrap items-center -mx-2">
					<div className="w-full md:w-1/2 px-2 text-center order-last flex justify-center">
						<div className="w-full md:max-w-md p-2">
							<Illustration className="w-64 md:w-full h-64 md:h-auto  inline-block" />
						</div>
					</div>
					<div className="w-full md:w-1/2 px-2 flex justify-center md:justify-end">
						<div className="w-full max-w-md">
							<div className="text-center mb-5 text-indigo-500">
								<Logo height={50} width={50} />
							</div>
							<form onSubmit={handleSubmit}>
								<div className="text-center mb-5">
									<h1 className="uppercase text-2xl mb-3 font-bold leading-none text-indigo-500">
										Art Tattoo Lover
									</h1>
									<p className="text-gray-800">
										Tạo tài khoản để mở Studio và sử dụng dịch vụ quản lí tiệm xăm
										của Art Tattoo Lover Platform
									</p>
								</div>

								<div className="rounded-lg shadow-sm">
									<div className="block mb-3">
										<label>{'Họ'}</label>
										<input
											aria-label={'Last name'}
											name="lastName"
											type="text"
											value={user.lastName}
											onChange={handleFormChange}
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											placeholder={'Họ'}
										/>
									</div>
									<div className="block mb-3">
										<label>{'Tên'}</label>
										<input
											aria-label={'First name'}
											name="firstName"
											value={user.firstName}
											onChange={handleFormChange}
											type="text"
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											placeholder={'Tên'}
										/>
									</div>
									<div className="block mb-3">
										<label>{'Số điện thoại'}</label>
										<input
											aria-label={'Phone'}
											name="phoneNumber"
											value={user.phoneNumber}
											onChange={handleFormChange}
											type="tel"
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											placeholder={'Email'}
										/>
									</div>
									<div className="block mb-3">
										<label>{'Email'}</label>
										<input
											aria-label={'Email'}
											name="email"
											value={user.email}
											onChange={handleFormChange}
											type="email"
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											placeholder={'Email'}
										/>
									</div>
									<div className="block mb-3">
										<label>{'Password'}</label>
										<input
											aria-label={'Password'}
											name="password"
											value={user.password}
											onChange={handleFormChange}
											type="password"
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											placeholder={'Password'}
										/>
									</div>
									<div className="block mb-3">
										<label>{'Xác nhận password'}</label>
										<input
											aria-label={'cpassword'}
											name="cpassword"
											value={user.cpassword}
											onChange={handleFormChange}
											type="password"
											required
											className="appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
											placeholder={'Xác nhận password'}
										/>
									</div>
								</div>

								<div className='flex justify-center'>
									<Button>Đăng ký</Button>
								</div>
							</form>
							<div className="text-center">
								<small className="text-gray-700 text-center">
									<span>{'Đã có tài khoản?'}</span>{' '}
									<Link href="/auth/signin">
										<a>{'Đăng nhập tại đây'}</a>
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

export default Register;
