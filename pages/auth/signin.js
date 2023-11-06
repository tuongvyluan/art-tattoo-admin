import { fetcherPost } from 'lib';
import Login from '../../components/Login';
import { signIn } from 'next-auth/react';
import Router from 'next/router';
import { useState } from 'react';
import { Alert } from 'ui';

const LoginPage = () => {
	const [user, setUser] = useState({ email: '', password: '' });
	const [showAlert, setShowAlert] = useState(false);
	const [alertContent, setAlertContent] = useState({
		title: '',
		content: ''
	});
	const handleSetUser = (newUser) => {
		handleAlert(false, '', '')
		setUser(newUser);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		handleAlert(true, '', 'Đang đăng nhập...');

		const res = await signIn('credentials', {
			email: user.email,
			password: user.password,
			redirect: false
		});

		if (res.ok) {
			Router.replace('/');
		} else {
			handleAlert(true, 'Đăng nhập thất bại', 'Sai email hoặc password.');
		}
	};

	const handleAlert = (state, title, content) => {
		setShowAlert((prev) => state);
		setAlertContent({
			title: title,
			content: content
		});
	};
	return (
		<div className="relative">
			{showAlert ? (
				<Alert color="blue" className="bottom-2 right-2 absolute">
					<strong className="font-bold mr-1">{alertContent.title}</strong>
					<span className="block sm:inline">{alertContent.content}</span>
				</Alert>
			) : (
				<></>
			)}

			<Login handleSubmit={handleSubmit} user={user} setUser={handleSetUser} />
		</div>
	);
};

LoginPage.getInitialProps = async () => ({
	namespacesRequired: ['login']
});

export default LoginPage;
