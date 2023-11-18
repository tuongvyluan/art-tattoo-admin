import Login from '../../components/Login';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Alert } from 'ui';

const LoginPage = () => {
	const { status, data } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			Router.replace('/');
		}
	}, [status]);

	const [user, setUser] = useState({ email: '', password: '' });
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
		handleAlert(true, '', 'Đang đăng nhập tài khoản...');

		const res = await signIn('credentials', {
			email: user.email,
			password: user.password,
			redirect: false
		});

		if (res.ok) {
			Router.replace('/');
		} else {
			console.log(res);
			handleAlert(true, 'Đăng nhập thất bại', 'Sai email hoặc password.', true);
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

			<Login handleSubmit={handleSubmit} user={user} setUser={handleSetUser} />
		</div>
	);
};

LoginPage.getInitialProps = async () => ({
	namespacesRequired: ['login']
});

export default LoginPage;
