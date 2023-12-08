import Register from 'components/Register';
import { fetcher, fetcherPost } from 'lib';
import { BASE_URL, TAX_CODE_API } from 'lib/env';
import { checkPhoneNumber, checkTaxCode } from 'lib/regex';
import { ROLE } from 'lib/status';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Alert } from 'ui';

const RegisterPage = () => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			Router.replace('/');
		}
	}, [status]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		password: '',
		cpassword: '',
		studioName: '',
		studioAddress: '',
		studioCity: 79,
		studioTaxCode: '',
		studioOpenTime: '09:00:00',
		studioCloseTime: '21:00:00',
		studioBioContent: '',
		role: ROLE.STUDIO
	});
	const [avatar, setAvatar] = useState('/images/upload-img.png');
	const [showAlert, setShowAlert] = useState(false);

	const [alertContent, setAlertContent] = useState({
		title: '',
		content: '',
		isWarn: false
	});

	const handleSetUser = (newUser) => {
		handleAlert(false, '', '');
		setUser(newUser);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user.cpassword !== user.password) {
			handleAlert(true, '', 'Mật khẩu xác nhận không trùng khớp.', 2);
		} else if (!checkTaxCode(user.studioTaxCode)) {
			handleAlert(true, '', 'Mã số thuế không hợp lệ.', 2);
		} else if (!checkPhoneNumber(user.phoneNumber)) {
			handleAlert(true, '', 'Số điện thoại không hợp lệ.', 2);
		} else {
			handleAlert(true, '', 'Đang đăng ký tài khoản...');
			try {
				fetcher(`${TAX_CODE_API}/${user.studioTaxCode}`).then((data) => {
					let validTax = false;
					if (data.code === '00') {
						validTax = true;
					}
					console.log(user)
					fetcherPost(`${BASE_URL}/Auth/RegisterWithStudio`, {
						accountCreateModel: {
							email: user.email,
							avatar: avatar,
							password: user.password,
							fullName: user.name,
							phoneNumber: user.phoneNumber,
							role: ROLE.STUDIO
						},
						studioViewModelForCreate: {
							studioName: user.studioName,
							taxCode: user.studioTaxCode,
							address: user.studioAddress,
							city: user.studioCity,
							bioContent: user.studioBioContent,
							openTime: user.studioOpenTime,
							closeTime: user.studioCloseTime,
							isAuthorized: validTax
						}
					}).then((data) => {
						console.log(data)
						handleAlert(true, 'Đăng ký tài khoản thành công', 'Bạn hãy kiểm tra mail để xác thực tài khoản nhé.', 1);
					}).catch((e) => {
						console.log(e)
						handleAlert(true, 'Đăng ký tài khoản thất bại', '', 2);
					})
				});
			} catch (e) {
				console.log(e);
				let mesageTitle = 'Đăng ký tài khoản không thành công.';
				let messageContent = '';
				if (e.message.includes('already an account')) {
					messageContent = 'Email hoặc số điện thoại này đã tồn tại.';
				}
				handleAlert(true, mesageTitle, messageContent, 2);
			}
		}
	};

	const handleAlert = (state, title, content, isWarn = 0) => {
		setShowAlert((prev) => state);
		let color;
		switch (isWarn) {
			case 1:
				color = 'green'
				break;
			case 2:
				color = 'red'
				break;
			default:
				color = 'blue'
				break;
		}
		setAlertContent({
			title: title,
			content: content,
			isWarn: color
		});
	};

	return (
		<div className="relative">
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn}
				className="bottom-2 right-2 absolute"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<Register
				avatar={avatar}
				setAvatar={setAvatar}
				user={user}
				setUser={handleSetUser}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

RegisterPage.getInitialProps = async () => ({
	namespacesRequired: ['register']
});

export default RegisterPage;
