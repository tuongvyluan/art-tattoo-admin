import Register from 'components/Register';
import { fetcherPost } from 'lib';
import { BASE_URL } from 'lib/env';
import { checkTaxCode } from 'lib/regex';
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
		studioCity: '79',
		studioTaxCode: '',
		role: ROLE.STUDIO
	});
	const [avatar, setAvatar] = useState('/images/upload-img.png')
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
			handleAlert(true, '', 'Mật khẩu xác nhận không trùng khớp.', true);
		} else if (!checkTaxCode(user.studioTaxCode)) {
			handleAlert(true, '', 'Mã số thuế không hợp lệ.', true);
		} else {
			handleAlert(true, '', 'Đang đăng ký tài khoản...');
			// try {
				console.log(user)
				console.log(avatar)
			// 	await fetcherPost(`${BASE_URL}/Auth/Register`, {
			// 		...user,
			// 		avatar: avatar,
			// 		redirect: false
			// 	});
			// 	Router.replace('/auth/signin');
			// } catch (e) {
			// 	console.log(e);
			// 	let mesageTitle = 'Đăng ký tài khoản không thành công.';
			// 	let messageContent = '';
			// 	if (e.message.includes('already an account')) {
			// 		messageContent = 'Email hoặc số điện thoại này đã tồn tại.';
			// 	}
			// 	handleAlert(true, mesageTitle, messageContent, true);
			// }
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
			<Alert
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				color={alertContent.isWarn ? 'red' : 'blue'}
				className="bottom-2 right-2 absolute"
			>
				<strong className="font-bold mr-1">{alertContent.title}</strong>
				<span className="block sm:inline">{alertContent.content}</span>
			</Alert>
			<Register avatar={avatar} setAvatar={setAvatar} user={user} setUser={handleSetUser} handleSubmit={handleSubmit} />
		</div>
	);
};

RegisterPage.getInitialProps = async () => ({
	namespacesRequired: ['register']
});

export default RegisterPage;
