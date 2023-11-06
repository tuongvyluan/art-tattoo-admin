import { fetcherPost } from 'lib';
import Login from '../../components/Login';
import { signIn } from 'next-auth/react';
import Router from 'next/router';
import { useState } from 'react';
import { Alert } from 'ui';

const LoginPage = () => {
	const [user, setUser] = useState({ email: '', password: '' });
	const [showAlert, setShowAlert] = useState(false)
	const [alertContent, setAlertContent] = useState({
		title: '',
		content: ''
	})
	const handleSetUser = (newUser) => {
		setUser(newUser);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await signIn('credentials', {
			email: user.email,
			password: user.password,
			redirect: false
		});

		if (res.ok) {
			Router.replace('/');
		} else {
			setShowAlert(prev => false)
			setAlertContent({
				title: 'Login failed',
				content: 'Email or password is incorrect'
			})
		}
	};
	return (
		<div>
			{showAlert ? (<Alert color="blue" className="mb-2">
				<strong className="font-bold mr-1">Holy smokes!</strong>
				<span className="block sm:inline">Something seriously bad happened.</span>
			</Alert>) : <></>}
			
			<Login handleSubmit={handleSubmit} user={user} setUser={handleSetUser} />
		</div>
	);
};

LoginPage.getInitialProps = async () => ({
	namespacesRequired: ['login']
});

export default LoginPage;
